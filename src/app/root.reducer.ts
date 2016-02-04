import {judges} from './judges/judge.reducer';
import {chilis} from './chili/chili.reducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
	judges,
	chilis
})

export default rootReducer;