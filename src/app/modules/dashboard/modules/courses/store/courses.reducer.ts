import { createFeature, createReducer, on } from "@ngrx/store";
import { Course } from "../models";
import { coursesActions } from "./courses.actions";

export const COURSES_FEATURE_KEY = 'Courses';

export interface CoursesState {
  Courses: Course[]; 
  loading: boolean;
  error: string | null;
}

export interface CourseState {
  Course: Course;
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  Courses: [],
  loading: false,
  error: null,
};

const CoursesReducer = createReducer(
  initialState,
  on(coursesActions.loadCourses, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(coursesActions.loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      Courses: action.Courses,
      loading: false,
      error: null,
    };
  }),
  on(coursesActions.loadCoursesFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      Courses: [],
      error: action.error,
    };
  }),
  on(coursesActions.deleteCourse, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(coursesActions.deleteCourseSucces, (state, action) => {
    return {
      ...state,
     Courses: action.Courses,
      loading: false,
      error: null,
    };
  }),
  on(coursesActions.deleteCourseFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      Courses: [],
      error: action.error,
    };
  }),
  on(coursesActions.createCourse, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(coursesActions.createCourseSucces, (state, action) => {
    return {
      ...state,
      loading: false,
      Courses: action.Courses,
      error: null,
    };
  }),
  on(coursesActions.createCourseFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      Courses: [],
      error: action.error,
    };
  }),
  on(coursesActions.editCourse, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(coursesActions.editCourseSucces, (state, action) => {
    return {
      ...state,
      loading: false,
      Courses: action.Courses,
      error: null,
    };
  }),
  on(coursesActions.editCourseFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      Courses: [],
      error: action.error,
    };
  })
);

export const CoursesFeature = createFeature({
  name: COURSES_FEATURE_KEY,
  reducer: CoursesReducer
});
