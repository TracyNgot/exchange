import { actions } from './status-reducer';

export const { clear } = actions;

export const done = (name: string) => dispatch => {
  dispatch(actions.done({ name }));
};

export const error = (name: string) => dispatch => {
  dispatch(actions.error({ name }));
};
