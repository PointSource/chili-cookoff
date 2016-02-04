import {Component, Inject, OnInit} from 'angular2/core';
import {JudgeSelectorComponent} from './judge-selector.component';

@Component({
	selector: 'judge',
	templateUrl: 'app/judges/judge.component.html',
  	directives: [
		JudgeSelectorComponent
	]
})
export class JudgeComponent implements OnInit {
	public currentJudge: number;
	private unsubscribe;

	constructor(
		@Inject('AppStore') private _appStore: AppStore
	) {
		this.unsubscribe = this._appStore.subscribe(() => this.updateJudge());
	}

	ngOnInit() {
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