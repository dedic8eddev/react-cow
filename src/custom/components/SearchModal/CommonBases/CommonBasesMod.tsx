import { Trans } from '@lingui/macro'
import React from 'react'
import { Text } from 'rebass'
import { Currency } from '@uniswap/sdk-core'
import styled from 'styled-components/macro'

import { COMMON_BASES } from 'constants/routing'
import { currencyId } from 'utils/currencyId'
// import { AutoColumn } from 'components/Column'
import QuestionHelper from 'components/QuestionHelper'
import { AutoRow } from 'components/Row'
import CurrencyLogo from 'components/CurrencyLogo'
import { BaseWrapper, CommonBasesRow, CommonBasesProps, AutoColumn } from '.' // mod

export const BaseWrapperMod = styled.div<{ disable?: boolean }>`
  // mod
  border: 1px solid ${({ theme, disable }) => (disable ? 'transparent' : theme.bg3)};
  border-radius: 10px;
  display: flex;
  padding: 6px;

  align-items: center;
  :hover {
    cursor: ${({ disable }) => !disable && 'pointer'};
    background-color: ${({ theme, disable }) => !disable && theme.bg4};
  }

  color: ${({ theme, disable }) => disable && theme.text3};
  background-color: ${({ theme, disable }) => disable && theme.bg3};
  filter: ${({ disable }) => disable && 'grayscale(1)'};
`

export default function CommonBases({ chainId, onSelect, selectedCurrency }: CommonBasesProps) {
  /* {
  chainId?: number
  selectedCurrency?: Currency | null
  onSelect: (currency: Currency) => void
} */
  const bases = typeof chainId !== 'undefined' ? COMMON_BASES[chainId] ?? [] : []

  return bases.length > 0 ? (
    <AutoColumn gap="md">
      <AutoRow>
        <Text fontWeight={500} fontSize={14}>
          {/* <Trans>Common bases</Trans> */}
          <Trans>Common tokens</Trans>
        </Text>
        <QuestionHelper text={<Trans>These tokens are commonly paired with other tokens.</Trans>} />
      </AutoRow>
      <CommonBasesRow gap="4px">
        {bases.map((currency: Currency) => {
          const isSelected = selectedCurrency?.equals(currency)
          return (
            <BaseWrapper
              onClick={() => !isSelected && onSelect(currency)}
              disable={isSelected}
              key={currencyId(currency)}
            >
              <CurrencyLogo currency={currency} style={{ marginRight: 8 }} />
              <Text fontWeight={500} fontSize={16}>
                {currency.symbol}
              </Text>
            </BaseWrapper>
          )
        })}
      </CommonBasesRow>
    </AutoColumn>
  ) : null
}
