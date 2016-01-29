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

	addRatingSet(ratings: Rating[]) {
		if (!this.hasRatingForChili(ratings[0].chili.id, ratings[0].judge)) {
			this.ratings = this.ratings.concat(ratings);
		}
	}

	hasRatingForChili(chiliId: number, judge: Judge) : boolean {
		var filteredRatings = this.ratings.filter(h =>
			h.chili.id === chiliId && h.judge.id === judge.id
		);
		return filteredRatings.length > 0;
	}

	createRatingSetForChili(chili: Chili, judge: Judge) {
		var ratings: Rating[] = [];

		return this._categoryService.getCategories().then(categories => {

			categories.forEach(category => {
				ratings.push({
					ratingValue: null,
					category: category,
					chili: chili,
					judge: judge
				});
			});

			return ratings;
		});
	}

	getRatingSetForChili(chili: Chili, judge: Judge) {
		var ratings:Rating[] = this.ratings.filter(h => 
			h.chili.id === chili.id && h.judge.id === judge.id
		);

		if (ratings.length === 0) {
			return this.createRatingSetForChili(chili, judge);
		}
		else return Promise.resolve(ratings);
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

		console.log(ratingsPerChili);
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