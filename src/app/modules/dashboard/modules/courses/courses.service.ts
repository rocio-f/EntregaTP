import { Injectable } from '@angular/core';
import { delay, filter, map, Observable, of } from 'rxjs';
import { Course } from './models';

const MY_DB_courses: Course[] = [
    {id: 11, name: 'Matemática', professor: 'Garcia Laura',  modality: 'virtual', level: 1},
    {id: 32, name: 'Progracmación 1', professor: 'Garcia Laura',  modality: 'virtual', level: 1},
    {id: 6, name: 'Programación 2', professor: 'Perez Igor',  modality: 'Presencial', level: 2},
    {id: 54, name: 'Base de datos 1', professor: 'Dario Juan',  modality: 'virtual', level: 2},
    {id: 21, name: 'Base de datos 2', professor: 'Artigas Maria',  modality: 'virtual', level: 3}
]

@Injectable({ providedIn: 'root' })
export class CourseService{
    
  getCourses(): Promise<Course[]> {
    
    const coursesPromise = new Promise<Course[]>((resolve, reject) => {
      setTimeout(() => {
        try {
            resolve(MY_DB_courses);
        } catch (error) {
            reject('Se produjo un error al intentar obtener la lista de cursos'); 
        }
      }, 1000); 
    });
    return coursesPromise;
  }

  getCourseById(id: number): Observable<Course | null> {
    
    return of([...MY_DB_courses]).pipe(
      map((courses) => courses.find((courses) => courses
      .id == id) || null)
    );
  }
}
