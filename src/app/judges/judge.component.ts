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
		@Inject('AppStore') private appStore: AppStore
	) {
		this.unsubscribe = this.appStore.subscribe(() => this.updateJudge());
	}

	ngOnInit() {
		this.updateJudge();
	}

	private ngOnDestroy() {
		//remove listener
		this.unsubscribe();
	}

	private updateJudge() {

		let state = this.appStore.getState();
		this.currentJudge = state.currentJudge;
	}
}