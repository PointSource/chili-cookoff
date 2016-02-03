import * as ChiliActions from './chili.actions';
import {Rating} from '../rating/rating'

const initialState = {
	ratings: [],
	judges: [
		{ "id": 1, "name": "Mandy" },
		{ "id": 2, "name": "Erik" },
		{ "id": 3, "name": "Jen" },
		{ "id": 4, "name": "CJ" },
		{ "id": 5, "name": "Kevin M" },
	],
	currentJudge: 1
}

export function rootReducer(state = initialState, action) {
	switch (action.type) {
		case ChiliActions.SET_CURRENT_JUDGE:
			console.log('set current judge action');
			console.log(state);
			console.log(action.judgeId);
			// state.currentJudge = action.judgeId;
			return {
				ratings: state.ratings.map(rating => rating),
				judges: state.judges.map(judge => judge),
				currentJudge: action.judgeId
			};
			break; 
		default: 
			// mandatory for sanity (Eg: initialisation)
			return state;
	}
};