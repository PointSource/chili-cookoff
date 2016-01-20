import {Injectable} from 'angular2/core';
import {CHILIS} from '../data/mock-chilis';

@Injectable()
export class HeroService {
	getHeroes() {
		return Promise.resolve(CHILIS);
	}

	getHero(id: number) {
    return Promise.resolve(CHILIS)
      .then(heroes => heroes.filter(h => h.id === id)[0]);
	}
}