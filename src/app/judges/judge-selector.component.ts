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
	public selectedJudgeId: number;

	constructor(
		private _judgeService: JudgeService,
		@Inject('AppStore') private appStore: AppStore,
		private _chiliActions: ChiliActions) { }

	ngOnInit() {
		this._judgeService.getJudges().then(judges => this.judges = judges);
		this.selectedJudgeId = 1;
	}

	private selectJudge(event:any) {
		this.appStore.dispatch(this._chiliActions.setCurrentJudge(event.target.value))
	}

}