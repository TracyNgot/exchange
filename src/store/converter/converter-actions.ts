import converterApiService from './converter-api-service';
import { actions, Converter } from './converter-reducer';

export const { clear } = actions;

export const getSavedCurrencies = (after?: any) => async dispatch => {
  if (after) dispatch(actions.getMoreSavedCurrencies());
  else dispatch(actions.getSavedCurrencies());

  try {
    const { data } = await converterApiService.getSavedCurrencies(after);
    dispatch(actions.getSavedCurrenciesSuccess(data));
  } catch (error) {
    dispatch(actions.getSavedCurrenciesError(error));
  }
};

export const saveCurrency = (
  converter: Pick<Converter, 'currency'>,
) => async dispatch => {
  dispatch(actions.saveCurrency());

  try {
    await converterApiService.saveCurrency(converter);
    dispatch(actions.saveCurrencySuccess());
  } catch (error) {
    dispatch(actions.saveCurrencyError(error));
  }
};

export const deleteCurrency = (currencyId: string) => async dispatch => {
  dispatch(actions.deleteCurrency());

  try {
    await converterApiService.deleteCurrency(currencyId);
    dispatch(actions.deleteCurrencySuccess());
  } catch (error) {
    dispatch(actions.deleteCurrencyError(error));
  }
};
