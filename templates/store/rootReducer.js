import { combineReducers } from 'redux';
import { counterReducer } from '../components/counter';

export default combineReducers({
  counter: counterReducer,
});
