import {Judge} from '../judges/judge'

export interface Rating {
	ratingValue: number;
	categoryId: number;
	chiliId: number;
	judge: Judge;
}