import {Injectable} from 'angular2/core';
import {JUDGES} from '../data/mock-judges';
import {Judge} from './judge';


@Injectable()
export class JudgeService {
	public judges: Judge[] = [];
	public selectedJudge: Judge = JUDGES[0];

	getJudges(): Promise<Judge[]> {
		this.judges = JUDGES;
		return Promise.resolve(this.judges);
	}

	getJudge(id: number): Promise<Judge> {
		return Promise.resolve(this.judges)
			.then(judges => judges.filter(h => h.id === id)[0]);
	}

	selectJudge(id: number): void {
		var filteredJudges = this.judges.filter(judge => judge.id === id);
		if (filteredJudges.length > 0) {
			this.selectedJudge = filteredJudges[0];
		}
		else {
			this.selectedJudge = null;
		}
	}

	getSelectedJudge(): Judge {
		return this.selectedJudge;
	}
}