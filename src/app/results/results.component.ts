import {Component, OnInit} from 'angular2/core';
import {VoteService} from '../voting/vote.service';
import {Vote} from '../voting/vote';
import {Category} from '../voting/category';
import {CategoryService} from '../voting/category.service';


@Component({
	selector: 'results',
	templateUrl: 'app/results/results.component.html'
})
export class ResultsComponent implements OnInit {
	public votes: Vote[];
	public categories: Category[];
	public ratingsByCategory = [];

	constructor(
		private _voteService: VoteService, 
		private _categoryService: CategoryService) {}

	ngOnInit() {
		this._voteService.getVotes().then(votes => {
			this.votes = votes
		});
		this._voteService.getVotesForAllCategories().then(ratingsByCategory => {
			this.ratingsByCategory = ratingsByCategory;
			console.log(this.ratingsByCategory);
		});


	}
}