import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Chili} from '../chili/chili';
import {ChiliService} from '../chili/chili.service';

@Component({
  selector: 'vote',
  templateUrl: 'app/voting/vote.component.html',
  styleUrls: ['app/voting/vote.component.css']
})
export class VoteComponent implements OnInit {
  public chili: Chili;

  constructor(private _chiliService: ChiliService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    if (!this.chili) {
      let id = +this._routeParams.get('id');
      this._chiliService.getChili(id).then(chili => {
        console.log(chili);
        this.chili = chili
      });
    }
  }
}