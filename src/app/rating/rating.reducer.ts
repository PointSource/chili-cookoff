import {ADD_RATING} from './rating.actions';
import {Rating} from './rating';

var initialRatingList: Rating[] = [];

const initialState = {
	ratingList: initialRatingList,
	chilisRatedByJudge: {},
	ratingsByCategory: {},
	chiliCategoryTotals: []
}

function chiliCategoryTotals(state = initialState.chiliCategoryTotals, action) {
	switch (action.type) {
		case ADD_RATING:


		default:
			return state;
	}
}

function ratingsByCategory(state = initialState.ratingsByCategory, action) {
	switch (action.type) {
		case ADD_RATING:

			var newRatingsByCategory = Object.assign({}, state);

			action.rating.ratingEntries.forEach(ratingValue => {
				var ratingForCategory = []
				// If this category has not been rated yet, create a new entry
				if (!state[ratingValue.category.id]) {
					newRatingsByCategory[ratingValue.category.id] = [Object.assign({}, action.rating)];
				} else {
					newRatingsByCategory[ratingValue.category.id] = [
						...state[ratingValue.category.id],
						Object.assign({}, action.rating)
					];
				}
			});

			return newRatingsByCategory;
		default:
			return state;
	}
}

function chilisRatedByJudge(state = initialState.chilisRatedByJudge, action) {
	switch (action.type) {
		case ADD_RATING:
			var judgeId = action.rating.judge.id;
			var chiliId = action.rating.chili.id;
			var chiliList = [];

			// If judge has not rated anything yet, add an entry
			if (!state[judgeId]) {
				return Object.assign({}, state, {
					[judgeId]: [chiliId]
				})
			}
			// If judge has rated, don't add anything if they have rated this chili already
			else if (state[judgeId].indexOf(chiliId) !== -1) {
				return state;
			} 
			// If judge has not rated this chili, add it
			else {
				return Object.assign({}, state, {
					[judgeId]: [...state[judgeId], chiliId]
				})
			}
		default:
			return state
	}
}

export function rating(state = initialState, action) {
	switch (action.type) {
		case ADD_RATING:
			return Object.assign({}, state, {
				ratingList: [
					...state.ratingList,
					action.rating
				],
				chilisRatedByJudge: chilisRatedByJudge(state.chilisRatedByJudge, action),
				ratingsByCategory: ratingsByCategory(state.ratingsByCategory, action)
				chiliCategoryTotals: chiliCategoryTotals(state.chiliCategoryTotals, action)
			});
		default: 
			// mandatory for sanity (Eg: initialisation)
			return state;
	}
};