import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Chili} from './chili';
import {ChiliService} from './chili.service';

@Component({
  selector: 'my-chili-detail',
  templateUrl: 'app/chili/chili-detail.component.html',
  styleUrls: ['app/chili/chili-detail.component.css'],
  inputs: ['chili']
})
export class ChiliDetailComponent implements OnInit {
  public chili: Chili;

  constructor(private _chiliService: ChiliService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    if (!this.chili) {
      let id = +this._routeParams.get('id');
      this._chiliService.getChili(id).then(chili => this.chili = chili);
    }
  }

  goBack() {
    window.history.back();
  }
}