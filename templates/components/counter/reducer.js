import { handleActions } from 'redux-actions';

import { increment, decrement } from './actions';

const defaultState = {
  counter: 0,
};

const reducer = handleActions(
  {
    [increment]: (state, { payload: { amount } }) => ({
      ...state,
      counter: state.counter + amount,
    }),
    [decrement]: (state, { payload: { amount } }) => ({
      ...state,
      counter: state.counter - amount,
    }),
    INCREMENT_ASYNC_ENDED: (state, { payload: { amount } }) => ({
      ...state,
      counter: state.counter + amount,
    }),
    DECREMENT_ASYNC_ENDED: (state, { payload: { amount } }) => ({
      ...state,
      counter: state.counter - amount,
    }),
  },
  defaultState,
);

export default reducer;
