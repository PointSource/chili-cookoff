import * as JudgeActions from './judge.actions';
import {Judge} from './judge';


export function judgeReducer(state = [], action) {
	switch (action.type) {
		case JudgeActions.SET_JUDGE_LIST:
			console.log(action);
			return action.judges;
		default: 
			// mandatory for sanity (Eg: initialisation)
			return state;
	}
};