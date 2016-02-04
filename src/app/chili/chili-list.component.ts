import {Component, OnInit, Inject} from 'angular2/core';
import {Router} from 'angular2/router';
import {Chili} from './chili';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/chili/chili-list.component.html',
    styleUrls: ['app/chili/chili-list.component.css'],
})
export class ChiliListComponent implements OnInit {
    public chilis: Chili[] = [];

    constructor(
        @Inject('AppStore') private _appStore: AppStore,
        private _router: Router,
        ) { }

    ngOnInit() {
        this.chilis = this._appStore.getState().chilis;
    }

    gotoVote(chili: Chili) {
        this._router.navigate(['ChiliVote', { id: chili.id }]);
    }

    hasVotedOn(chili: Chili) {

        var judge = this._appStore.getState().judges.currentJudge;
        var chilisRatedByJudge = this._appStore.getState().rating.chilisRatedByJudge;
        if (!chilisRatedByJudge[judge.id]) {
            return false;
        }
        else {
            return chilisRatedByJudge[judge.id].indexOf(chili.id) !== -1;
        }
    }
}