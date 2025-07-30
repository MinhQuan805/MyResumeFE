import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
const allReducers = combineReducers({
    alert: alertReducer
});

export default allReducers;