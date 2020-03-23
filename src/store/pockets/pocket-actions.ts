import pocketApiService from './pocket-api-service';
import { actions, Pocket } from './pocket-reducer';

export const { clear } = actions;

export const getPockets = (after?: any) => async dispatch => {
  if (after) dispatch(actions.getMorePockets());
  else dispatch(actions.getPockets());

  try {
    const { data } = await pocketApiService.getPockets(after);
    dispatch(actions.getPocketsSuccess(data));
  } catch (error) {
    dispatch(actions.getPocketsError(error));
  }
};

export const createPocket = (
  pocket: Pick<Pocket, 'currency'>,
) => async dispatch => {
  dispatch(actions.createPocket());

  try {
    await pocketApiService.createPocket(pocket);
    dispatch(actions.createPocketSuccess());
  } catch (error) {
    dispatch(actions.createPocketError(error));
  }
};
