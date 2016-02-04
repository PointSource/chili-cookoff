import {judges} from './judges/judge.reducer';
import {chilis} from './chili/chili.reducer';
import {rating} from './rating/rating.reducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
	judges,
	chilis,
	rating
})

export default rootReducer;