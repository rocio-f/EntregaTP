import { Injectable } from '@angular/core';
import { concatMap, delay, filter, map, Observable, of } from 'rxjs';
import { newStudent, Student } from '../../modules/dashboard/modules/students/models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StudentService{
constructor(private http: HttpClient){}

  getStudents(): Observable<Student[]> {
    const response = this.http.get<Student[]>(`http://localhost:3000/students`);
    return response
  }

  getStudentById(id: string): Observable<Student> {
   
   const response = this.http
      .get<Student>(`http://localhost:3000/students/${id}`)
    return response
  }

  createStudent(student: newStudent): Observable<Student[]>{
    return this.http.post<Student>(`http://localhost:3000/students`, student)
    .pipe(concatMap(() => this.getStudents()));
  }

  deleteStudent(id: string): Observable<Student[]> {
    return this.http
      .delete<Student[]>(`http://localhost:3000/students/${id}`)
      .pipe(concatMap(() => this.getStudents()));
  }

  editStudent(student: Student): Observable<Student[]>{
    return this.http.put<Student>(`http://localhost:3000/students/${student.id}`, student)
    .pipe(concatMap(() => this.getStudents()));
  }


  //////
  //ejemplos promises
  //////
  // getStudents(): Promise<Student[]> {
    
  //   const studentsPromise = new Promise<Student[]>((resolve, reject) => {
  //     setTimeout(() => {
  //       try {
  //           resolve(MY_DB);
  //       } catch (error) {
  //           reject('Se produjo un error al intentar obtener la lista de estudiantes'); 
  //       }
  //     }, 2000); 
  //   });
  //   return studentsPromise;
  // }

  // getStudentById(id: number): Observable<Student | null> {
  //   return of([...MY_DB]).pipe(
  //     map((students) => students.find((students) => students
  //     .id == id) || null)
  //   );
  // }
}
