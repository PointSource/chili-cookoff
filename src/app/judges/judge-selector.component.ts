import {Component, OnInit, Inject} from 'angular2/core';
import {Judge} from './judge';
import {JudgeService} from './judge.service';
import {ChiliActions} from '../redux/chili.actions'

@Component({
	selector: 'judge-selector',
	templateUrl: 'app/judges/judge-selector.component.html',
	providers: [JudgeService]
})

export class JudgeSelectorComponent implements OnInit {
	public judges: Judge[];
	private unsubscribe;
	private currentJudge;

	constructor(
		private _judgeService: JudgeService,
		@Inject('AppStore') private appStore: AppStore,
		private _chiliActions: ChiliActions) {


		this.unsubscribe = this.appStore
			.subscribe(() => this.updateActive());
	}

	ngOnInit() {
		this._judgeService.getJudges().then(judges => this.judges = judges);
		this.updateActive();
	}

	private selectJudge(event:any) {
		this.appStore.dispatch(this._chiliActions.setCurrentJudge(event.target.value))
	}

	private updateActive() {
		this.currentJudge = this.appStore.getState().currentJudge;
	}
}