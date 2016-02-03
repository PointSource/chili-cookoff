import {Component, Inject, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {JudgeComponent} from './judges/judge.component'
import {ChiliListComponent} from './chili/chili-list.component';
// import {RatingComponent} from './rating/rating.component'
import {CategoryService} from './rating/category.service';
import {JudgeService} from './judges/judge.service';
import {ChiliService} from './chili/chili.service';
import {RatingService} from './rating/rating.service';
import {JudgeActions} from './judges/judge.actions'

@Component({
	selector: 'my-app',
	templateUrl: 'app/app.component.html',
	styleUrls: ['app/app.component.css'],
  	directives: [
		ROUTER_DIRECTIVES
	],
	providers: [
		CategoryService, 
		ChiliService, 
		RatingService, 
		JudgeService
	]
})
@RouteConfig([
	{ path: '/judges', name: 'Judges', component: JudgeComponent, useAsDefault: true },
	{ path: '/chilis', name: 'Chilis', component: ChiliListComponent },
	
	// { path: '/chili/:id', name: 'ChiliVote', component: RatingComponent }
	// { path: '/results', name: 'Results', component: ResultsComponent },
	// { path: '/chili/:id', name: 'ChiliDetail', component: ChiliDetailComponent },
])

export class AppComponent implements OnInit {
	public title = 'Cookoff!!';

	constructor(
		@Inject('AppStore') private _appStore: AppStore,
		private _judgeActions: JudgeActions,
		private _judgeService: JudgeService
	) {}

	ngOnInit() {
		this._judgeService.getJudges().then(judges => {
			this._appStore.dispatch(this._judgeActions.setJudgeList(judges));
		});


	}

}