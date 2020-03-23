import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StatusState {
  error: string;
  success: string;
  counter: number;
}

const initialState: StatusState = {
  error: '',
  success: '',
  counter: 0,
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    clear: () => initialState,
    done(state, { payload }: PayloadAction<{ name: string }>) {
      state.counter++;
      state.success = payload.name;
      state.error = '';
    },
    error(state, { payload }: PayloadAction<{ name: string }>) {
      state.counter++;
      state.error = payload.name;
      state.success = '';
    },
  },
});

export const { actions } = statusSlice;
export default statusSlice.reducer;
