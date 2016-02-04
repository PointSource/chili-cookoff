import {Judge} from '../judges/judge'
import {RatingValue} from './rating-value'
import {Chili} from '../chili/chili'

export interface Rating {
	chili: Chili;
	judge: Judge;
	ratingEntries: RatingValue[],
}