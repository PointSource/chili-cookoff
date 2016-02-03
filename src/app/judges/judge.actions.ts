import {Judge} from '../judges/judge';

export const SET_CURRENT_JUDGE = 'SET_CURRENT_JUDGE';
export const SET_JUDGE_LIST = 'SET_JUDGE_LIST';

export class JudgeActions {
  	constructor() {
  	}

	setCurrentJudge(judgeId:number) {
	  	return {
		  	type: SET_CURRENT_JUDGE,
		  	judgeId: judgeId
	  	};
	};

	setJudgeList(judges:Judge[]) {
    	return {
			type: SET_JUDGE_LIST,
			judges: judges
    	};
  	};
}