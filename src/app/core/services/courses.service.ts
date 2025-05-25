import { Injectable } from '@angular/core';
import { concatMap, delay, filter, map, Observable, of } from 'rxjs';
import { Course, newCourse } from '../../modules/dashboard/modules/courses/models';
import { HttpClient } from '@angular/common/http';

const MY_DB_courses: Course[] = [
    {id: 11, name: 'Matemática', professor: 'Garcia Laura',  modality: 'virtual', level: 1},
    {id: 32, name: 'Progracmación 1', professor: 'Garcia Laura',  modality: 'virtual', level: 1},
    {id: 6, name: 'Programación 2', professor: 'Perez Igor',  modality: 'Presencial', level: 2},
    {id: 54, name: 'Base de datos 1', professor: 'Dario Juan',  modality: 'virtual', level: 2},
    {id: 21, name: 'Base de datos 2', professor: 'Artigas Maria',  modality: 'virtual', level: 3}
]

@Injectable({ providedIn: 'root' })
export class CourseService{
constructor(private http: HttpClient){}

  getCourses(): Observable<Course[]> {
    const response = this.http.get<Course[]>(`http://localhost:3000/courses`);
        return response
  }

  getCourseById(id: number): Observable<Course | null> {
       const response = this.http
          .get<Course>(`http://localhost:3000/courses/${id}`)
        return response
  }

  createCourse(course: newCourse): Observable<Course>{
    return this.http.post<Course>(`http://localhost:3000/courses`, course)
  }

  deleteCourse(id: string): Observable<Course[]> {
    return this.http
      .delete<Course[]>(`http://localhost:3000/courses/${id}`)
      .pipe(concatMap(() => this.getCourses()));
  }
}
