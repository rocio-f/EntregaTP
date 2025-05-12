import { Injectable } from '@angular/core';
import { delay, filter, map, Observable, of } from 'rxjs';
import { Student } from './models';

const MY_DB: Student[] = [
    {id: 14523, name: 'Maria', lastName: 'Garcia', grade: 6},
    {id: 22452, name: 'Carolina', lastName: 'Peres', grade: 8},
    {id: 34323, name: 'Juan', lastName: 'Perez', grade: 4},
    {id: 40062, name: 'Lucia', lastName: 'Doe', grade: 6},
    {id: 35244, name: 'Marcos', lastName: 'Fulano', grade: 5},
    {id: 26342, name: 'Lucia', lastName: 'Smith', grade: 9},
    {id: 57311, name: 'Antonio', lastName: 'Guerrera', grade: 8}
]

@Injectable({ providedIn: 'root' })
export class StudentService{
    
  getStudents(): Promise<Student[]> {
    
    const studentsPromise = new Promise<Student[]>((resolve, reject) => {
      setTimeout(() => {
        try {
            resolve(MY_DB);
        } catch (error) {
            reject('Se produjo un error al intentar obtener la lista de estudiantes'); 
        }
      }, 2000); 
    });
    return studentsPromise;
  }

  getStudentById(id: number): Observable<Student | null> {
    return of([...MY_DB]).pipe(
      map((students) => students.find((students) => students
      .id == id) || null)
    );
  }
}
