import {Component, OnInit, Inject} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ChiliListComponent} from './chili-list.component';
import {RatingComponent} from './rate-chili.component';

import {ChiliActions} from './chili.actions';

import {ChiliService} from './chili.service';
import {CategoryService} from '../rating/category.service';
import {RatingService} from '../rating/rating.service';

@Component({
    selector: 'chili-wrapper',
    template: '<router-outlet></router-outlet>',
    directives: [
        ROUTER_DIRECTIVES
    ],
    providers: [
        RatingService,
        ChiliService,
        CategoryService,
        ChiliActions 
    ]
})
@RouteConfig([
    { path: '/', name: 'ChiliList', component: ChiliListComponent, useAsDefault: true },
    { path: '/:id', name: 'ChiliVote', component: RatingComponent }
])

export class ChiliModuleComponent implements OnInit{

    constructor(
        @Inject('AppStore') private _appStore: AppStore,
        private _chiliActions: ChiliActions,
        private _chiliService: ChiliService
    ) { }


    ngOnInit() {
        if (this._appStore.getState().chilis.length === 0) {
            this._chiliService.getChilis().then(chilis => {
                this._appStore.dispatch(this._chiliActions.setChiliList(chilis));
            });
        }
    }
}