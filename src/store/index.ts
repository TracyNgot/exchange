import createStore, { reducer } from './create-store';

export type State = ReturnType<typeof reducer>;

export { createStore };
