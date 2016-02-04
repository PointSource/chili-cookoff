import {Component, OnInit} from 'angular2/core';
import {RatingService} from '../rating/rating.service';
import {Rating} from '../rating/rating';

@Component({
	selector: 'results',
	templateUrl: 'app/results/results.component.html',
	styleUrls: ['app/results/results.component.css']
})
export class ResultsComponent implements OnInit {
	public ratingsByCategory: Rating[] = [];
	public topChiliByCategory: any[] = [];

	constructor(
		private _ratingService: RatingService) {}

	ngOnInit() {
		this._ratingService.getRatingsForAllCategories().then(ratingsByCategory => {
			this.ratingsByCategory = ratingsByCategory;
		});


		this._ratingService.getTopChiliForAllCategories().then(topChiliByCategory => {
			this.topChiliByCategory = topChiliByCategory;
			console.log(this.topChiliByCategory);
		});

	}

}