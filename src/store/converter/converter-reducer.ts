import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Data, transformToData } from '../../utils/helpers';

export interface Converter extends Data {
  currency: string;
}

interface ConverterState {
  creating: boolean;
  deleting: boolean;
  loading: boolean;
  savedCurrencies: Converter[];
  after?: any;
  currencies?: Record<string, string>;
  error?: any;
}

const initialState: ConverterState = {
  creating: false,
  deleting: false,
  loading: false,
  savedCurrencies: [],
};

const converterSlice = createSlice({
  name: 'converter',
  initialState,
  reducers: {
    clear: () => initialState,
    getSavedCurrencies(state) {
      state.error = null;
      state.loading = true;
      state.after = null;
      state.savedCurrencies = [];
    },
    getSavedCurrenciesSuccess(state, { payload }: PayloadAction<any>) {
      state.loading = false;
      state.after = payload.after;
      state.savedCurrencies = [
        ...state.savedCurrencies,
        ...payload.data.map(data => transformToData<Converter>(data)),
      ];
    },
    getSavedCurrenciesError(state, { payload }: PayloadAction<any>) {
      state.loading = false;
      state.error = payload.error;
    },
    getMoreSavedCurrencies(state) {
      state.error = null;
      state.loading = true;
    },

    saveCurrency(state) {
      state.error = null;
      state.creating = true;
    },
    saveCurrencySuccess(state) {
      state.creating = false;
    },
    saveCurrencyError(state, { payload }: PayloadAction<any>) {
      state.creating = false;
      state.error = payload.error;
    },

    deleteCurrency(state) {
      state.error = null;
      state.deleting = true;
    },
    deleteCurrencySuccess(state) {
      state.deleting = false;
    },
    deleteCurrencyError(state, { payload }: PayloadAction<any>) {
      state.deleting = false;
      state.error = payload.error;
    },
  },
});

export default converterSlice.reducer;
export const { actions } = converterSlice;
