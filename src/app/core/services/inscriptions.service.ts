import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, concatMap, delay, filter, find, map, Observable, of  } from "rxjs";
import { Inscription } from "../../modules/dashboard/modules/inscriptions/models";
import { Course } from "../../modules/dashboard/modules/courses/models";
import { InscriptionCourses } from "../models";


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

//   getAllCoursesAndStudentInscriptions(studentId: string): Observable<InscriptionCourses[]> {
//     const list: Inscription[] = [] 
//     let inscripcionesCursosOBS: Observable<InscriptionCourses[]>
// const inscripcionesCursos: InscriptionCourses[] = []
//     const courses = this.http.get<Course[]>(`http://localhost:3000/courses`)
//     .pipe(map(inscriptions => {
//       courses.forEach(cour => {
//                 let oneInscriptionOneCourse: InscriptionCourses = {} as InscriptionCourses

//                  inscriptions.forEach((inscription) => {

//             Object.assign(oneInscriptionOneCourse, cour)
//             oneInscriptionOneCourse.inscripted = true
//             // oneInscriptionOneCourse.courseId = cour.id
            
//              inscripcionesCursos.push(oneInscriptionOneCourse)
//            })
//               })
              
//               return inscripcionesCursos
//     }

//     ))
//     return courses
//   }


}