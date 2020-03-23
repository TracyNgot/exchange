import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Data, transformToData } from '../../utils/helpers';

export interface Rate extends Data {
  from: string;
  to: string;
}

interface RateState {
  creating: boolean;
  deleting: boolean;
  loading: boolean;
  savedRates: Rate[];
  latestRates?: Record<string, number>;
  after?: any;
  error?: any;
}

const initialState: RateState = {
  creating: false,
  deleting: false,
  loading: false,
  savedRates: [],
};

const rateSlice = createSlice({
  name: 'rate',
  initialState,
  reducers: {
    clear: () => initialState,
    getSavedRates(state) {
      state.error = null;
      state.loading = true;
      state.after = null;
      state.savedRates = [];
    },
    getSavedRatesSuccess(state, { payload }: PayloadAction<any>) {
      state.loading = false;
      state.after = payload.after;
      state.savedRates = [
        ...state.savedRates,
        ...payload.data.map(data => transformToData<Rate>(data)),
      ];
    },
    getSavedRatesError(state, { payload }: PayloadAction<any>) {
      state.loading = false;
      state.error = payload.error;
    },
    getMoreSavedRates(state) {
      state.error = null;
      state.loading = true;
    },

    getLatestRates(state) {
      state.error = null;
      state.loading = true;
    },
    getLatestRatesSuccess(state, { payload }: PayloadAction<any>) {
      state.loading = false;
      state.latestRates = payload.rates;
    },
    getLatestRatesError(state, { payload }: PayloadAction<any>) {
      state.loading = false;
      state.error = payload.error;
    },

    saveRate(state) {
      state.error = null;
      state.creating = true;
    },
    saveRateSuccess(state) {
      state.creating = false;
    },
    saveRateError(state, { payload }: PayloadAction<any>) {
      state.creating = false;
      state.error = payload.error;
    },

    deleteRate(state) {
      state.error = null;
      state.deleting = true;
    },
    deleteRateSuccess(state) {
      state.deleting = false;
    },
    deleteRateError(state, { payload }: PayloadAction<any>) {
      state.deleting = false;
      state.error = payload.error;
    },
  },
});

export default rateSlice.reducer;
export const { actions } = rateSlice;
