import React, { useEffect } from 'react';
import { List, Empty } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import ExchangeCard from '../components/exchange-card';
import { useOnScroll } from '../hooks';
import { expandPockets } from '../utils/helpers';
import { getExchangesByPocket } from '../store/exchanges/exchange-actions';
import { Pocket } from '../store/pockets/pocket-reducer';
import { State } from '../store';

interface ExchangeListProps {
  pocket: Pocket;
}

const ExchangeList: React.FC<ExchangeListProps> = ({ pocket }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { after, loading, creating, exchanges, pockets } = useSelector(
    (state: State) => ({
      after: state.exchanges.after,
      loading: state.exchanges.loading,
      exchanges: state.exchanges.exchanges,
      creating: state.exchanges.creating,
      pockets: state.pockets.pockets,
    }),
  );

  function loadMoreExchanges() {
    if (!loading && after) dispatch(getExchangesByPocket(pocket.id, after));
  }

  useOnScroll(loadMoreExchanges);

  useEffect(() => {
    if (pocket?.id && !creating) dispatch(getExchangesByPocket(pocket.id));
  }, [pocket, creating, dispatch]);

  if (!loading && exchanges.length === 0)
    return <Empty description={t('empty.noExchange')} />;

  return (
    <List bordered={false} loading={loading}>
      {exchanges.map(exchange => (
        <ExchangeCard
          key={exchange.id}
          exchange={expandPockets(exchange, pockets)}
          pocket={pocket}
        />
      ))}
    </List>
  );
};

export default ExchangeList;
