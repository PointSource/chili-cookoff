import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Chili} from '../chili/chili';
import {Rating} from './rating';
import {ChiliService} from '../chili/chili.service';
import {RatingService} from './rating.service';
import {RateInputComponent} from './rate-input.component';

@Component({
  selector: 'vote',
  templateUrl: 'app/voting/vote.component.html',
  styleUrls: ['app/voting/vote.component.css'],
  directives: [RateInputComponent]
})
export class VoteComponent implements OnInit {
  public chili: Chili;
  public ratings: Rating[];

  constructor(
    private _chiliService: ChiliService,
    private _ratingService: RatingService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    if (!this.chili) {
      let id = +this._routeParams.get('id');
      this._chiliService.getChili(id).then(chili => {
        this.chili = chili
        this._ratingService.getRatingSetForChili(this.chili.id).then(ratings => {
          
          this.ratings = ratings
          console.log(this.ratings);
        }
        );
      });
    }

  }

  resetVote() {
    this.ratings.forEach(rating => rating.ratingValue = null);
  }

  submitRating() {
    this._ratingService.addRatingSet(this.ratings);
  }

  allRatingsFilled() {
    var ratingsFilled: number = 0;
    this.ratings.forEach(rating => {
      if (rating.ratingValue !== null) {
        ratingsFilled++;
      }
    });

    return ratingsFilled === this.ratings.length;
  }
}

