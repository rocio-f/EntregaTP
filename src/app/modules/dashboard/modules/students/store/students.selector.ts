import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StudentS_FEATURE_KEY, StudentsState } from "./students.reducer";


export const selectStudentsState =
  createFeatureSelector<StudentsState>(StudentS_FEATURE_KEY);

export const selectStudents = createSelector(
  selectStudentsState,
  (state) => state.Students
);

export const selectStudentsLoading = createSelector(
  selectStudentsState,
  (state) => state.loading
);

export const selectStudentsError = createSelector(
  selectStudentsState,
  (state) => state.error
);
