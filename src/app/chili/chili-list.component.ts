import {Component, OnInit, Inject} from 'angular2/core';
import {Router} from 'angular2/router';
import {Chili} from './chili';
import {ChiliService} from './chili.service';
import {ChiliActions} from './chili.actions';
import {RatingService} from '../rating/rating.service';
import {CategoryService} from '../rating/category.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/chili/chili-list.component.html',
    styleUrls: ['app/chili/chili-list.component.css'],
    providers: [
        ChiliService,
        ChiliActions, 
        RatingService,
        CategoryService
    ]
})
export class ChiliListComponent implements OnInit {
    public chilis: Chili[] = [];

    constructor(
        @Inject('AppStore') private _appStore: AppStore,
        private _chiliActions: ChiliActions,
        private _chiliService: ChiliService, 
        private _router: Router,
        private _ratingService: RatingService
        ) { }

    ngOnInit() {
        if (this._appStore.getState().chilis.length === 0) {
            this._chiliService.getChilis().then(chilis => {
                this._appStore.dispatch(this._chiliActions.setChiliList(chilis));
                this.chilis = this._appStore.getState().chilis;

            });
        }
        else {
            this.chilis = this._appStore.getState().chilis;
        }
    }

    gotoVote(chili: Chili) {
        this._router.navigate(['ChiliVote', { id: chili.id }]);
    }

    hasVotedOn(chili: Chili) {
        var judge = this._appStore.getState().currentJudge;
        return this._ratingService.hasRatingForChili(chili.id, judge);
    }
}