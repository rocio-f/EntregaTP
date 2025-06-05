import { createFeatureSelector, createSelector } from "@ngrx/store";
import { COURSES_FEATURE_KEY, CoursesState } from "./courses.reducer";
import { COURSE_BY_ID_FEATURE_KEY, CourseByIdState  } from "./courseById.reducer";


export const selectCoursesState =
  createFeatureSelector<CoursesState>(COURSES_FEATURE_KEY);
  
export const selectCourseByIdState =
  createFeatureSelector<CourseByIdState>(COURSE_BY_ID_FEATURE_KEY);
  
export const selectCourses = createSelector(
  selectCoursesState,
  (state) => state.Courses
);

export const selectCourse = createSelector(
  selectCoursesState,
  (state) => state.Courses
);

export const selectCoursesLoading = createSelector(
  selectCoursesState,
  (state) => state.loading
);

export const selectCoursesError = createSelector(
  selectCoursesState,
  (state) => state.error
);

////////////
export const selectCourseById = createSelector(
  selectCourseByIdState,
  (state) => state.Course
);

export const selectCourseIdLoading = createSelector(
  selectCourseByIdState,
  (state) => state.loading
);

export const selectCourseIdError = createSelector(
  selectCourseByIdState,
  (state) => state.error
);

////////////
export const deleteCourse = createSelector(
  selectCoursesState,
  (state) => state.Courses
);

export const deleteCourseSucces = createSelector(
  selectCoursesState,
  (state) => state.loading
);

export const deleteCourseFailure = createSelector(
  selectCoursesState,
  (state) => state.error
);

////////////
export const createCourse = createSelector(
  selectCoursesState,
  (state) => state.Courses
);

export const createCourseSucces = createSelector(
  selectCoursesState,
  (state) => state.loading
);

export const createCourseFailure = createSelector(
  selectCoursesState,
  (state) => state.error
);

////////////
export const editCourse = createSelector(
  selectCoursesState,
  (state) => state.Courses
);

export const editCourseSucces = createSelector(
  selectCoursesState,
  (state) => state.loading
);

export const editCourseFailure = createSelector(
  selectCoursesState,
  (state) => state.error
);