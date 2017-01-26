import {Injectable} from 'angular2/core';
import {JUDGES} from '../data/mock-judges';
import {Judge} from './judge';


@Injectable()
export class JudgeService {
	private judges: Judge[] = [];

	getJudges(): Promise<Judge[]> {
		this.judges = JUDGES;
		return Promise.resolve(this.judges);
	}

	getJudge(id: number): Promise<Judge> {
		return Promise.resolve(this.judges)
			.then(judges => judges.filter(h => h.id === id)[0]);
	}

}