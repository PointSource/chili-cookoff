import {Component, Inject, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {ChiliModuleComponent} from './chili/chili-module.component';

import {JudgeComponent} from './judges/judge.component'
import {JudgeService} from './judges/judge.service';
import {JudgeActions} from './judges/judge.actions'

import {ResultsComponent} from './results/results.component'

@Component({
	selector: 'my-app',
	templateUrl: 'app/app.component.html',
	styleUrls: ['app/app.component.css'],
  	directives: [
		ROUTER_DIRECTIVES
	],
	providers: [
		JudgeService,
		JudgeActions
	]
})
@RouteConfig([
	{ path: '/judges', name: 'Judges', component: JudgeComponent, useAsDefault: true },
	{ path: '/chilis/...', name: 'Chilis', component: ChiliModuleComponent },
	{ path: '/results', name: 'Results', component: ResultsComponent },
])

export class AppComponent implements OnInit {
	public title = 'Cookoff!!';

	constructor(
		@Inject('AppStore') private _appStore: AppStore,
		private _judgeActions: JudgeActions,
		private _judgeService: JudgeService
	) {}

	ngOnInit() {
		// If there are no judges yet, get them!
		if (this._appStore.getState().judges.judgeList.length === 0) {
			// Get all the judges, then update the list of judges and select the first one
			this._judgeService.getJudges().then(judges => {
				this._appStore.dispatch(this._judgeActions.setJudgeList(judges));
				this._appStore.dispatch(this._judgeActions.setCurrentJudge(judges[0].id))
			});
		}
	}
}