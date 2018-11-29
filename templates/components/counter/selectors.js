import { createSelector } from 'reselect';

const counterSelector = state => state.counter;

const getCounter = createSelector(counterSelector, ({counter}) => counter);

export { getCounter };
