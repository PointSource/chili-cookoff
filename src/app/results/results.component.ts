import {Component, OnInit} from 'angular2/core';
import {RatingService} from '../rating/rating.service';
import {Rating} from '../rating/rating';
import {Chili} from '../chili/chili';
import {Category} from '../rating/category';
import {CategoryService} from '../rating/category.service';
import {ChiliService} from '../chili/chili.service';


@Component({
	selector: 'results',
	templateUrl: 'app/results/results.component.html'
})
export class ResultsComponent implements OnInit {
	public categories: Category[];
	public ratingsByCategory:Rating[] = [];
	public chiliList: Chili[];

	constructor(
		private _ratingService: RatingService, 
		private _categoryService: CategoryService,
		private _chiliService: ChiliService) {}

	ngOnInit() {
		this._ratingService.getRatingsForAllCategories().then(ratingsByCategory => {
			this.ratingsByCategory = ratingsByCategory;
		});
		this._chiliService.getChilis().then(chilis => this.chiliList = chilis);
	}

	getChiliNameById(chiliId:number):string {
		var chiliName:string;
		var filteredChiliList: Chili[] = this.chiliList.filter(chili => chili.id === chiliId);
		if (filteredChiliList.length > 0) {
			chiliName = filteredChiliList[0].name;
		} 
		return chiliName;
	}
}