import { Injectable } from '@angular/core';
import { concatMap, delay, filter, map, Observable, of } from 'rxjs';
import { Course, newCourse } from '../../modules/dashboard/modules/courses/models';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class CourseService{
constructor(private http: HttpClient){}

  getCourses(): Observable<Course[]> {
    const response = this.http.get<Course[]>(`http://localhost:3000/courses`);
        return response
  }

  getCourseById(id: string): Observable<Course | null> {
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
