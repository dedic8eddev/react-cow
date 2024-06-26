import { CurrencyAmount, Currency, Token } from '@uniswap/sdk-core'
import { isAddress, shortenAddress } from 'utils'
import { OrderStatus, OrderKind, ChangeOrderStatusParams } from 'state/orders/actions'
import { AddUnserialisedPendingOrderParams } from 'state/orders/hooks'

import { signOrder, signOrderCancellation, UnsignedOrder } from 'utils/signatures'
import { sendSignedOrderCancellation, sendSignedOrder, OrderID } from 'api/gnosisProtocol'
import { Signer } from 'ethers'
import { APP_DATA_HASH, RADIX_DECIMAL, AMOUNT_PRECISION } from 'constants/index'
import { SupportedChainId as ChainId } from 'constants/chains'
import { formatSmart } from 'utils/format'

export interface PostOrderParams {
  account: string
  chainId: ChainId
  signer: Signer
  kind: OrderKind
  inputAmount: CurrencyAmount<Currency>
  outputAmount: CurrencyAmount<Currency>
  feeAmount: CurrencyAmount<Currency> | undefined
  sellToken: Token
  buyToken: Token
  validTo: number
  recipient: string
  recipientAddressOrName: string | null
  addPendingOrder: (order: AddUnserialisedPendingOrderParams) => void
}

function _getSummary(params: PostOrderParams): string {
  const { kind, account, inputAmount, outputAmount, recipient, recipientAddressOrName, feeAmount } = params

  const [inputQuantifier, outputQuantifier] = [
    kind === OrderKind.BUY ? 'at most ' : '',
    kind === OrderKind.SELL ? 'at least ' : '',
  ]
  const inputSymbol = inputAmount.currency.symbol
  const outputSymbol = outputAmount.currency.symbol
  const inputAmountValue = formatSmart(feeAmount ? inputAmount.add(feeAmount) : inputAmount, AMOUNT_PRECISION)
  const outputAmountValue = formatSmart(outputAmount, AMOUNT_PRECISION)

  const base = `Swap ${inputQuantifier}${inputAmountValue} ${inputSymbol} for ${outputQuantifier}${outputAmountValue} ${outputSymbol}`

  if (recipient === account) {
    return base
  } else {
    const toAddress =
      recipientAddressOrName && isAddress(recipientAddressOrName)
        ? shortenAddress(recipientAddressOrName)
        : recipientAddressOrName

    return `${base} to ${toAddress}`
  }
}

export async function sendOrder(params: PostOrderParams): Promise<string> {
  const {
    kind,
    addPendingOrder,
    chainId,
    inputAmount,
    outputAmount,
    sellToken,
    buyToken,
    feeAmount,
    validTo,
    account,
    signer,
    recipient,
  } = params

  // fee adjusted input amount
  const sellAmount = inputAmount.quotient.toString(RADIX_DECIMAL)
  // slippage adjusted output amount
  const buyAmount = outputAmount.quotient.toString(RADIX_DECIMAL)

  // Prepare order
  const summary = _getSummary(params)
  const receiver = recipient

  const unsignedOrder: UnsignedOrder = {
    sellToken: sellToken.address,
    buyToken: buyToken.address,
    sellAmount,
    buyAmount,
    validTo,
    appData: APP_DATA_HASH,
    feeAmount: feeAmount?.quotient.toString() || '0',
    kind,
    receiver,
    partiallyFillable: false, // Always fill or kill
  }

  const { signature, signingScheme } = await signOrder(unsignedOrder, chainId, signer)
  const creationTime = new Date().toISOString()

  // Call API
  const orderId = await sendSignedOrder({
    chainId,
    order: {
      ...unsignedOrder,
      signature,
      receiver,
      signingScheme,
    },
    owner: account,
  })

  // Update the state
  addPendingOrder({
    chainId,
    id: orderId,
    order: {
      ...unsignedOrder,
      id: orderId,
      owner: account,
      creationTime,
      signature,
      status: OrderStatus.PENDING,
      summary,
      inputToken: sellToken,
      outputToken: buyToken,
      apiAdditionalInfo: undefined,
    },
  })

  return orderId
}

type OrderCancellationParams = {
  orderId: OrderID
  account: string
  chainId: ChainId
  signer: Signer
  cancelPendingOrder: (params: ChangeOrderStatusParams) => void
}

export async function sendOrderCancellation(params: OrderCancellationParams): Promise<void> {
  const { orderId, account, chainId, signer, cancelPendingOrder } = params

  const { signature, signingScheme } = await signOrderCancellation(orderId, chainId, signer)

  await sendSignedOrderCancellation({
    chainId,
    owner: account,
    cancellation: { orderUid: orderId, signature, signingScheme },
  })

  cancelPendingOrder({ chainId, id: orderId })
}
