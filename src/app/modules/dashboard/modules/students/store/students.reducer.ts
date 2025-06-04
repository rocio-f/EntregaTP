import { createFeature, createReducer, on } from "@ngrx/store";
import { Student } from "../models";
import { studentsActions } from "./students.actions";

export const StudentS_FEATURE_KEY = 'Students';

export interface StudentsState {
  Students: Student[]; // Replace 'any' with the actual type of your Students
  loading: boolean;
  error: string | null;
}

const initialState: StudentsState = {
  Students: [],
  loading: false,
  error: null,
};

const StudentsReducer = createReducer(
  initialState,
  on(studentsActions.loadStudents, (state) => {
    console.log("REDUCER INIT")
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(studentsActions.loadStudentsSuccess, (state, action) => {
    console.log("REDUCER SUCCES: ", action.Students)
    return {
      ...state,
      Students: action.Students,
      loading: false,
      error: null,
    };
  }),
  on(studentsActions.loadStudentsFailure, (state, action) => {
    console.log("REDUCER ERROR: ", action.error)
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
  reducer: StudentsReducer,
});
