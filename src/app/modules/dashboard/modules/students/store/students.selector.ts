import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StudentS_FEATURE_KEY, StudentsState } from "./students.reducer";
import { STUDENT_BY_ID_FEATURE_KEY, StudentByIdState } from "./studentById.reducer";
// import { STUDENT_DELETE_FEATURE_KEY, StudentDeleteState } from "./studentDelete.reducer";


export const selectStudentsState =
  createFeatureSelector<StudentsState>(StudentS_FEATURE_KEY);
  
export const selectStudentByIdState =
  createFeatureSelector<StudentByIdState>(STUDENT_BY_ID_FEATURE_KEY);

// export const deleteStudentState =
//   createFeatureSelector<StudentDeleteState>(STUDENT_DELETE_FEATURE_KEY);

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

////////////
export const deleteStudent = createSelector(
  selectStudentsState,
  (state) => state.Students
);

export const deleteStudentSucces = createSelector(
  selectStudentsState,
  (state) => state.loading
);

export const deleteStudentFailure = createSelector(
  selectStudentsState,
  (state) => state.error
);

////////////
export const createStudent = createSelector(
  selectStudentsState,
  (state) => state.Students
);

export const createStudentSucces = createSelector(
  selectStudentsState,
  (state) => state.loading
);

export const createStudentFailure = createSelector(
  selectStudentsState,
  (state) => state.error
);

////////////
export const editStudent = createSelector(
  selectStudentsState,
  (state) => state.Students
);

export const editStudentSucces = createSelector(
  selectStudentsState,
  (state) => state.loading
);

export const editStudentFailure = createSelector(
  selectStudentsState,
  (state) => state.error
);