import {Component, Inject, OnInit} from 'angular2/core';
import {JudgeSelectorComponent} from './judge-selector.component';
import {JudgeService} from './judge.service';
import {JudgeActions} from './judge.actions'

@Component({
	selector: 'judge',
	templateUrl: 'app/judges/judge.component.html',
  	directives: [
		JudgeSelectorComponent
	],
	providers: [
		JudgeService,
		JudgeActions
	]
})
export class JudgeComponent implements OnInit {
	public currentJudge: number;
	private unsubscribe;

	constructor(
		@Inject('AppStore') private _appStore: AppStore,
		private _judgeActions: JudgeActions,
		private _judgeService: JudgeService
	) {
		this.unsubscribe = this._appStore.subscribe(() => this.updateJudge());
	}

	ngOnInit() {

		// If there are no judges yet, get them!
		if (this._appStore.getState().judges.length === 0)
		// Get all the judges, then update the list of judges and select the first one
		this._judgeService.getJudges().then(judges => {
			this._appStore.dispatch(this._judgeActions.setJudgeList(judges));
			this._appStore.dispatch(this._judgeActions.setCurrentJudge(judges[0].id))
		});

		this.updateJudge();
	}

	private ngOnDestroy() {
		//remove listener
		this.unsubscribe();
	}

	private updateJudge() {
		let state = this._appStore.getState();
		this.currentJudge = state.judges.find(judge => judge.isSelected === true);
	}
}