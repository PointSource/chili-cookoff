import * as JudgeActions from './judges/judge.actions';
import {judgeReducer} from './judges/judge.reducer';
import {currentJudgeReducer} from './judges/current-judge.reducer';
import {Judge} from './judges/judge';


const initialState = {
	ratings: [],
	judges: [],
	currentJudge: null
}

export function rootReducer(state = initialState, action) {
	return {
		judges: judgeReducer(state.judges, action),
		currentJudge: currentJudgeReducer(state.judges, action)
	}
};