import { Currency } from '@uniswap/sdk-core'
import React, { ReactNode, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
// import { getExplorerLink, ExplorerDataType } from '../../utils/getExplorerLink'
// import Modal from 'components/Modal'
// import { ExternalLink } from 'theme'
import { Text } from 'rebass'
import { CloseIcon, CustomLightSpinner } from 'theme'
import {
  RowBetween,
  // RowFixed
} from 'components/Row'
import {
  AlertTriangle,
  // ArrowUpCircle,
  // CheckCircle
} from 'react-feather'
import {
  ButtonPrimary,
  // ButtonLight
} from '../Button'
import { AutoColumn, ColumnCenter } from 'components/Column'
import Circle from 'assets/images/blue-loader.svg'
// import MetaMaskLogo from 'assets/images/metamask.png'
import { useActiveWeb3React } from 'hooks/web3'
// import useAddTokenToMetamask from 'hooks/useAddTokenToMetamask'
import { Trans } from '@lingui/macro'
// MOD
// import { getEtherscanLink, getExplorerLabel } from 'utils'
import { GpModal } from 'components/Modal'
import { lighten } from 'polished'
import { ConfirmationModalContentProps, TransactionSubmittedContent, GPModalHeader } from '.' // mod

const Wrapper = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex; /* MOD */
  flex-flow: column nowrap; /* MOD */
  overflow-y: auto; /* MOD */
`
const Section = styled(AutoColumn)<{ inline?: boolean }>`
  padding: ${({ inline }) => (inline ? '0' : '0')};
`

const BottomSection = styled(Section)`
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-bottom: 16px;
  `}
`

const ConfirmedIcon = styled(ColumnCenter)<{ inline?: boolean }>`
  padding: ${({ inline }) => (inline ? '20px 0' : '60px 0;')};
`

// const StyledLogo = styled.img`
//   height: 16px;
//   width: 16px;
//   margin-left: 6px;
// `

export function ConfirmationPendingContent({
  onDismiss,
  pendingText,
  inline,
}: {
  onDismiss: () => void
  pendingText: ReactNode
  inline?: boolean // not in modal
}) {
  return (
    <Wrapper>
      <AutoColumn gap="md">
        {!inline && (
          <RowBetween>
            <div />
            <CloseIcon onClick={onDismiss} />
          </RowBetween>
        )}
        <ConfirmedIcon inline={inline}>
          <CustomLightSpinner src={Circle} alt="loader" size={inline ? '40px' : '90px'} />
        </ConfirmedIcon>
        <AutoColumn gap="12px" justify={'center'}>
          <Text fontWeight={500} fontSize={20} textAlign="center">
            <Trans>Waiting For Confirmation</Trans>
          </Text>
          <AutoColumn gap="12px" justify={'center'}>
            <Text fontWeight={600} fontSize={14} color="" textAlign="center">
              {pendingText}
            </Text>
          </AutoColumn>
          <Text fontSize={12} color={lighten(0.2, '#565A69')} textAlign="center" marginBottom={12}>
            <Trans>Confirm this transaction in your wallet</Trans>
          </Text>
        </AutoColumn>
      </AutoColumn>
    </Wrapper>
  )
}

/* export function TransactionSubmittedContent({
  onDismiss,
  chainId,
  hash,
  currencyToAdd,
  inline,
}: {
  onDismiss: () => void
  hash: string | undefined
  chainId: number
  currencyToAdd?: Currency | undefined
  inline?: boolean // not in modal
}) {
  const theme = useContext(ThemeContext)

  const { library } = useActiveWeb3React()

  const { addToken, success } = useAddTokenToMetamask(currencyToAdd)

  return (
    <Wrapper>
      <Section inline={inline}>
        {!inline && (
          <RowBetween>
            <div />
            <CloseIcon onClick={onDismiss} />
          </RowBetween>
        )}
        <ConfirmedIcon inline={inline}>
          <ArrowUpCircle strokeWidth={0.5} size={inline ? '40px' : '90px'} color={theme.primary1} />
        </ConfirmedIcon>
        <AutoColumn gap="12px" justify={'center'}>
          <Text fontWeight={500} fontSize={20} textAlign="center">
            <Trans>Transaction Submitted</Trans>
          </Text>
          {chainId && hash && (
            // <ExternalLink href={getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION)}>
            <ExternalLink href={getEtherscanLink(chainId, hash, 'transaction')}>
              <Text fontWeight={500} fontSize={14} color={theme.primary1}> */
{
  /* View on Etherscan */
}
{
  /* <Trans>View on Explorer</Trans> */
}
{
  /* TODO: add transaltions for this */
}
{
  /* <Trans>{getExplorerLabel(chainId, hash, 'transaction')}</Trans>
              </Text>
            </ExternalLink>
          )}
          {currencyToAdd && library?.provider?.isMetaMask && (
            <ButtonLight mt="12px" padding="6px 12px" width="fit-content" onClick={addToken}>
              {!success ? (
                <RowFixed>
                  <Trans>
                    Add {currencyToAdd.symbol} to Metamask <StyledLogo src={MetaMaskLogo} />
                  </Trans>
                </RowFixed>
              ) : (
                <RowFixed>
                  <Trans>Added {currencyToAdd.symbol} </Trans>
                  <CheckCircle size={'16px'} stroke={theme.green1} style={{ marginLeft: '6px' }} />
                </RowFixed>
              )}
            </ButtonLight>
          )}
          <ButtonPrimary onClick={onDismiss} style={{ margin: '20px 0 0 0' }}>
            <Text fontWeight={500} fontSize={20}>
              {inline ? <Trans>Return</Trans> : <Trans>Close</Trans>}
            </Text>
          </ButtonPrimary>
        </AutoColumn>
      </Section>
    </Wrapper>
  )
} */
}

export function ConfirmationModalContent({
  title,
  bottomContent,
  onDismiss,
  topContent,
}: ConfirmationModalContentProps) {
  /* {
  title: ReactNode
  onDismiss: () => void
  topContent: () => ReactNode
  bottomContent?: () => ReactNode | undefined
} */ return (
    <Wrapper>
      <Section>
        {/* <RowBetween> */}
        <GPModalHeader>
          <Text fontWeight={500} fontSize={16}>
            {title}
          </Text>
          <CloseIcon onClick={onDismiss} />
        </GPModalHeader>
        {/* </RowBetween> */}
        {topContent()}
      </Section>
      {bottomContent && <BottomSection gap="12px">{bottomContent()}</BottomSection>}
    </Wrapper>
  )
}

export function TransactionErrorContent({ message, onDismiss }: { message: ReactNode; onDismiss: () => void }) {
  const theme = useContext(ThemeContext)
  return (
    <Wrapper>
      <Section>
        <RowBetween>
          <Text fontWeight={500} fontSize={20}>
            <Trans>Error</Trans>
          </Text>
          <CloseIcon onClick={onDismiss} />
        </RowBetween>
        <AutoColumn style={{ marginTop: 20, padding: '2rem 0' }} gap="24px" justify="center">
          <AlertTriangle color={theme.red1} style={{ strokeWidth: 1.5 }} size={64} />
          <Text
            fontWeight={500}
            fontSize={16}
            color={theme.red1}
            style={{ textAlign: 'center', width: '85%', wordBreak: 'break-word' }}
          >
            {message}
          </Text>
        </AutoColumn>
      </Section>
      <BottomSection gap="12px">
        <ButtonPrimary onClick={onDismiss}>
          <Trans>Dismiss</Trans>
        </ButtonPrimary>
      </BottomSection>
    </Wrapper>
  )
}

interface ConfirmationModalProps {
  isOpen: boolean
  onDismiss: () => void
  hash: string | undefined
  content: () => ReactNode
  attemptingTxn: boolean
  pendingText: ReactNode
  currencyToAdd?: Currency | undefined
}

export default function TransactionConfirmationModal({
  isOpen,
  onDismiss,
  attemptingTxn,
  hash,
  pendingText,
  content,
  currencyToAdd,
}: ConfirmationModalProps) {
  const { chainId } = useActiveWeb3React()

  if (!chainId) return null

  // confirmation screen
  return (
    <GpModal isOpen={isOpen} onDismiss={onDismiss} maxHeight={90}>
      {attemptingTxn ? (
        <ConfirmationPendingContent onDismiss={onDismiss} pendingText={pendingText} />
      ) : hash ? (
        <TransactionSubmittedContent
          chainId={chainId}
          hash={hash}
          onDismiss={onDismiss}
          currencyToAdd={currencyToAdd}
        />
      ) : (
        content()
      )}
    </GpModal>
  )
}
