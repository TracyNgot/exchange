import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import ExchangeModal from '../../components/exchange-modal';
import { State } from '../../store';
import { getPockets } from '../../store/pockets/pocket-actions';

const Widget: React.FC = () => {
  const dispatch = useDispatch();
  const { creating, pockets, pocketFrom } = useSelector((state: State) => ({
    creating: state.exchanges.creating,
    pockets: state.pockets.pockets,
    pocketFrom: state.exchangesSession.from,
  }));

  useEffect(() => {
    if (!creating) dispatch(getPockets());
  }, [creating, dispatch]);

  return (
    <WidgetContainer>
      {pockets.length > 0 && (
        <ExchangeModal pocket={pocketFrom || pockets[0]} />
      )}
    </WidgetContainer>
  );
};

const WidgetContainer = styled.div``;

export default Widget;
