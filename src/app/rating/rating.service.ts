import {Injectable} from 'angular2/core';
import {Rating} from './rating';
import {Judge} from '../judges/judge';
import {Chili} from '../chili/chili';
import {Category} from './category';
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

	getRatingForChili(chili: Chili, judge: Judge) {
		var rating = this.ratings.find(h => 
			h.chili.id === chili.id && h.judge.id === judge.id
		);

		if (rating === undefined) {
			return this.createRatingSetForChili(chili, judge);
		}
		else return Promise.resolve(rating);
	}

	getRatingsForAllCategories() {
		var ratingsForCategories:any[] = [];
		return this._categoryService.getCategories().then(categories => {
			categories.forEach(category => {
				ratingsForCategories.push({
					ratings: this.getRatingsForCategory(category),
					categoryName: category.name
				});
				this.getTopChiliForCategory(category);
			});
			return ratingsForCategories;
		});
	}

	getTopChiliForCategory(category: Category) {
		var ratings: Rating[] = this.ratings.filter(h =>
			h.category.id === category.id
		);

		var ratingsPerChili:any = {};
		ratings.forEach(rating => {
			if (ratingsPerChili[rating.chili.id] === undefined) {
				ratingsPerChili[rating.chili.id] = 0;
			}
			ratingsPerChili[rating.chili.id] += rating.ratingValue;
		});
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