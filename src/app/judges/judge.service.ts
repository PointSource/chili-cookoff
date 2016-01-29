import {Injectable} from 'angular2/core';
import {JUDGES} from '../data/mock-judges';
import {Judge} from './judge';


@Injectable()
export class JudgeService {
	public judges: Judge[] = [];
	public selectedJudge: Judge = JUDGES[0];
	public selectedJudgeObject: any = {
		judge: null
	};

	getJudges() {
		this.judges = JUDGES;
		return Promise.resolve(this.judges);
	}

	getJudge(id: number) {
		return Promise.resolve(this.judges)
			.then(judges => judges.filter(h => h.id === id)[0]);
	}

	selectJudge(id: number) {
		var filteredJudges = this.judges.filter(judge => judge.id === id);
		if (filteredJudges.length > 0) {
			this.selectedJudge = filteredJudges[0];
		}
		else {
			this.selectedJudge = null;
		}

		this.selectedJudgeObject.judge = this.selectedJudge;
	}

	getSelectedJudge(): Judge {
		return this.selectedJudge;
	}
}