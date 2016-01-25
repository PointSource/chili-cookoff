import {Component, OnInit} from 'angular2/core';
import {VoteService} from '../voting/vote.service';
import {Vote} from '../voting/vote';
import {Category} from '../voting/category';
import {CategoryService} from '../voting/category.service';
import {ChiliService} from '../chili/chili.service';


@Component({
	selector: 'results',
	templateUrl: 'app/results/results.component.html'
})
export class ResultsComponent implements OnInit {
	public votes: Vote[];
	public categories: Category[];
	public ratingsByCategory = [];
	public chilisById = {};

	constructor(
		private _voteService: VoteService, 
		private _categoryService: CategoryService,
		private _chiliService: ChiliService) {}

	ngOnInit() {
		this._voteService.getVotes().then(votes => {
			this.votes = votes
		});
		this._voteService.getVotesForAllCategories().then(ratingsByCategory => {
			this.ratingsByCategory = ratingsByCategory;
		});
		this._chiliService.getChilisById().then(chilisById => {
			this.chilisById = chilisById
		});

	}
}