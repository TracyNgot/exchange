import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Carousel, PageHeader, Select, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import ExchangeList from '../../components/exchange-list';
import ExchangeModal from '../../components/exchange-modal';
import PocketCard from './components/pocket-card';
import { PocketsContainer } from './styled/pockets';
import { State } from '../../store';
import { getPockets } from '../../store/pockets/pocket-actions';
import { Pocket } from '../../store/pockets/pocket-reducer';

const Pockets: React.FC = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { creating, pockets } = useSelector((state: State) => ({
    creating: state.exchanges.creating,
    pockets: state.pockets.pockets,
  }));
  const [currentPocket, setCurrentPocket] = useState<Pocket>();
  const [pocketFromExchange, setPocketFromExchange] = useState<Pocket>();

  function onChange(index) {
    setCurrentPocket(pockets[index]);
  }

  function changeLanguage(language) {
    i18n.changeLanguage(language);
    dayjs.locale(language);
    localStorage.setItem('pocket-lang', language);
  }

  useEffect(() => {
    if (!creating) dispatch(getPockets());
  }, [creating, dispatch]);

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
      <PageHeader title={title}>
        <Select
          defaultValue={i18n.language}
          onChange={changeLanguage}
          data-testid="language-selector"
        >
          <Select.Option value="en">EN</Select.Option>
          <Select.Option value="fr">FR</Select.Option>
        </Select>
      </PageHeader>
      {pocketFromExchange && (
        <ExchangeModal
          onClose={() => setPocketFromExchange(undefined)}
          pocket={pocketFromExchange}
        />
      )}
      <Carousel
        afterChange={onChange}
        effect="fade"
        className="pockets-slider"
        initialSlide={0}
      >
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

export default Pockets;
