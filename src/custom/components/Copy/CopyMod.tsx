import React from 'react'
import styled from 'styled-components/macro'
import useCopyClipboard from 'hooks/useCopyClipboard'

import { LinkStyledButton } from 'theme'
import { CheckCircle, Copy } from 'react-feather'
import { Trans } from '@lingui/macro'
import { TransactionStatusText } from 'components/Copy' // mod

export const CopyIcon = styled(LinkStyledButton)`
  color: ${({ theme }) => theme.text3};
  flex-shrink: 0;
  display: flex;
  text-decoration: none;
  font-size: 0.825rem;
  :hover,
  :active,
  :focus {
    text-decoration: none;
    color: ${({ theme }) => theme.text2};
  }
`

/* const TransactionStatusText = styled.span`
  margin-left: 0.25rem;
  font-size: 0.825rem;
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
` */

export default function CopyHelper(props: { toCopy: string; children?: React.ReactNode; clickableLink?: boolean }) {
  const { toCopy, children, clickableLink } = props
  const [isCopied, setCopied] = useCopyClipboard()

  return (
    <>
      {clickableLink && <LinkStyledButton onClick={() => setCopied(toCopy)}>{toCopy}</LinkStyledButton>}
      <CopyIcon onClick={() => setCopied(toCopy)}>
        {isCopied ? (
          <TransactionStatusText
            isCopied={isCopied} // mod
          >
            <CheckCircle size={'16'} />
            <TransactionStatusText
              isCopied={isCopied} // mod
            >
              <Trans>Copied</Trans>
            </TransactionStatusText>
          </TransactionStatusText>
        ) : (
          <TransactionStatusText>
            <Copy size={'16'} />
          </TransactionStatusText>
        )}
        {isCopied ? '' : children}
      </CopyIcon>
    </>
  )
}
