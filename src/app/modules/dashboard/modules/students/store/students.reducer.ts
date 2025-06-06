import { createFeature, createReducer, on } from "@ngrx/store";
import { Student } from "../models";
import { studentsActions } from "./students.actions";

export const StudentS_FEATURE_KEY = 'Students';

export interface StudentsState {
  Students: Student[]; 
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
  on(studentsActions.deleteStudent, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(studentsActions.deleteStudentSucces, (state, action) => {
    return {
      ...state,
      Students: action.Students,
      loading: false,
      error: null,
    };
  }),
  on(studentsActions.deleteStudentFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      Students: [],
      error: action.error,
    };
  }),
  on(studentsActions.createStudent, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(studentsActions.createStudentSucces, (state, action) => {
    return {
      ...state,
      loading: false,
      Students: action.Students,
      error: null,
    };
  }),
  on(studentsActions.createStudentFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      Students: [],
      error: action.error,
    };
  }),
  on(studentsActions.editStudent, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(studentsActions.editStudentSucces, (state, action) => {
    return {
      ...state,
      loading: false,
      Students: action.Students,
      error: null,
    };
  }),
  on(studentsActions.editStudentFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      Students: [],
      error: action.error,
    };
  })
);

export const StudentsFeature = createFeature({
  name: StudentS_FEATURE_KEY,
  reducer: StudentsReducer
});
