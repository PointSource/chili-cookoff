import {Component} from 'angular2/core';

@Component({
  selector: 'rate-input',
  templateUrl: 'app/voting/rate-input.component.html',
  styleUrls: ['app/voting/rate-input.component.css'],
  inputs: ['rating']
})

export class RateInputComponent {
	public rating;

	updateRating(e) {
		this.rating.ratingValue = e.target.value;
	}
}