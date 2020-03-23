import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pocket } from '../pockets/pocket-reducer';

interface ExchangeSessionState {
  fromAmount: number;
  toAmount: number;
  bootstrapped: boolean;
  isReady: boolean;
  error?: any;
  from?: Pocket;
  to?: Pocket;
}

const initialState: ExchangeSessionState = {
  bootstrapped: false,
  isReady: false,
  fromAmount: 0,
  toAmount: 0,
};

const exchangeSessionSlice = createSlice({
  name: 'exchangeSession',
  initialState,
  reducers: {
    clear: () => initialState,
    init(state, { payload }: PayloadAction<{ from: Pocket; to: Pocket }>) {
      state.from = payload.from;
      state.to = payload.to;
      state.bootstrapped = true;
    },
    updatePocketTo(state, { payload }: PayloadAction<Pocket>) {
      state.to = payload;
    },
    updatePocketFrom(state, { payload }: PayloadAction<Pocket>) {
      state.from = payload;
    },
    updatePocketToAmount(
      state,
      { payload }: PayloadAction<{ rate: number; amount: number }>,
    ) {
      if (!state.from) return;

      state.toAmount = payload.amount;
      state.fromAmount = payload.amount / payload.rate;

      if (state.fromAmount > state.from.amount) {
        state.error = 'balanceNotSufficient';
        state.isReady = false;
      } else if (state.fromAmount === 0) state.isReady = false;
      else {
        state.isReady = true;
        state.error = null;
      }
    },
    updatePocketFromAmount(
      state,
      { payload }: PayloadAction<{ rate: number; amount: number }>,
    ) {
      state.fromAmount = payload.amount;
      state.toAmount = payload.amount * payload.rate;

      if (state.from && state.fromAmount > state.from.amount) {
        state.isReady = false;
        state.error = 'balanceNotSufficient';
      } else if (state.fromAmount === 0) state.isReady = false;
      else {
        state.isReady = true;
        state.error = null;
      }
    },
  },
});

export const { actions } = exchangeSessionSlice;
export default exchangeSessionSlice.reducer;
