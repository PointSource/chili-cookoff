import {judges} from './judges/judge.reducer';
import {chilis} from './chili/chili.reducer';
import {combineReducers} from '../lib/redux.js'

const rootReducer = combineReducers({
	judges,
	chilis
})

export default rootReducer;