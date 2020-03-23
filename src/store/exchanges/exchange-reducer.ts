import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Data, transformToData } from '../../utils/helpers';
import { Pocket } from '../pockets/pocket-reducer';

export interface Exchange extends Data {
  amount: number;
  from: Pocket | string;
  to: Pocket | string;
  rate?: number;
}

interface ExchangeState {
  creating: boolean;
  loading: boolean;
  exchanges: Exchange[];
  after?: any;
  error?: any;
}

const initialState: ExchangeState = {
  creating: false,
  loading: false,
  exchanges: [],
};

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    clear: () => initialState,
    getExchangesByPocket(state) {
      state.error = null;
      state.loading = true;
      state.after = null;
      state.exchanges = [];
    },
    getExchangesByPocketSuccess(state, { payload }: PayloadAction<any>) {
      state.loading = false;
      state.after = payload.after;
      state.exchanges = [
        ...state.exchanges,
        ...payload.data.map(data => transformToData<Exchange>(data)),
      ];
    },
    getExchangesByPocketError(state, { payload }: PayloadAction<any>) {
      state.loading = false;
      state.error = payload.error;
    },
    getMoreExchangesByPocket(state) {
      state.error = null;
      state.loading = true;
    },

    createExchange(state) {
      state.error = null;
      state.creating = true;
    },
    createExchangeSuccess(state) {
      state.creating = false;
    },
    createExchangeError(state, { payload }: PayloadAction<any>) {
      state.creating = false;
      state.error = payload.error;
    },
  },
});

export default exchangeSlice.reducer;
export const { actions } = exchangeSlice;
