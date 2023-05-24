import { Component } from "@angular/core";
import { Store } from '@ngrx/store';
import { ScoreCounterType } from '../counter.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-score-history',
  template: `
    <div class="score-history">
      <p class="score-history__title">Your total score: {{(counter$ | async)?.score}}</p>
      <div class="score-counter__list">
        <div class="score-counter__item" *ngFor="let throwScore of (counter$ | async)?.throws; let i = index">
          <hr>
          <b>Your {{ i + 1 }} roll score</b>
          <p>First throw: {{ throwScore.first }}</p>
          <p>Second throw: {{ throwScore.second }}</p>
          <p *ngIf="throwScore.third">Third throw: {{ throwScore.third }}</p>
          <p>Roll score: {{ throwScore.rollScore }}</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./score-history.component.scss']
})
export class ScoreHistoryComponent {
  public counter$: Observable<ScoreCounterType>;

  constructor(
    private store: Store<{ counter: ScoreCounterType }>
  ) {
    this.counter$ = this.store.select('counter');
  }
}
