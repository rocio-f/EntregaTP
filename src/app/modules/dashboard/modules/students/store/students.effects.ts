import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, of } from "rxjs";
import { studentsActions } from "./students.actions";
import { StudentService } from "../../../../../core/services/students.service";

@Injectable()
export class StudentsEffects {
  loadStudents$;
  loadStudentById$;
  deleteStudent$;
  createStudent$;
  editStudent$;

  constructor(private actions$: Actions, private studentService: StudentService) {
    this.loadStudents$ = createEffect(() => {
      return this.actions$.pipe(
        // Interceptar la acción 
        ofType(studentsActions.loadStudents),
        // Despues de interceptar la acción, ejecutar el servicio para obtener los datos
        concatMap(() =>
          this.studentService.getStudents().pipe(
            // Mapear la respuesta del servicio a la acción de éxito
            map((Students) => studentsActions.loadStudentsSuccess({ Students })),
            // Manejar errores 
            catchError((error) =>
              of(studentsActions.loadStudentsFailure({ error: error.message }))
            )
          )
        )
      );
    });

    this.loadStudentById$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(studentsActions.loadStudentById),
        concatMap((action) =>
          this.studentService.getStudentById(action.id).pipe(
            map((Student) => studentsActions.loadStudentByIdSucces({ Student })),
            catchError((error) =>
              of(studentsActions.loadStudentByIdFailure({ error: error.message }))
            )
          )
        )
      );
    });

    this.deleteStudent$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(studentsActions.deleteStudent),
        concatMap((action) =>
          this.studentService.deleteStudent(action.id).pipe(
            map((Students) => {
              return studentsActions.deleteStudentSucces({ Students })
            }),
            catchError((error) =>
              of(studentsActions.deleteStudentFailure({ error: error.message }))
            )
          )
        )
      );
    });

    this.createStudent$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(studentsActions.createStudent),
        concatMap((action) =>
          this.studentService.createStudent(action.Student).pipe(
            map((Students) => {
              return studentsActions.createStudentSucces({ Students })
            }),
            catchError((error) =>
              of(studentsActions.createStudentFailure({ error: error.message }))
            )
          )
        )
      );
    });

    this.editStudent$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(studentsActions.editStudent),
        concatMap((action) =>
          this.studentService.editStudent(action.Student).pipe(
            map((Students) => {
              return studentsActions.editStudentSucces({ Students })
            }),
            catchError((error) =>
              of(studentsActions.editStudentFailure({ error: error.message }))
            )
          )
        )
      );
    });

  }
}
