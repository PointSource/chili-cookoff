import * as ChiliActions from './chili.actions';
import {Rating} from '../rating/rating';
import {Judge} from '../judges/judge';

var initialJudges: Judge[] = [
	{ "id": 1, "name": "Mandy" },
	{ "id": 2, "name": "Erik" },
	{ "id": 3, "name": "Jen" },
	{ "id": 4, "name": "CJ" },
	{ "id": 5, "name": "Kevin M" },
];

const initialState = {
	ratings: [],
	judges: initialJudges,
	currentJudge: initialJudges[1]
}

export function rootReducer(state = initialState, action) {
	switch (action.type) {
		case ChiliActions.SET_CURRENT_JUDGE:

			var currentJudge: Judge;

			var filteredJudges = state.judges.filter(judge => judge.id === action.judgeId);
			console.log('judgeID',action.judgeId);
			console.log('judges list',state.judges);
			console.log('filteredJudges',filteredJudges);
			if (filteredJudges.length > 0) {
				currentJudge = filteredJudges[0];
			}
			else {
				currentJudge = null;
			}
			return {
				ratings: state.ratings.map(rating => rating),
				judges: state.judges.map(judge => judge),
				currentJudge: currentJudge
			};
			break; 
		default: 
			// mandatory for sanity (Eg: initialisation)
			return state;
	}
};