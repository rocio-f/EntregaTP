import { ActionReducerMap } from '@ngrx/store';
import { counterReducer, CounterState } from './counter/counter.reducer';

interface AppState {
  counter: CounterState;
}

export const appReducer: ActionReducerMap<AppState> = {
  counter: counterReducer,
};
