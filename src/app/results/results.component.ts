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
	public ratingsByCategory = {};

	constructor(
		private _voteService: VoteService, 
		private _categoryService: CategoryService) {}

	ngOnInit() {
		this._voteService.getVotes().then(votes => {
			this.votes = votes
			this._categoryService.getCategories().then(categories => {
				this.categories = categories
				this.categories.forEach(category => {
					this.ratingsByCategory[category.id] = 
						this._voteService.getVotesForCategory(category.id);
				});
				console.log(this.ratingsByCategory);
				this.categories.forEach(category => {
					var categoryRatingList = this.ratingsByCategory[category.id];
					console.log(categoryRatingList);
					categoryRatingList.forEach(categoryRating => {
						console.log(categoryRating.chiliId);
						console.log(categoryRating.rating);
					});
				});
			});
		});


	}
}