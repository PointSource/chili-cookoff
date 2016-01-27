import {Component, OnInit} from 'angular2/core';
import {Judge} from './judge.ts';

@Component({
	selector: 'judge-selector'
})

export class JudgeSelectorComponent implements OnInit {
	public judges: Judge[];

	ngOnInit() {
		this.judges = [{
			name:'Mandy',
			id:1
		}, {
			name: 'JM',
			id: 2
		}, {
			name: 'Patrick',
			id: 3
		}]
	}
}