import {judgeReducer} from './judges/judge.reducer';

export function rootReducer(state = {}, action) {
	return {
		judges: judgeReducer(state.judges, action),
	}
};