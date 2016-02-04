import {Component, OnInit, Inject} from 'angular2/core';
import {RouteParams, RouteData} from 'angular2/router';
import {Chili} from '../chili/chili';
import {Rating} from '../rating/rating';
import {Judge} from '../judges/judge';
import {ChiliService} from '../chili/chili.service';
import {RatingService} from '../rating/rating.service';
import {RateInputComponent} from '../rating/rate-input.component';
import {RatingActions} from '../rating/rating.actions';

@Component({
    selector: 'vote',
    templateUrl: 'app/chili/rate-chili.component.html',
    styleUrls: ['app/chili/rate-chili.component.css'],
    directives: [RateInputComponent],
    providers: [RatingActions]
})
export class RatingComponent implements OnInit {
    public chili: Chili;
    public rating: Rating;
    public currentJudge: Judge;
    public ratingEntriesCopy = [];

    constructor(
        @Inject('AppStore') private _appStore: AppStore,
        private _chiliService: ChiliService,
        private _ratingService: RatingService,
        private _ratingActions: RatingActions,
        private _routeParams: RouteParams, private _routeData: RouteData) {
    }

    ngOnInit() {
        this.currentJudge = this._appStore.getState().judges.currentJudge;

        let chiliId = +this._routeParams.get('id');
        this._chiliService.getChili(chiliId).then(chili => {
            this.chili = chili;
            var ratingList = this._appStore.getState().rating.ratingList;
            var foundRating = ratingList.find(rating =>
                rating.chili.id === this.chili.id && rating.judge.id === this.currentJudge.id
            );

            if (foundRating === undefined) {
                this._ratingService.createRatingSetForChili(this.chili, this.currentJudge).then(rating => {
                    this.rating = rating;

                    // TODO: Have to copy this so that we don't overwrite the state... may need a better approach?
                    this.ratingEntriesCopy = this.createRatingEntriesCopy(this.rating.ratingEntries);
                });
            } else {
                this.rating = foundRating;
                // TODO: Have to copy this so that we don't overwrite the state... may need a better approach?
                this.ratingEntriesCopy = this.createRatingEntriesCopy(this.rating.ratingEntries);
            }
        });
    }

    private createRatingEntriesCopy(ratingEntries) {
        var ratingEntriesCopy = []
        ratingEntries.forEach(ratingValue => {
            ratingEntriesCopy.push({
                ratingValue: ratingValue.ratingValue,
                category: ratingValue.category
            });
        });

        return ratingEntriesCopy;
    }

    private resetRating() {
        this.ratingEntriesCopy.forEach(ratingEntry => ratingEntry.ratingValue = null);
    }

    private submitRating() {
        this._appStore.dispatch(this._ratingActions.addRating(
            Object.assign({}, this.rating, {
                ratingEntries: this.ratingEntriesCopy
            })
            ));
        console.log(this._appStore.getState().rating);
    }

    private allRatingsFilled() {
        var ratingsFilled: number = 0;
        this.ratingEntriesCopy.forEach(ratingEntry => {
            if (ratingEntry.ratingValue !== null) {
                ratingsFilled++;
            }
        });

        return ratingsFilled === this.rating.ratingEntries.length;
    }
}

