import * as JudgeActions from './judges/judge.actions';
import {Rating} from './rating/rating';
import {Judge} from './judges/judge';

var initialJudges: Judge[];
var initialJudge: Judge;

const initialState = {
	ratings: [],
	judges: initialJudges,
	currentJudge: initialJudge
}

export function rootReducer(state = initialState, action) {
	switch (action.type) {
		case JudgeActions.SET_JUDGE_LIST:
			return Object.assign({}, state, {
				judges: action.judges,
				currentJudge: action.judges[0]
			});
		case JudgeActions.SET_CURRENT_JUDGE:

			var currentJudge: Judge;

			var filteredJudges = state.judges.filter(judge => judge.id === action.judgeId);
			if (filteredJudges.length > 0) {
				currentJudge = filteredJudges[0];
			}
			else {
				currentJudge = null;
			}

			return Object.assign({}, state, {
				currentJudge: currentJudge
			});
		default: 
			// mandatory for sanity (Eg: initialisation)
			return state;
	}
};