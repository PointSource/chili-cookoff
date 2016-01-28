import {Judge} from '../judges/judge'
import {Category} from './category'
import {Chili} from '../chili/chili'

export interface Rating {
	ratingValue: number;
	category: Category;
	chili: Chili;
	judge: Judge;
}