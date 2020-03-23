import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Carousel, PageHeader, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import ExchangeList from './components/exchange-list';
import ExchangeModal from './components/exchange-modal';
import PocketCard from './components/pocket-card';
import { State } from '../../store';
import { Pocket } from '../../store/pockets/pocket-reducer';
import { getPockets } from '../../store/pockets/pocket-actions';

const Pockets: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { creating, pockets } = useSelector((state: State) => ({
    creating: state.exchanges.creating,
    pockets: state.pockets.pockets,
  }));
  const [currentPocket, setCurrentPocket] = useState<Pocket>();
  const [pocketFromExchange, setPocketFromExchange] = useState<Pocket>();

  function onChange(index) {
    setCurrentPocket(pockets[index]);
  }

  useEffect(() => {
    if (!creating) dispatch(getPockets());
  }, [creating]);

  useEffect(() => {
    if (pockets.length > 0) setCurrentPocket(pockets[0]);
  }, [pockets]);

  const title = (
    <>
      {t('menu.pockets')}
      {currentPocket && <Tag>{currentPocket?.currency}</Tag>}
    </>
  );

  return (
    <PocketsContainer>
      <PageHeader title={title} />
      {pocketFromExchange && (
        <ExchangeModal
          onClose={() => setPocketFromExchange(undefined)}
          pocket={pocketFromExchange}
        />
      )}
      <Carousel afterChange={onChange} effect="fade" slickGoTo={0}>
        {pockets.map(pocket => (
          <PocketCard
            key={pocket.id}
            pocket={pocket}
            setExchangeModalVisible={() => setPocketFromExchange(pocket)}
          />
        ))}
      </Carousel>
      {currentPocket && <ExchangeList pocket={currentPocket} />}
    </PocketsContainer>
  );
};

const PocketsContainer = styled.div``;

export default Pockets;
