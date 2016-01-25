import {Component, OnInit} from 'angular2/core';
import {RatingService} from '../voting/rating.service';
import {Rating} from '../voting/rating';
import {Category} from '../voting/category';
import {CategoryService} from '../voting/category.service';
import {ChiliService} from '../chili/chili.service';


@Component({
	selector: 'results',
	templateUrl: 'app/results/results.component.html'
})
export class ResultsComponent implements OnInit {
	public categories: Category[];
	public ratingsByCategory = [];
	public chilisById = {};

	constructor(
		private _ratingService: RatingService, 
		private _categoryService: CategoryService,
		private _chiliService: ChiliService) {}

	ngOnInit() {
		this._ratingService.getRatingsForAllCategories().then(ratingsByCategory => {
			this.ratingsByCategory = ratingsByCategory;
		});
		this._chiliService.getChilisById().then(chilisById => {
			this.chilisById = chilisById;
		});

	}
}