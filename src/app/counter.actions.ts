import { createAction, props } from '@ngrx/store';

export const throwScore = createAction(
  '[Bowling] Throw',
  props<{ first: number; second: number, third: number }>()
);
