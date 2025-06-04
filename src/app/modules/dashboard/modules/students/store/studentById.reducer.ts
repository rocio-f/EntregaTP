import { createFeature, createReducer, on } from "@ngrx/store";
import { Student } from "../models";
import { studentsActions } from "./students.actions";

export const STUDENT_BY_ID_FEATURE_KEY = 'StudentById';

export interface StudentByIdState {
  Student: Student;
  loading: boolean;
  error: string | null;
}

const initialState: StudentByIdState = {
  Student: {} as Student,
  loading: false,
  error: null,
}

const StudentByIdReducer = createReducer(
  initialState,
  on(studentsActions.loadStudentById, (state) => {
    console.log('inicia student by id')
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(studentsActions.loadStudentByIdSucces, (state, action) => {
    console.log('load student by id')
    return {
      ...state,
      Student: action.Student,
      loading: false,
      error: null,
    };
  }),
  on(studentsActions.loadStudentByIdFailure, (state, action) => {
    console.log('fail student by id')
    return {
      ...state,
      loading: false,
      Student: {} as Student,
      error: action.error,
    };
  }),  
);

export const StudentByIdFeature = createFeature({
  name: STUDENT_BY_ID_FEATURE_KEY,
  reducer: StudentByIdReducer
});
