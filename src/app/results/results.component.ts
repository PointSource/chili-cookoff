import {Component, OnInit, Inject} from 'angular2/core';
import {Rating} from '../rating/rating';

@Component({
	selector: 'results',
	templateUrl: 'app/results/results.component.html',
	styleUrls: ['app/results/results.component.css']
})
export class ResultsComponent implements OnInit {
	public ratingsByCategory = [];
	public topChiliByCategory: any[] = [];

	constructor(
        @Inject('AppStore') private _appStore: AppStore
		) {}

	ngOnInit() {
		this.ratingsByCategory = this._appStore.getState().rating.ratingsByCategory;

		// this._ratingService.getTopChiliForAllCategories().then(topChiliByCategory => {
		// 	this.topChiliByCategory = topChiliByCategory;
		// 	console.log(this.topChiliByCategory);
		// });

	}

}