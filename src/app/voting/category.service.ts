import {Injectable} from 'angular2/core';
import {CATEGORIES} from '../data/mock-chili-categories';

@Injectable()
export class CategoryService {
	getCategories() {
		return Promise.resolve(CATEGORIES);
	}

	getCategory(id: number) {
    return Promise.resolve(CATEGORIES)
      .then(categories => categories.filter(h => h.id === id)[0]);
	}
}