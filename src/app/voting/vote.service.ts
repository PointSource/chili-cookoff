import {Injectable} from 'angular2/core';
import {Vote} from './vote';
import {CategoryService} from './category.service';

@Injectable()
export class VoteService {
	public votes: Vote[] = [];

	constructor(
		private _categoryService: CategoryService,
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


	getVoteForChili(chiliId: number) : Vote {
		var vote:Vote = this.votes.filter(h => 
			h.chiliId === chiliId
		)[0];

		console.log('getVoteForChili', vote);
		if (!vote) {
			vote = {
				chiliId: chiliId,
				ratings: []
			}
		    this._categoryService.getCategories().then(categories => {

		      	categories.forEach(category => {
		        	vote.ratings.push({
		         		'ratingValue': null,
						'category': category
			        });
		      	});
			});
		}

		return vote;
	}

}