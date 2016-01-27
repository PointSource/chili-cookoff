import {Component, OnInit} from 'angular2/core';
import {Judge} from './judge.ts';
import {JudgeService} from './judge.service'

@Component({
	selector: 'judge-selector',
	templateUrl: 'app/judges/judge-selector.component.html',
	providers: [JudgeService]
})

export class JudgeSelectorComponent implements OnInit {
	public judges: Judge[];
	public selectedJudgeIndex: number;

	constructor(private _judgeService: JudgeService) {}

	ngOnInit() {
		this._judgeService.getJudges().then(judges => this.judges = judges);
		this.selectedJudgeIndex = 0;
	}

}