import { createFeatureSelector } from '@ngrx/store';
import { CounterState } from './counter.reducer';

export const selectCounterState =
  createFeatureSelector<CounterState>('counter');
