import rateApiService from './rate-api-service';
import ratesService from '../../services/rates-service';
import { actions, Rate } from './rate-reducer';

export const { clear } = actions;

export const getSavedRates = (after?: any) => async dispatch => {
  if (after) dispatch(actions.getMoreSavedRates());
  else dispatch(actions.getSavedRates());

  try {
    const { data } = await rateApiService.getSavedRates(after);
    dispatch(actions.getSavedRatesSuccess(data));
  } catch (error) {
    dispatch(actions.getSavedRatesError(error));
  }
};

export const getLatestRates = (base?: string) => async dispatch => {
  dispatch(actions.getLatestRates());

  try {
    const { data } = await ratesService.getLatestRates(base);
    dispatch(actions.getLatestRatesSuccess(data));
  } catch (error) {
    dispatch(actions.getLatestRatesError(error));
  }
};

export const saveRate = (rate: Pick<Rate, 'from' | 'to'>) => async dispatch => {
  dispatch(actions.saveRate());

  try {
    await rateApiService.saveRate(rate);
    dispatch(actions.saveRateSuccess());
  } catch (error) {
    dispatch(actions.saveRateError(error));
  }
};

export const deleteRate = (rateId: string) => async dispatch => {
  dispatch(actions.deleteRate());

  try {
    await rateApiService.deleteRate(rateId);
    dispatch(actions.deleteRateSuccess());
  } catch (error) {
    dispatch(actions.deleteRateError(error));
  }
};
