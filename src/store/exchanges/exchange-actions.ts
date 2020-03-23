import exchangeApiService from './exchange-api-service';
import { actions, Exchange } from './exchange-reducer';

export const { clear } = actions;

export const getExchangesByPocket = (
  pocketId: string,
  after?: any,
) => async dispatch => {
  if (after) dispatch(actions.getMoreExchangesByPocket());
  else dispatch(actions.getExchangesByPocket());

  try {
    const { data } = await exchangeApiService.getExchangesByPocketId(
      pocketId,
      after,
    );
    dispatch(actions.getExchangesByPocketSuccess(data));
  } catch (error) {
    dispatch(actions.getExchangesByPocketError(error));
  }
};

export const createExchange = (
  exchange: Exclude<Exchange, 'date' | 'id'>,
) => async dispatch => {
  dispatch(actions.createExchange());

  try {
    await exchangeApiService.createExchange(exchange);
    dispatch(actions.createExchangeSuccess());
  } catch (error) {
    dispatch(actions.createExchangeError(error));
  }
};
