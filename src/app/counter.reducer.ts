import { createReducer, on } from '@ngrx/store';
import { throwScore } from './counter.actions';

export interface ThrowDataType {
  first: number;
  second: number;
  third: number;
  strike?: boolean;
  spare?: boolean;
  rollScore?: number;
}

export interface ScoreCounterType {
  score: number;
  frame: number;
  throws: ThrowDataType[];
}

export const initialState: ScoreCounterType = {
  score: 0,
  frame: 0,
  throws: [],
};

export const counterReducer = createReducer(
  initialState,
  on(throwScore, (state, { first, second, third }) => {
    const rollScore = first + second + third;
    const currentFrame = state.frame + 1;

    const rolls: ThrowDataType[] = [];
    state.throws.forEach(roll => {
      rolls.push(roll);
    });

    if (currentFrame >= 2) {
      const lastIndex = currentFrame - 2;
      const lastRoll = rolls[lastIndex];

      if (lastRoll.spare && lastRoll.rollScore) {
        rolls[lastIndex] = {
          ...lastRoll,
          rollScore: lastRoll.rollScore + first
        };
      }

      if (lastRoll.strike && lastRoll.rollScore) {
        rolls[lastIndex] = {
          ...lastRoll,
          rollScore: lastRoll.rollScore + first + second
        };
      }

      if (currentFrame >= 3) {
        const beforeLastIndex = currentFrame - 3;
        const beforeLastRoll = rolls[beforeLastIndex];

        if (beforeLastRoll.strike && beforeLastRoll.rollScore && lastRoll.strike) {
          rolls[beforeLastIndex] = {
            ...beforeLastRoll,
            rollScore: beforeLastRoll.rollScore + first
          };
        }
      }
    }

    let totalScore = 0;
    rolls.map(r => r.rollScore).forEach(rS => {
      totalScore += rS || 0
    });

    return {
      ...state,
      frame: currentFrame,
      score: totalScore + rollScore,
      throws: [...rolls,
        {
          first,
          second,
          third,
          rollScore,
          strike: (first === 10) || (second === 10),
          spare: (first !== 10) && (second !== 10) && (first + second === 10),
        }
      ],
    };
  })
);
