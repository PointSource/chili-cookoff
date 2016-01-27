import {Injectable} from 'angular2/core';
import {Rating} from './rating';
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
		if (!this.hasRatingForChili(ratings[0].chiliId)) {
			this.ratings = this.ratings.concat(ratings);
		}
	}

	hasRatingForChili(chiliId: number) : boolean {
		var hasRating:boolean = false;
		this.ratings.forEach(rating =>
		{
			if (rating.chiliId === chiliId) {
				hasRating = true;
			}
		});
		return hasRating;
	}

	createRatingSetForChili(chiliId: number) {
		var ratings: Rating[] = [];

		return this._categoryService.getCategories().then(categories => {

			categories.forEach(category => {
				ratings.push({
					ratingValue: null,
					categoryId: category.id,
					chiliId: chiliId
				});
			});

			return ratings;
		});
	}

	getRatingSetForChili(chiliId: number) {
		var ratings:Rating[] = this.ratings.filter(h => 
			h.chiliId === chiliId
		);

		if (ratings.length === 0) {
			return this.createRatingSetForChili(chiliId);
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