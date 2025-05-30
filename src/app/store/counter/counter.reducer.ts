import { createReducer, on } from '@ngrx/store';
import { decrement, increment } from './counter.actions';

export interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0,
};

export const counterReducer = createReducer<CounterState>(
  initialState,
  // Cuando la acción increment es disparada, se ejecuta la función que recibe el estado actual y retorna el nuevo estado
  on(increment, (state) => {
    // Retornar un nuevo estado
    return {
      // state es el estado actual
      count: state.count + 1,
    };
  }),
  on(decrement, (state) => {
    return {
      count: state.count - 1,
    };
  })
);
