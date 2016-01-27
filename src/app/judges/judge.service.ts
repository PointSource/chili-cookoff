import {Injectable} from 'angular2/core';
import {JUDGES} from '../data/mock-judges';


@Injectable()
export class JudgeService {
	getJudges() {
		return Promise.resolve(JUDGES);
	}

	getJudge(id: number) {
		return Promise.resolve(JUDGES)
			.then(judges => judges.filter(h => h.id === id)[0]);
	}
}