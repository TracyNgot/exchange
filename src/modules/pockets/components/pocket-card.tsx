import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { SyncOutlined } from '@ant-design/icons';
import { Button, Statistic } from 'antd';

import { Pocket } from '../../../store/pockets/pocket-reducer';

import { currencies } from '../../../utils/currencies';

interface PocketCard {
  pocket: Pocket;
  setExchangeModalVisible: () => void;
}

const PocketCard: React.FC<PocketCard> = ({
  pocket,
  setExchangeModalVisible,
}) => {
  const { t } = useTranslation();
  const { currency, amount, id } = pocket;
  const { symbol } = currencies[currency];

  return (
    <PocketContainer>
      <Statistic
        title={currency}
        value={amount}
        valueStyle={{
          fontSize: '4em',
        }}
        precision={2}
        prefix={symbol}
      />
      <Button
        data-testid={`exchange-${id}-btn`}
        shape="round"
        icon={<SyncOutlined />}
        size="large"
        onClick={() => setExchangeModalVisible()}
      >
        {t('pocket.exchange')}
      </Button>
    </PocketContainer>
  );
};

const movingBackground = keyframes`
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
`;

const PocketContainer = styled.div`
  animation: ${movingBackground} 10s ease infinite;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 400px;
  overflow: hidden;
  background: #654ea3;
  background: -webkit-linear-gradient(270deg, #654ea3, #eaafc8);
  background: linear-gradient(270deg, #654ea3, #eaafc8);
  background-size: 200% 200%;

  .ant-statistic {
    color: white;
  }
`;

export default PocketCard;
