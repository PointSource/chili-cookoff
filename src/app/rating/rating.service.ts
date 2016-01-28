import {Injectable} from 'angular2/core';
import {Rating} from './rating';
import {Judge} from '../judges/judge';
import {CategoryService} from './category.service';

@Injectable()
export class RatingService {
	public ratings: Rating[] = [];

	constructor(
		private _categoryService: CategoryService
	) {};

	getRatings() {
		return Promise.resolve(this.ratings);
	}

	addRatingSet(ratings: Rating[]) {
		if (!this.hasRatingForChili(ratings[0].chiliId, ratings[0].judge)) {
			this.ratings = this.ratings.concat(ratings);
		}
	}

	hasRatingForChili(chiliId: number, judge: Judge) : boolean {
		var filteredRatings = this.ratings.filter(h =>
			h.chiliId === chiliId && h.judge.id === judge.id
		);
		return filteredRatings.length > 0;
	}

	createRatingSetForChili(chiliId: number, judge: Judge) {
		var ratings: Rating[] = [];

		return this._categoryService.getCategories().then(categories => {

			categories.forEach(category => {
				ratings.push({
					ratingValue: null,
					categoryId: category.id,
					chiliId: chiliId,
					judge: judge
				});
			});

			return ratings;
		});
	}

	getRatingSetForChili(chiliId: number, judge: Judge) {
		var ratings:Rating[] = this.ratings.filter(h => 
			h.chiliId === chiliId && h.judge.id === judge.id
		);

		if (ratings.length === 0) {
			return this.createRatingSetForChili(chiliId, judge);
		}
		else return Promise.resolve(ratings);
	}

	getRatingsForAllCategories() {
		var ratingsForCategories:any[] = [];
		return this._categoryService.getCategories().then(categories => {
			categories.forEach(category => {
				ratingsForCategories.push({
					ratings: this.getRatingsForCategory(category.id),
					category: category
				});
			});
			return ratingsForCategories;
		});
	}

	getRatingsForCategory(categoryId: number) {
		var ratings: Rating[] = this.ratings.filter(h =>
			h.categoryId === categoryId
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