import * as JudgeActions from './judge.actions';
import {Judge} from './judge';


export function currentJudgeReducer(state = [], action) {
	switch (action.type) {
		case JudgeActions.SET_CURRENT_JUDGE:
			var currentJudge: Judge;

			var filteredJudges = state.filter(judge => judge.id === action.judgeId);
			if (filteredJudges.length > 0) {
				currentJudge = filteredJudges[0];
			}
			else {
				currentJudge = null;
			}

			return currentJudge;
		default: 
			// mandatory for sanity (Eg: initialisation)
			return null;
	}
};