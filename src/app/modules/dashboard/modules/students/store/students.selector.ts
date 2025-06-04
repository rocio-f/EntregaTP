import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StudentS_FEATURE_KEY, StudentsState } from "./students.reducer";
import { STUDENT_BY_ID_FEATURE_KEY, StudentByIdState } from "./studentById.reducer";


export const selectStudentsState =
  createFeatureSelector<StudentsState>(StudentS_FEATURE_KEY);
  
export const selectStudentByIdState =
  createFeatureSelector<StudentByIdState>(STUDENT_BY_ID_FEATURE_KEY);

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

////////////
export const selectStudentById = createSelector(
  selectStudentByIdState,
  (state) => state.Student
);

export const selectStudentIdLoading = createSelector(
  selectStudentByIdState,
  (state) => state.loading
);

export const selectStudentIdError = createSelector(
  selectStudentByIdState,
  (state) => state.error
);