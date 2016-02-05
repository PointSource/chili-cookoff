import {ADD_RATING} from './rating.actions';
import {Rating} from './rating';

var initialRatingList: Rating[] = [];

const initialState = {
	ratingList: initialRatingList,
	chilisRatedByJudge: {},
	ratingsByCategory: [],
	totalRatingByChiliAndCategory: []
}



function totalRatingByChiliAndCategory(state = initialState.totalRatingByChiliAndCategory, action) {
	switch (action.type) {
		case ADD_RATING:
			var newTotalRating = state.slice(0, state.length);
			action.rating.ratingEntries.forEach(ratingValue => {
				var foundIndex = state.findIndex(x =>
					x.chiliId === action.rating.chili.id && x.categoryId === ratingValue.category.id);
				if (foundIndex !== -1) {
					newTotalRating[foundIndex] = {
						categoryId: ratingValue.category.id,
						chiliId: action.rating.chili.id,
						totalRating: state[foundIndex].totalRating + ratingValue.ratingValue
					};
				} else {
					newTotalRating.push({
						categoryId: ratingValue.category.id,
						chiliId: action.rating.chili.id,
						totalRating: ratingValue.ratingValue
					});
				}
			});

			return newTotalRating;
		default:
			return state;
	}
}


function ratingsByCategory(state = initialState.ratingsByCategory, action) {
	switch (action.type) {
		case ADD_RATING:

			var newRatingsByCategory = state.slice(0, state.length);

			action.rating.ratingEntries.forEach(ratingValue => {
				var ratingForCategory = []

				var foundRatingIndex = state.findIndex(ratingByCategory => ratingByCategory.categoryId === ratingValue.category.id);

				// If this category has not been rated yet, create a new entry
				if (foundRatingIndex === -1) {
					newRatingsByCategory.push({
						categoryName: ratingValue.category.name,
						categoryId: ratingValue.category.id,
						ratings: [
							Object.assign({}, action.rating)
						]
					});
				} else {
					newRatingsByCategory[foundRatingIndex].ratings = [
						...state[foundRatingIndex].ratings,
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
				ratingsByCategory: ratingsByCategory(state.ratingsByCategory, action),
				totalRatingByChiliAndCategory: totalRatingByChiliAndCategory(state.totalRatingByChiliAndCategory, action)
			});
		default: 
			// mandatory for sanity (Eg: initialisation)
			return state;
	}
};