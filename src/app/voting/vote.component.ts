import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Chili} from '../chili/chili';
import {Category} from './category';
import {Rating} from './rating';
import {Vote} from './vote';
import {ChiliService} from '../chili/chili.service';
import {CategoryService} from './category.service';
import {VoteService} from './vote.service';
import {RateInputComponent} from './rate-input.component';

@Component({
  selector: 'vote',
  templateUrl: 'app/voting/vote.component.html',
  styleUrls: ['app/voting/vote.component.css'],
  directives: [RateInputComponent]
})
export class VoteComponent implements OnInit {
  public chili: Chili;
  public categories: Category[] = [];
  public vote: Vote;

  constructor(
    private _chiliService: ChiliService,
    private _voteService: VoteService,
    private _routeParams: RouteParams,
    private _categoryService: CategoryService) {
  }

  ngOnInit() {
    if (!this.chili) {
      let id = +this._routeParams.get('id');
      this._chiliService.getChili(id).then(chili => {
        this.chili = chili
        this.vote = this._voteService.getVoteForChili(this.chili.id);
        console.log(this.vote);
      });
    }

    this._categoryService.getCategories().then(categories => {
      this.categories = categories;
    });


  }

  resetVote() {
    this.vote.ratings.forEach(rating => rating.ratingValue = null);
  }

  submitRating() {
    this._voteService.addVote(this.vote);

    this._voteService.getVotes().then(votes => console.log(votes));
  }

  allRatingsFilled() {
    var ratingsFilled: number = 0;
    this.vote.ratings.forEach(rating => {
      if (rating.ratingValue !== null) {
        ratingsFilled++;
      }
    });

    return ratingsFilled === this.vote.ratings.length;
  }
}

