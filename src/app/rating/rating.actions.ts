import {Rating} from './rating';

export const ADD_RATING = 'ADD_RATING';

export class RatingActions {
	constructor() {
	}

	addRating(rating: Rating) {
		return {
			type: ADD_RATING,
			rating: rating
		};
	};

}