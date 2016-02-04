import * as JudgeActions from './judge.actions';
import {Judge} from './judge';

var initialJudgeList: Judge[] = [];

const initialState = {
	judgeList: initialJudgeList,
	currentJudge: null
}

export function judges(state = initialState, action) {
	switch (action.type) {
		case JudgeActions.SET_JUDGE_LIST:
			return Object.assign({}, state, {
				judgeList: action.judges
			});
		case JudgeActions.SET_CURRENT_JUDGE:
			var currentJudge: Judge;

			currentJudge = state.judgeList.find(judge => judge.id === action.judgeId);
			if (currentJudge === undefined) {
				return state;
			}

			return Object.assign({}, state, {
				currentJudge: currentJudge
			});
		default: 
			// mandatory for sanity (Eg: initialisation)
			return state;
	}
};