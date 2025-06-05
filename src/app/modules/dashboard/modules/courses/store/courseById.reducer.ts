import { createFeature, createReducer, on } from "@ngrx/store";
import { Course } from "../models";
import { coursesActions } from "./courses.actions";

export const COURSE_BY_ID_FEATURE_KEY = 'CourseById';

export interface CourseByIdState {
  Course: Course;
  loading: boolean;
  error: string | null;
}

const initialState: CourseByIdState = {
  Course: {} as Course,
  loading: false,
  error: null,
}

const CourseByIdReducer = createReducer(
  initialState,
  on(coursesActions.loadCourseById, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(coursesActions.loadCourseByIdSucces, (state, action) => {
    return {
      ...state,
      Course: action.Course,
      loading: false,
      error: null,
    };
  }),
  on(coursesActions.loadCourseByIdFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      Course: {} as Course,
      error: action.error,
    };
  }),  
);

export const CoursetByIdFeature = createFeature({
  name: COURSE_BY_ID_FEATURE_KEY,
  reducer: CourseByIdReducer
});
