import {Component, OnInit} from 'angular2/core';
import {Judge} from './judge.ts';
import {JudgeService} from './judge.service'

@Component({
	selector: 'judge-selector',
	templateUrl: 'app/judges/judge-selector.component.html'
})

export class JudgeSelectorComponent implements OnInit {
	public judges: Judge[];
	public selectedJudgeId: number;

	constructor(private _judgeService: JudgeService) {}

	ngOnInit() {
		this._judgeService.getJudges().then(judges => this.judges = judges);
		this.selectedJudgeId = 1;
	}

	selectJudge(event:any) {
		this._judgeService.selectJudge(parseInt(event.target.value, 10));

		console.log(this._judgeService.getSelectedJudge());
	}

}