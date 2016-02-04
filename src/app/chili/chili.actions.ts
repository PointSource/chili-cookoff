import {Chili} from './chili';

export const SET_CHILI_LIST = 'SET_CHILI_LIST';

export class ChiliActions {
	constructor() {
	}

	setChiliList(chilis: Chili[]) {
		return {
			type: SET_CHILI_LIST,
			chilis: chilis
		};
	};

}