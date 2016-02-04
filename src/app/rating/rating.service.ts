import {Injectable} from 'angular2/core';
import {Rating} from './rating';
import {Judge} from '../judges/judge';
import {Chili} from '../chili/chili';
import {Category} from './category';
import {CategoryService} from './category.service';
import {ChiliService} from '../chili/chili.service';

@Injectable()
export class RatingService {
	public ratings: Rating[] = [];

	constructor(
		private _categoryService: CategoryService,
		private _chiliService: ChiliService
	) { };

	getRatings() {
		return Promise.resolve(this.ratings);
	}

	createRatingSetForChili(chili: Chili, judge: Judge) {
		var rating: Rating = {
			chili: chili,
			judge: judge,
			ratingEntries: []
		}

		return this._categoryService.getCategories().then(categories => {

			categories.forEach(category => {
				rating.ratingEntries.push({
					ratingValue: null,
					category: category
				});
			});

			return rating;
		});
	}

	getRatingsForAllCategories() {
		var ratingsForCategories: any[] = [];
		return this._categoryService.getCategories().then(categories => {
			categories.forEach(category => {
				ratingsForCategories.push({
					ratings: this.getRatingsForCategory(category),
					categoryName: category.name
				});
			});
			return ratingsForCategories;
		});
	}

	getTopChiliForAllCategories() {
		var ratingsForCategories: any[] = [];

		var categoryPromise = this._categoryService.getCategories();
		var chiliPromise = this._chiliService.getChilis()
		return Promise.all([categoryPromise, chiliPromise]).then(categoriesAndChilis => {
			var categories = categoriesAndChilis[0];
			var chilis = categoriesAndChilis[1];
			categories.forEach(category => {
				ratingsForCategories.push({
					topChili: this.getTopChiliForCategory(category, chilis),
					categoryName: category.name
				});
			});
			return ratingsForCategories;
		});
	}

	getTopChiliForCategory(category: Category, chilis: Chili[]) {

		var ratingsPerChili: any = [];
		// return this._chiliService.getChilis().then(chilis => {
		chilis.forEach(chili => {
			var totalRating = this.getTotalRatingForChiliAndCategory(category, chili);
			if (totalRating != null) {
				ratingsPerChili.push(totalRating);
			}
		})

		ratingsPerChili.sort((a: any, b: any) => {
			if (a.average > b.average) {
				return -1;
			} else if (a.average < b.average) {
				return 1;
			} else {
				return 0;
			}
		});

		if (ratingsPerChili.length > 0) {
			console.log('number one chili for ' + category.name + ' is ' + ratingsPerChili[0].chili.name + ' with ' + ratingsPerChili[0].ratingTotal + ' (' + ratingsPerChili[0].average + ' average)');
		}

		return ratingsPerChili[0];
		// });

	}

	getTotalRatingForChiliAndCategory(category: Category, chili: Chili) {
		var ratingsInCategory: Rating[] = this.ratings.filter(h =>
			h.category.id === category.id &&
			h.chili.id === chili.id
		);

		if (ratingsInCategory.length === 0) {
			return null;
		} else {
			var ratingResults: any = {
				chili: chili,
				category: category,
				ratingTotal: 0,
				numRatings: 0,
				ratings: [],
				average: 0
			};
			ratingsInCategory.forEach(rating => {
				ratingResults.ratingTotal += rating.ratingValue;
				ratingResults.numRatings += 1;
				ratingResults.ratings.push(rating);
			});

			ratingResults.average = ratingResults.ratingTotal / ratingResults.numRatings;
			return ratingResults;
		}

	}

	getRatingsForCategory(category: Category) {
		var ratings: Rating[] = this.ratings.filter(h =>
			h.category.id === category.id
		);

		ratings.sort((a, b) => {
			if (a.ratingValue > b.ratingValue) {
				return -1;
			} else if (a.ratingValue < b.ratingValue) {
				return 1;
			}
			return 0;
		});

		return ratings;
	}

}