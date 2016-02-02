import {Component, Inject} from 'angular2/core';
import {JudgeSelectorComponent} from './judges/judge-selector.component'

@Component({
	selector: 'my-app',
	templateUrl: 'app/app.component.html',
	styleUrls: ['app/app.component.css'],
  	directives: [
  		JudgeSelectorComponent
	]
})

export class AppComponent {
	public title = 'Cookoff!!';
	public currentJudge: number;

	constructor(
		@Inject('AppStore') private appStore: AppStore) {

		this.unsubscribe = this.appStore.subscribe(() => {
			let state = this.appStore.getState();
			this.currentJudge = state.currentJudge;
		});
	}


}