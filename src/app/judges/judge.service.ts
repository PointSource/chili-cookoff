import {Injectable} from 'angular2/core';
import {JUDGES} from '../data/mock-judges';
import {Judge} from './judge';


@Injectable()
export class JudgeService {
	public judges: Judge[] = [];

	getJudges() {
		this.judges = JUDGES;
		return Promise.resolve(this.judges);
	}

	getJudge(id: number) {
		return Promise.resolve(this.judges)
			.then(judges => judges.filter(h => h.id === id)[0]);
	}

}