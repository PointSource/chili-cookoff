import {Component} from 'angular2/core';
import {Rating} from './rating'

@Component({
  selector: 'rate-input',
  templateUrl: 'app/voting/rate-input.component.html',
  styleUrls: ['app/voting/rate-input.component.css'],
  inputs: ['rating']
})

export class RateInputComponent {
	public rating: Rating;
	public ratingValues: number[] = [1,2,3,4,5];

	updateRating(ratingValue) {
		this.rating.ratingValue = ratingValue;
	}

}