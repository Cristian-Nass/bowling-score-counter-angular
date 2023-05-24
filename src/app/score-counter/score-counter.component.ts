import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { throwScore } from '../counter.actions';
import { ScoreCounterType } from '../counter.reducer';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-score-counter',
  templateUrl: './score-counter.component.html',
  styleUrls: ['./score-counter.component.scss'],
})
export class ScoreCounterComponent implements OnInit {
  private totalPins: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  private thirdRollFirstThrow = 0;
  public counter?: ScoreCounterType;
  public hasThirdRoll: boolean = false;
  public rollNumber?: number;
  public firstThrowRemainingPins: number[];
  public secondThrowRemainingPins: number[];
  public thirdThrowRemainingPins: number[];

  constructor(
    private store: Store<{ counter: ScoreCounterType }>,
    private cd: ChangeDetectorRef,
  ) {
    this.firstThrowRemainingPins = this.secondThrowRemainingPins = this.thirdThrowRemainingPins = this.totalPins;
  }

  public ngOnInit(): void {
    this.store.select('counter').subscribe(counter => {
      this.counter = counter;
      this.rollNumber = counter.frame + 1;
      this.cd.markForCheck();
    });
  }

  firstThrowChange(event: HTMLSelectElement) {
    this.secondThrowRemainingPins = this.totalPins;
    const first = +event.value;

    if (this.counter?.frame === 9) {
      this.thirdRollFirstThrow = first;

      if (first === 10) {
        this.hasThirdRoll = true;
        this.cd.markForCheck();
      } else {
        this.hasThirdRoll = false;
        this.cd.markForCheck();
      }
    } else {
      this.secondThrowRemainingPins = this.secondThrowRemainingPins.filter(f => f + first <= 10);
    }
  }

  secondThrowChange(event: HTMLSelectElement) {
    const second = +event.value;

    if (this.counter?.frame === 9 && this.thirdRollFirstThrow + second >= 10) {
      this.hasThirdRoll = true;
      this.cd.markForCheck();
    } else {
      this.hasThirdRoll = false;
      this.cd.markForCheck();
    }
  }

  onSubmit(form: NgForm) {
    const first = +form.value.firstThrow;
    const second = +form.value.secondThrow;
    this.store.dispatch(throwScore({ first, second, third: form.value.thirdThrow ? +form.value.thirdThrow : 0 }));

    // Reset Everything for next roll
    this.firstThrowRemainingPins = this.secondThrowRemainingPins = this.thirdThrowRemainingPins = this.totalPins;
    form.reset();
  }
}
