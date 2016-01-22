import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Chili} from '../chili/chili';
import {Category} from './category';
import {Rating} from './rating';
import {ChiliService} from '../chili/chili.service';
import {CategoryService} from './category.service';
import {RateInputComponent} from './rate-input.component';

@Component({
  selector: 'vote',
  templateUrl: 'app/voting/vote.component.html',
  styleUrls: ['app/voting/vote.component.css'],
  directives: [RateInputComponent]
})
export class VoteComponent implements OnInit {
  public chili: Chili;
  public categories: Category[] = [];
  public ratings: Rating[] = [];

  constructor(
    private _chiliService: ChiliService,
    private _routeParams: RouteParams,
    private _categoryService: CategoryService) {
  }

  ngOnInit() {
    if (!this.chili) {
      let id = +this._routeParams.get('id');
      this._chiliService.getChili(id).then(chili => {
        this.chili = chili
      });
    }

    this._categoryService.getCategories().then(categories => {
      this.categories = categories
      this.categories.forEach(category => 
        this.ratings.push({
          'ratingValue': null,
          'category': category
        })
       );
    });


  }

  resetVote() {
    this.ratings.forEach(rating => rating.ratingValue = null);
  }

  allRatingsFilled() {
    var ratingsFilled: number = 0;
    this.ratings.forEach(rating => {
      if (rating.ratingValue !== null) {
        ratingsFilled++;
      }
    })

    return ratingsFilled === this.ratings.length;
  }
}

