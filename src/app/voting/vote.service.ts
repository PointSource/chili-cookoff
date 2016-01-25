import {Injectable} from 'angular2/core';
import {Vote} from './vote';
import {CategoryService} from './category.service';

@Injectable()
export class VoteService {
	public votes: Vote[] = [];

	constructor(
		private _categoryService: CategoryService
	) {};

	getVotes() {
		return Promise.resolve(this.votes);
	}

	addVote(vote: Vote) {
		if (!this.hasVote(vote.chiliId)) {
			this.votes.push(vote);
		}
	}

	hasVote(chiliId: number) : boolean {
		var hasVote:boolean = false;
		this.votes.forEach(vote =>
		{
			if (vote.chiliId === chiliId) {
				hasVote = true;
			}
		});
		return hasVote;
	}

	createVoteForChili(chiliId: number) : Vote {
		var vote: Vote;

		vote = {
			chiliId: chiliId,
			ratings: []
		}
		this._categoryService.getCategories().then(categories => {

			categories.forEach(category => {
				vote.ratings.push({
					'ratingValue': null,
					'categoryId': category.id
				});
			});
		});

		return vote;
	}

	// Creates a new vote if the vote does not exist
	getVoteForChili(chiliId: number) : Vote {
		var vote:Vote = this.votes.filter(h => 
			h.chiliId === chiliId
		)[0];

		if (!vote) {
			vote = this.createVoteForChili(chiliId);
		}

		return vote;
	}

	getVotesForAllCategories() {
		var votesForCategories = [];
		return this._categoryService.getCategories().then(categories => {
			categories.forEach(category => {
				votesForCategories.push({
					ratings: this.getVotesForCategory(category.id),
					category: category
				});
			});
			return votesForCategories;
		});
	}

	getVotesForCategory(categoryId: number) {
		var categoryRatings = [];

		this.votes.forEach(vote => {
			var categoryRating = vote.ratings.filter(rating =>
				rating.categoryId === categoryId
			)[0];

			categoryRatings.push({
				rating: categoryRating,
				chiliId: vote.chiliId
			});
		});
		return categoryRatings;
	}

}