import { createFeature, createReducer, on } from "@ngrx/store";
import { Student } from "../models";
import { studentsActions } from "./students.actions";

export const StudentS_FEATURE_KEY = 'Students';

export interface StudentsState {
  Students: Student[]; // Replace 'any' with the actual type of your Students
  loading: boolean;
  error: string | null;
}

export interface StudentState {
  Student: Student;
  loading: boolean;
  error: string | null;
}

const initialState: StudentsState = {
  Students: [],
  loading: false,
  error: null,
};

const initialStateStudentById: StudentState = {
  Student: {} as Student,
  loading: false,
  error: null,
}

const StudentsReducer = createReducer(
  initialState,
  on(studentsActions.loadStudents, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(studentsActions.loadStudentsSuccess, (state, action) => {
    return {
      ...state,
      Students: action.Students,
      loading: false,
      error: null,
    };
  }),
  on(studentsActions.loadStudentsFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      Students: [],
      error: action.error,
    };
  }),  
);

export const StudentsFeature = createFeature({
  name: StudentS_FEATURE_KEY,
  reducer: StudentsReducer
});
