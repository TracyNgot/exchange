import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Data, transformToData } from '../../utils/helpers';

export interface Pocket extends Data {
  currency: string;
  amount: number;
}

interface PocketState {
  creating: boolean;
  loading: boolean;
  pockets: Pocket[];
  after?: any;
  error?: any;
}

const initialState: PocketState = {
  creating: false,
  loading: false,
  pockets: [],
};

const pocketSlice = createSlice({
  name: 'pocket',
  initialState,
  reducers: {
    clear: () => initialState,
    getPockets(state) {
      state.error = null;
      state.loading = true;
      state.after = null;
      state.pockets = [];
    },
    getPocketsSuccess(state, { payload }: PayloadAction<any>) {
      state.loading = false;
      state.after = payload.after;
      state.pockets = [
        ...state.pockets,
        ...payload.data.map(data => transformToData<Pocket>(data)),
      ];
    },
    getPocketsError(state, { payload }: PayloadAction<any>) {
      state.loading = false;
      state.error = payload.error;
    },
    getMorePockets(state) {
      state.error = null;
      state.loading = true;
    },

    createPocket(state) {
      state.error = null;
      state.creating = true;
    },
    createPocketSuccess(state) {
      state.creating = false;
    },
    createPocketError(state, { payload }: PayloadAction<any>) {
      state.creating = false;
      state.error = payload.error;
    },
  },
});

export default pocketSlice.reducer;
export const { actions } = pocketSlice;
