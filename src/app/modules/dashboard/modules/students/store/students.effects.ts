import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, of } from "rxjs";
import { studentsActions } from "./students.actions";
import { StudentService } from "../../../../../core/services/students.service";

@Injectable()
export class StudentsEffects {
  loadStudents$;
  loadStudentById$;

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


  }
}
