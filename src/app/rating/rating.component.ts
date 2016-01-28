import {Component, OnInit, Input} from 'angular2/core';
import {RouteParams, RouteData} from 'angular2/router';
import {Chili} from '../chili/chili';
import {Rating} from './rating';
import {ChiliService} from '../chili/chili.service';
import {JudgeService} from '../judges/judge.service';
import {RatingService} from './rating.service';
import {RateInputComponent} from './rate-input.component';

@Component({
  selector: 'vote',
  templateUrl: 'app/rating/rating.component.html',
  styleUrls: ['app/rating/rating.component.css'],
  directives: [RateInputComponent],
})
export class RatingComponent implements OnInit {
  public chili: Chili;
  public ratings: Rating[];

  constructor(
    private _chiliService: ChiliService,
    private _ratingService: RatingService,
    private _judgeService: JudgeService,
    private _routeParams: RouteParams, private _routeData: RouteData) {
  }

  ngOnInit() {
    if (!this.chili) {
      let id = +this._routeParams.get('id');
      this._chiliService.getChili(id).then(chili => {
        this.chili = chili
        var selectedJudge = this._judgeService.getSelectedJudge();
        this._ratingService.getRatingSetForChili(this.chili.id, selectedJudge).then(ratings => {
          this.ratings = ratings
        });
      });
    }
  }

  resetRating() {
    console.log(this._judgeService.getSelectedJudge());
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

