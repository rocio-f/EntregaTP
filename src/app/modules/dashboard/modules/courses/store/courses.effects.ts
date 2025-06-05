import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, of } from "rxjs";
import { coursesActions } from "./courses.actions";
import { CourseService } from "../../../../../core/services/courses.service";

@Injectable()
export class CoursesEffects {
  loadCourses$;
  loadCourseById$;
  deleteCourse$;
  createCourse$;
  editCourse$;

  constructor(private actions$: Actions, private courseService: CourseService) {
    this.loadCourses$ = createEffect(() => {
      return this.actions$.pipe(
        // Interceptar la acción 
        ofType(coursesActions.loadCourses),
        // Despues de interceptar la acción, ejecutar el servicio para obtener los datos
        concatMap(() =>
          this.courseService.getCourses().pipe(
            // Mapear la respuesta del servicio a la acción de éxito
            map((Courses) => coursesActions.loadCoursesSuccess({ Courses })),
            // Manejar errores 
            catchError((error) =>
              of(coursesActions.loadCoursesFailure({ error: error.message }))
            )
          )
        )
      );
    });

    this.loadCourseById$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(coursesActions.loadCourseById),
        concatMap((action) =>
          this.courseService.getCourseById(action.id).pipe(
            map((Course) => coursesActions.loadCourseByIdSucces({ Course })),
            catchError((error) =>
              of(coursesActions.loadCourseByIdFailure({ error: error.message }))
            )
          )
        )
      );
    });

    this.deleteCourse$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(coursesActions.deleteCourse),
        concatMap((action) =>
          this.courseService.deleteCourse(action.id).pipe(
            map((Courses) => {
              return coursesActions.deleteCourseSucces({ Courses })
            }),
            catchError((error) =>
              of(coursesActions.deleteCourseFailure({ error: error.message }))
            )
          )
        )
      );
    });

    this.createCourse$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(coursesActions.createCourse),
        concatMap((action) =>
          this.courseService.createCourse(action.Course).pipe(
            map((Courses) => {
              return coursesActions.createCourseSucces({ Courses })
            }),
            catchError((error) =>
              of(coursesActions.createCourseFailure({ error: error.message }))
            )
          )
        )
      );
    });

    this.editCourse$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(coursesActions.editCourse),
        concatMap((action) =>
          this.courseService.editCourse(action.Course).pipe(
            map((Courses) => {
              return coursesActions.editCourseSucces({ Courses })
            }),
            catchError((error) =>
              of(coursesActions.editCourseFailure({ error: error.message }))
            )
          )
        )
      );
    });

  }
}
