import React, { useCallback, useEffect, useState } from 'react';
import { Button, Spin, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';

import ExchangePocketCard from '../components/exchange-pocket-card';
import { ExchangeModalContainer } from '../modules/pockets/styled/pockets';
import { useTimer } from '../hooks';
import { State } from '../store';
import {
  clear,
  init,
} from '../store/exchange-session/exchange-session-actions';
import { createExchange } from '../store/exchanges/exchange-actions';
import { Pocket } from '../store/pockets/pocket-reducer';
import { getLatestRates } from '../store/rates/rate-actions';

interface ExchangeModalProps {
  onClose?: () => void;
  pocket: Pocket;
}

const ExchangeModal: React.FC<ExchangeModalProps> = ({ onClose, pocket }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    base,
    bootstrapped,
    pockets,
    latestRates,
    loading,
    error,
    pocketFromExchange,
    pocketToExchange,
    pocketFromAmountExchange,
    isReady,
    creating,
  } = useSelector((state: State) => ({
    bootstrapped: state.exchangesSession.bootstrapped,
    pockets: state.pockets.pockets,
    pocketFromExchange: state.exchangesSession.from,
    pocketFromAmountExchange: state.exchangesSession.fromAmount,
    pocketToExchange: state.exchangesSession.to,
    isReady: state.exchangesSession.isReady,
    latestRates: state.rates.latestRates,
    base: state.rates.base,
    error: state.rates.error,
    loading: state.rates.loading,
    creating: state.exchanges.creating,
  }));
  const [rate, setRate] = useState<number>();

  function handleExchange() {
    dispatch(
      createExchange({
        amount: pocketFromAmountExchange,
        from: pocketFromExchange?.id,
        to: pocketToExchange?.id,
        rate,
      } as any),
    );
  }
  const refreshRates = useCallback(() => {
    if (!loading && pocketFromExchange)
      dispatch(getLatestRates(pocketFromExchange.currency));
  }, [dispatch, loading, pocketFromExchange]);

  useTimer(refreshRates);

  useEffect(() => {
    dispatch(init(pocket, pockets.find(p => p.id !== pocket.id) as Pocket));
    return () => {
      dispatch(clear());
    };
  }, [dispatch, pocket, pockets]);

  useEffect(() => {
    if (!error && pocketFromExchange && base !== pocketFromExchange.currency)
      refreshRates();
  }, [base, error, pocketFromExchange, refreshRates]);

  useEffect(() => {
    if (error) setRate(undefined);
    else if (latestRates && pocketToExchange)
      setRate(latestRates[pocketToExchange.currency]);
  }, [latestRates, error, pocketToExchange]);

  const footer = (
    <Button
      data-testid="submit-exchange"
      type="primary"
      size="large"
      loading={creating}
      disabled={
        !isReady ||
        !rate ||
        !pocketToExchange ||
        !pocketFromExchange ||
        !pocketFromAmountExchange ||
        isEqual(pocketToExchange, pocketFromExchange)
      }
      onClick={handleExchange}
    >
      {t('pocket.exchange')}
    </Button>
  );

  return (
    <ExchangeModalContainer
      data-testid="exchange-modal"
      onCancel={onClose}
      footer={footer}
      centered
      visible
      closable={!onClose}
    >
      <Spin spinning={!bootstrapped || !rate} delay={500}>
        {rate && (
          <>
            <ExchangePocketCard rate={rate} isFrom />
            <div className="rates">
              <Tag key={rate}>{rate}</Tag>
            </div>
            <ExchangePocketCard rate={rate} />
          </>
        )}
      </Spin>
    </ExchangeModalContainer>
  );
};

export default ExchangeModal;
