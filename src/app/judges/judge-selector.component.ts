import {Component, OnInit, Inject} from 'angular2/core';
import {Judge} from './judge';
import {JudgeActions} from './judge.actions'

@Component({
	selector: 'judge-selector',
	templateUrl: 'app/judges/judge-selector.component.html'
})

export class JudgeSelectorComponent implements OnInit {
	public judges: Judge[];
	private unsubscribe;
	private currentJudgeId;

	constructor(
		@Inject('AppStore') private _appStore: AppStore,
		private _judgeActions: JudgeActions
	) {
		this.unsubscribe = this._appStore
			.subscribe(() => this.updateJudge());
	}

	ngOnInit() {
		this.judges = this._appStore.getState().judges;

		this.updateJudge();
	}

	private selectJudge(event:any) {
		this._appStore.dispatch(this._judgeActions.setCurrentJudge(parseInt(event.target.value, 10)));
	}

	private updateJudge() {
		this.currentJudgeId = this._appStore.getState().currentJudge.id;
	}
}