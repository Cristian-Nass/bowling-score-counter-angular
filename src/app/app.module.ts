import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { counterReducer } from './counter.reducer';
import { ScoreCounterComponent } from './score-counter/score-counter.component';
import { ScoreHistoryComponent } from './score-history/score-history.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, ScoreCounterComponent, ScoreHistoryComponent],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ counter: counterReducer }),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
