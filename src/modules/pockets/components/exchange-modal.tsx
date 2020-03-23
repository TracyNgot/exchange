import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Modal, Spin, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import ExchangePocketCard from './exchange-pocket-card';
import { createExchange } from '../../../store/exchanges/exchange-actions';
import { State } from '../../../store';
import { Pocket } from '../../../store/pockets/pocket-reducer';
import {
  init,
  clear,
} from '../../../store/exchange-session/exchange-session-actions';
import { getLatestRates } from '../../../store/rates/rate-actions';
import { useTimer } from '../../../hooks';

interface ExchangeModalProps {
  onClose: () => void;
  pocket: Pocket;
}

const ExchangeModal: React.FC<ExchangeModalProps> = ({ onClose, pocket }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    bootstrapped,
    pockets,
    latestRates,
    loading,
    error,
    pocketFromExchange,
    pocketToExchange,
    pocketFromAmmountExchange,
    isReady,
    creating,
  } = useSelector((state: State) => ({
    bootstrapped: state.exchangesSession.bootstrapped,
    pockets: state.pockets.pockets,
    pocketFromExchange: state.exchangesSession.from,
    pocketFromAmmountExchange: state.exchangesSession.fromAmount,
    pocketToExchange: state.exchangesSession.to,
    isReady: state.exchangesSession.isReady,
    latestRates: state.rates.latestRates,
    error: state.rates.error,
    loading: state.rates.loading,
    creating: state.exchanges.creating,
  }));
  const [rate, setRate] = useState<number>();

  function refreshRates() {
    if (!loading && pocketFromExchange)
      dispatch(getLatestRates(pocketFromExchange.currency));
  }

  function handleExchange() {
    dispatch(
      createExchange({
        amount: pocketFromAmmountExchange,
        from: pocketFromExchange?.id,
        to: pocketToExchange?.id,
        rate,
      } as any),
    );
  }

  useTimer(refreshRates);

  useEffect(() => {
    dispatch(init(pocket, pockets.find(p => p.id !== pocket.id) as Pocket));
    return () => {
      dispatch(clear());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) setRate(undefined);
    else if (latestRates && pocketToExchange)
      setRate(latestRates[pocketToExchange.currency]);
    else if (!latestRates) refreshRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestRates, error, pocketToExchange]);

  const footer = (
    <Button
      data-testid="submit-exchange"
      type="primary"
      shape="round"
      loading={creating}
      disabled={!isReady || !rate}
      onClick={handleExchange}
    >
      {t('exchange')}
    </Button>
  );

  return (
    <ExchangeModalContainer
      data-testid="exchange-modal"
      onCancel={onClose}
      footer={footer}
      centered
      visible
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

const ExchangeModalContainer = styled(Modal)`
  z-index: 1000;
`;

export default ExchangeModal;
