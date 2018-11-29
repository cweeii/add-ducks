import { createActions } from 'redux-actions';

import { createAsyncAction } from '../../lib';
import {
  INCREMENT,
  DECREMENT,
  INCREMENT_ASYNC,
  DECREMENT_ASYNC,
} from './actionTypes';

const { increment, decrement } = createActions({
  [INCREMENT]: () => ({ amount: 3 }),
  [DECREMENT]: () => ({ amount: 1 }),
});

const incrementAsync = createAsyncAction(
  INCREMENT_ASYNC,
  async (dispatch, getState) => {
    return { amount: 10 };
  },
);

const decrementAsync = createAsyncAction(
  DECREMENT_ASYNC,
  async (dispatch, getState) => {
    return { amount: 10 };
  },
);

export { increment, decrement, incrementAsync, decrementAsync };
