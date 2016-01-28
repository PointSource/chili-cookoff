import {Component, OnInit} from 'angular2/core';
import {Rating} from './rating';
import {Category} from './category';
import {CategoryService} from './category.service';

@Component({
  selector: 'rate-input',
  templateUrl: 'app/rating/rate-input.component.html',
  styleUrls: ['app/rating/rate-input.component.css'],
  inputs: ['rating']
})

export class RateInputComponent implements OnInit {
	public rating: Rating;
	public ratingValues: number[] = [1,2,3,4,5];
	public category: Category;

	constructor(private _categoryService: CategoryService) {}

	ngOnInit() {
		this._categoryService.getCategory(this.rating.category.id).then(category => {
			this.category = category
		});
	}

	updateRating(ratingValue:number) : void {
		this.rating.ratingValue = ratingValue;
	}

}