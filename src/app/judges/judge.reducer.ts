import * as JudgeActions from './judge.actions';
import {Judge} from './judge';


export function judgeReducer(state:Judge[] = [], action) {
	switch (action.type) {
		case JudgeActions.SET_JUDGE_LIST:
			console.log(action);
			return action.judges;
		case JudgeActions.SET_CURRENT_JUDGE:
			console.log("state BEGINNING", state);

			// Set all judges.isSelected to false
			var newState: Judge[] = state.map(judge => {
				return Object.assign({}, judge, {
					isSelected: false
				});
			});


			// Get index of judge with matching ID
			var currentJudgeIndex = newState.findIndex(judge => judge.id === action.judgeId);
			if (currentJudgeIndex === -1) {
				return state;
			}

			// Set matching judge.isSelected to true
			newState[currentJudgeIndex].isSelected = true;

			console.log("state END", state);
			console.log("newState", newState);

			return newState;
		default: 
			// mandatory for sanity (Eg: initialisation)
			return state;
	}
};