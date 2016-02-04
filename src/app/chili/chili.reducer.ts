import * as ChiliActions from './chili.actions';
import {Chili} from './chili';


export function chilis(state: Chili[] = [], action) {
	switch (action.type) {
		case ChiliActions.SET_CHILI_LIST:
			return action.chilis;
		default: 
			// mandatory for sanity (Eg: initialisation)
			return state;
	}
};