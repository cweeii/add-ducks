import { connect } from 'react-redux';

import {
  increment,
  decrement,
  incrementAsync,
  decrementAsync,
} from './actions';
import { getCounter } from './selectors';
import Counter from './Counter.js';

const mapStateToProps = state => ({
  counter: getCounter(state),
});

const mapDispatchToProps = {
  increment,
  decrement,
  incrementAsync,
  decrementAsync,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter);
