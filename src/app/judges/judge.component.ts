import {Component} from 'angular2/core';
import {JudgeSelectorComponent} from './judge-selector.component'

@Component({
  selector: 'judges',
  templateUrl: 'app/judges/judge.component.html',
  directives: [JudgeSelectorComponent]
})
export class JudgeComponent {
}