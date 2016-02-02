import {Judge} from '../judges/judge';

export const SET_CURRENT_JUDGE = 'SET_CURRENT_JUDGE';

export class ChiliActions {
  constructor() {
  }


  setCurrentJudge(judgeId) {
    return {
      type: SET_CURRENT_JUDGE,
      judgeId: judgeId
    };
  };
}