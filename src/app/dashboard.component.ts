import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {Chili} from './chili/chili';
import {ChiliService} from './chili/chili.service';
import {RatingService} from './voting/rating.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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