import {Component, OnInit, Inject} from 'angular2/core';
import {RouteParams, RouteData} from 'angular2/router';
import {Chili} from '../chili/chili';
import {Rating} from '../rating/rating';
import {ChiliService} from '../chili/chili.service';
import {RatingService} from '../rating/rating.service';
import {RateInputComponent} from '../rating/rate-input.component';

@Component({
  selector: 'vote',
  templateUrl: 'app/chili/rate-chili.component.html',
  styleUrls: ['app/chili/rate-chili.component.css'],
  directives: [RateInputComponent],
})
export class RatingComponent implements OnInit {
  public chili: Chili;
  public ratings: Rating[];

  constructor(
    @Inject('AppStore') private _appStore: AppStore,
    private _chiliService: ChiliService,
    private _ratingService: RatingService,
    private _routeParams: RouteParams, private _routeData: RouteData) {
  }

  ngOnInit() {
    if (!this.chili) {
      let id = +this._routeParams.get('id');
      this._chiliService.getChili(id).then(chili => {
        this.chili = chili
        var currentJudge = this._appStore.getState().currentJudge;
        this._ratingService.getRatingSetForChili(this.chili, currentJudge).then(ratings => {
          this.ratings = ratings
        });
      });
    }
  }

  resetRating() {
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

