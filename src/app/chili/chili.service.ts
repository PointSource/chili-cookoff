import {Injectable} from 'angular2/core';
import {CHILIS} from '../data/mock-chilis';


@Injectable()
export class ChiliService {
	getChilis() {
		return Promise.resolve(CHILIS);
	}

	getChilisById() {
		var chilisById = {};

		CHILIS.forEach(chili => chilisById[chili.id] = chili);

		return Promise.resolve(chilisById);
	}

	getChili(id: number) {
    return Promise.resolve(CHILIS)
      .then(chilis => chilis.filter(h => h.id === id)[0]);
	}
}