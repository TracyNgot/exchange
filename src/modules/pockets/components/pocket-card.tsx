import React from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { Button, Statistic } from 'antd';
import { useTranslation } from 'react-i18next';

import { PocketContainer } from '../styled/pockets';
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

export default PocketCard;
