import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {Chili} from './chili';
import {ChiliService} from './chili.service';
import {RatingService} from '../rating/rating.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/chili/chili-list.component.html',
  styleUrls: ['app/chili/chili-list.component.css']
})
export class ChiliListComponent implements OnInit {
  public chilis: Chili[] = [];

  constructor(
    private _heroService: ChiliService, 
    private _router: Router,
    private _ratingService: RatingService) { }

  ngOnInit() {
    this._heroService.getChilis().then(chilis => this.chilis = chilis);
  }

  gotoDetail(chili: Chili) {
    this._router.navigate(['ChiliDetail', { id: chili.id }]);
  }

  gotoVote(chili: Chili) {
    this._router.navigate(['ChiliVote', { id: chili.id }]);
  }

  hasVotedOn(chili: Chili) {
    return this._ratingService.hasRatingForChili(chili.id);
  }
}