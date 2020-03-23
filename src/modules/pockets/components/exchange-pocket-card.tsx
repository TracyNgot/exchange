import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, InputNumber, Select, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { getLatestRates } from '../../../store/rates/rate-actions';
import {
  updatePocketFrom,
  updatePocketFromAmount,
  updatePocketTo,
  updatePocketToAmount,
} from '../../../store/exchange-session/exchange-session-actions';
import { State } from '../../../store';

interface ExchangePocketCardProps {
  rate: number;
  isFrom?: boolean;
}

const ExchangePocketCard: React.FC<ExchangePocketCardProps> = ({
  isFrom,
  rate,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { pockets, pocket, error, amount } = useSelector((state: State) => ({
    pockets: state.pockets.pockets,
    error: state.exchangesSession.error,
    pocket: isFrom ? state.exchangesSession.from : state.exchangesSession.to,
    amount: isFrom
      ? state.exchangesSession.fromAmount
      : state.exchangesSession.toAmount,
  }));

  function updateAmount(value) {
    if (isFrom) dispatch(updatePocketFromAmount(rate, parseFloat(value)));
    else dispatch(updatePocketToAmount(rate, parseFloat(value)));
  }

  function updatePocket(pocketId) {
    const pocketToUpdate = pockets.find(({ id }) => id === pocketId);
    if (pocketToUpdate) {
      if (isFrom) {
        dispatch(updatePocketFrom(pocketToUpdate));
        dispatch(getLatestRates(pocketToUpdate.currency));
      } else dispatch(updatePocketTo(pocketToUpdate));
    }
  }

  return (
    <ExchangePocketCardContainer>
      {isFrom && !rate && (
        <Alert type="error" message={t('error.rateNotAvailable')} />
      )}
      {isFrom && error && <Alert type="error" message={t(`error.${error}`)} />}
      <Select
        value={pocket?.id}
        onChange={updatePocket}
        data-testid={`select-currency-${isFrom ? 'from' : 'to'}`}
      >
        {pockets.map(({ currency, id }) => (
          <Select.Option key={`exchange-${id}`} value={id}>
            {currency}
          </Select.Option>
        ))}
      </Select>
      <div className="exchange-amount">
        <InputNumber
          min={0}
          step={0.01}
          onChange={updateAmount}
          autoFocus={isFrom}
          value={amount}
          precision={2}
          disabled={!rate}
        />
        {isFrom && pocket && (
          <Typography.Text>
            {t('exchange.balance', { amount: pocket?.amount.toFixed(2) })}
          </Typography.Text>
        )}
      </div>
    </ExchangePocketCardContainer>
  );
};

const ExchangePocketCardContainer = styled.div``;

export default ExchangePocketCard;
