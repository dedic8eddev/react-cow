import { /* WETH9,  */ Token, /* Ether, */ NativeCurrency, Currency } from '@uniswap/sdk-core'
import invariant from 'tiny-invariant'
// import { UNI_ADDRESS } from '@src/constants/addresses'
import { SupportedChainId } from 'constants/chains'

// MOD
import { WETH9_EXTENDED as WETH9_EXTENDED_UNI } from '@src/constants/tokens'
import { WXDAI, XDAI_NAME, XDAI_SYMBOL } from 'utils/xdai/constants'

export * from '@src/constants/tokens'

/* export const AMPL = new Token(1, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9, 'AMPL', 'Ampleforth')
export const DAI = new Token(1, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin')
export const USDC = new Token(1, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C')
export const USDT = new Token(1, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD')
export const WBTC = new Token(1, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8, 'WBTC', 'Wrapped BTC')
export const FEI = new Token(1, '0x956F47F50A910163D8BF957Cf5846D573E7f87CA', 18, 'FEI', 'Fei USD')
export const TRIBE = new Token(1, '0xc7283b66Eb1EB5FB86327f08e1B5816b0720212B', 18, 'TRIBE', 'Tribe')
export const FRAX = new Token(1, '0x853d955aCEf822Db058eb8505911ED77F175b99e', 18, 'FRAX', 'Frax')
export const FXS = new Token(1, '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0', 18, 'FXS', 'Frax Share')
export const renBTC = new Token(1, '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D', 8, 'renBTC', 'renBTC')
export const UMA = new Token(1, '0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828', 18, 'UMA', 'UMA Voting Token v1')
export const ETH2X_FLI = new Token(
  1,
  '0xAa6E8127831c9DE45ae56bB1b0d4D4Da6e5665BD',
  18,
  'ETH2x-FLI',
  'ETH 2x Flexible Leverage Index'
)
// Mirror Protocol compat.
export const UST = new Token(1, '0xa47c8bf37f92abed4a126bda807a7b7498661acd', 18, 'UST', 'Wrapped UST')
export const MIR = new Token(1, '0x09a3ecafa817268f77be1283176b946c4ff2e608', 18, 'MIR', 'Wrapped MIR')
export const UNI: { [chainId: number]: Token } = {
  [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, UNI_ADDRESS[1], 18, 'UNI', 'Uniswap'),
  [SupportedChainId.RINKEBY]: new Token(SupportedChainId.RINKEBY, UNI_ADDRESS[4], 18, 'UNI', 'Uniswap'),
  [SupportedChainId.ROPSTEN]: new Token(SupportedChainId.ROPSTEN, UNI_ADDRESS[3], 18, 'UNI', 'Uniswap'),
  [SupportedChainId.GOERLI]: new Token(SupportedChainId.GOERLI, UNI_ADDRESS[5], 18, 'UNI', 'Uniswap'),
  [SupportedChainId.KOVAN]: new Token(SupportedChainId.KOVAN, UNI_ADDRESS[42], 18, 'UNI', 'Uniswap'),
} */
export const WETH9_EXTENDED: { [chainId: number]: Token } = {
  ...WETH9_EXTENDED_UNI,
  [SupportedChainId.XDAI]: WXDAI,
}

export class GpEther extends NativeCurrency {
  constructor(chainId: number, decimals = 18, symbol = 'ETH', name = 'Ether') {
    super(chainId, decimals, symbol, name)
  }

  public get wrapped(): Token {
    const weth9 = WETH9_EXTENDED[this.chainId]
    invariant(!!weth9, 'WRAPPED')
    return weth9
  }

  private static _etherCache: { [chainId: number]: GpEther } = {}

  public static onChain(chainId: number): GpEther {
    if (this._etherCache[chainId]) return this._etherCache[chainId]

    switch (chainId) {
      case SupportedChainId.XDAI:
        this._etherCache[chainId] = new GpEther(chainId, 18, XDAI_SYMBOL, XDAI_NAME)
        break
      default:
        this._etherCache[chainId] = new GpEther(chainId)
    }

    return this._etherCache[chainId]
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
