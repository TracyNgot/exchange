import { Pocket } from '../pockets/pocket-reducer';
import { actions } from '.';

export const { clear } = actions;

export const init = (from: Pocket, to: Pocket) => dispatch =>
  dispatch(actions.init({ from, to }));
export const updatePocketTo = (to: Pocket) => dispatch =>
  dispatch(actions.updatePocketTo(to));
export const updatePocketFrom = (from: Pocket) => dispatch =>
  dispatch(actions.updatePocketFrom(from));
export const updatePocketFromAmount = (
  rate: number,
  amount: number,
) => dispatch => dispatch(actions.updatePocketFromAmount({ rate, amount }));
export const updatePocketToAmount = (
  rate: number,
  amount: number,
) => dispatch => dispatch(actions.updatePocketToAmount({ rate, amount }));
