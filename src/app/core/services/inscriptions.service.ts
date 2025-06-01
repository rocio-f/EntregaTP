import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, concatMap, delay, filter, find, map, Observable, of  } from "rxjs";
import { Inscription } from "../../modules/dashboard/modules/inscriptions/models";
import { Course } from "../../modules/dashboard/modules/courses/models";
import { InscriptionCourses, NewInscrtiption } from "../models";


@Injectable({ providedIn: 'root' })
export class InscriptionService{
constructor(private http: HttpClient){}

  getInscriptions(): Observable<Inscription[]> {
    const response = this.http.get<Inscription[]>(`http://localhost:3000/inscriptions`);
        return response
  }

  getInscriptionsByStudent(studentId: string | undefined): Observable<Inscription[] | null> {
         const response = this.http
            .get<Inscription[]>(`http://localhost:3000/inscriptions?studentId=${studentId}`)
          return response
  }

  deleteInscription(id: string): Observable<Inscription[]> {
    return this.http
      .delete<Inscription[]>(`http://localhost:3000/inscriptions/${id}`)
      .pipe(concatMap(() => this.getInscriptions()));
  }

  createInscription(inscription: NewInscrtiption): Observable<Inscription>{
    console.log("llego servicio, creando nueva inscripcion: ", inscription)
    return this.http.post<Inscription>(`http://localhost:3000/inscriptions`, inscription)
  }
}