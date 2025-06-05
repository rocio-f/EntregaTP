import { createActionGroup, createFeature, createReducer, emptyProps, props } from "@ngrx/store";
import { newCourse, Course } from "../models";

export interface CoursesState {
  courses: Course[]; 
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  courses: [],
  loading: false,
  error: null,
};

const coursesReducer = createReducer(initialState)

export const coursesActions = createActionGroup({
  source: 'Courses',
  events: {
    'Load Courses': emptyProps(),

    'Load Courses Success': props<{ Courses: Course[] }>(), 

    'Load Courses Failure': props<{ error: string }>(),

    //////
    'Load Course By Id': props<{ id: string }>(),

    'Load Course By Id Succes': props<{ Course: Course}>(),

    'Load Course By Id Failure': props<{ error: string }>(),

    //////
    'Delete Course': props<{ id: string }>(),

    'Delete Course Succes':  props<{ Courses: Course[] }>(),

    'Delete Course Failure': props<{ error: string }>(),

    //////
    'Create Course': props<{ Course: newCourse }>(),

    'Create Course Succes':  props<{ Courses: Course[] }>(),

    'Create Course Failure': props<{ error: string }>(),
    
    //////
    'Edit Course': props<{ Course: Course }>(),

    'Edit Course Succes':  props<{ Courses: Course[] }>(),

    'Edit Course Failure': props<{ error: string }>(),
  },
});
