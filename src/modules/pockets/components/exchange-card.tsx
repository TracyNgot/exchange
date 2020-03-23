import React from 'react';
import styled from 'styled-components';
import { List, Statistic, Typography } from 'antd';
import {
  PlusOutlined,
  MinusOutlined,
  RightOutlined,
  SyncOutlined,
} from '@ant-design/icons';

import { toFormattedDate } from '../../../utils/helpers';
import { Exchange } from '../../../store/exchanges/exchange-reducer';
import { Pocket } from '../../../store/pockets/pocket-reducer';
import { currencies } from '../../../utils/currencies';

interface ExchangeCardProps {
  exchange: Exchange;
  pocket: Pocket;
}

const ExchangeCard: React.FC<ExchangeCardProps> = ({ exchange, pocket }) => {
  const { from, to, amount, date, rate } = exchange;
  const { currency } = pocket;
  const isCredit = (to as Pocket).id === pocket.id;
  const iconStyle = {
    fontSize: '16px',
  };
  const prefix = (
    <>
      {isCredit ? (
        <PlusOutlined style={iconStyle} />
      ) : (
        <MinusOutlined style={iconStyle} />
      )}
      <span>{currencies[currency].symbol}</span>
    </>
  );

  const extra = (
    <Statistic
      className={isCredit ? 'credit' : 'debit'}
      value={isCredit ? amount * (rate as number) : amount}
      valueStyle={{
        fontSize: '4em',
      }}
      precision={2}
      prefix={prefix}
    />
  );

  const title = (
    <Typography.Text className="exchange-label">
      <Typography.Text>{(from as Pocket).currency}</Typography.Text>
      <RightOutlined />
      <Typography.Text>{(to as Pocket).currency}</Typography.Text>
    </Typography.Text>
  );

  return (
    <ExchangeCardContainer extra={extra}>
      <List.Item.Meta
        title={title}
        description={toFormattedDate(date)}
        avatar={<SyncOutlined />}
      />
    </ExchangeCardContainer>
  );
};

const ExchangeCardContainer = styled(List.Item)``;

export default ExchangeCard;
