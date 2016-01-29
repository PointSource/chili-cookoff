import {Component, OnInit} from 'angular2/core';
import {RatingService} from '../rating/rating.service';
import {Rating} from '../rating/rating';

@Component({
	selector: 'results',
	templateUrl: 'app/results/results.component.html'
})
export class ResultsComponent implements OnInit {
	public ratingsByCategory:Rating[] = [];

	constructor(
		private _ratingService: RatingService) {}

	ngOnInit() {
		this._ratingService.getRatingsForAllCategories().then(ratingsByCategory => {
			this.ratingsByCategory = ratingsByCategory;
		});

	}

}