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
		var hasVote:boolean = false;
		this.ratings.forEach(rating =>
		{
			if (rating.chiliId === chiliId) {
				hasVote = true;
			}
		});
		return hasVote;
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
		var votesForCategories = [];
		return this._categoryService.getCategories().then(categories => {
			categories.forEach(category => {
				votesForCategories.push({
					ratings: this.getRatingsForCategory(category.id),
					category: category
				});
			});
			return votesForCategories;
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