import { Component, OnInit } from '@angular/core';
import { Student, newStudent } from './models';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../../../core/services/students.service';
import { first, map, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { studentsActions } from './store/students.actions';
import { selectStudentById, selectStudents, selectStudentsError, selectStudentsLoading } from './store/students.selector';


@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {

  editingId: string | null = null;
  studentForm: FormGroup;

  students: Student[] = []
  isLoading = false;

  students$: Observable<Student[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  // studentById$: Observable<Student> 

  constructor(
    private fb: FormBuilder, 
    private studentsService: StudentService,
    private store: Store) {

    this.students$ = this.store.select(selectStudents);
    this.loading$ = this.store.select(selectStudentsLoading);
    this.error$ = this.store.select(selectStudentsError);

    // this.studentById$ = this.store.select(selectStudentById)
    // this.studentById$.subscribe((data) => console.log('datos by id: ', data))

    this.studentForm = this.fb.group({
      
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      grade: ['', Validators.required]
    })

    // this.loadStudents()
    
  }

  ngOnInit(): void {
    this.store.dispatch(studentsActions.loadStudents())
    
  }

  loadStudents(){
   
     this.isLoading = true;
    this.studentsService
      .getStudents()
      .pipe(take(1), first())
      .subscribe({
        next: (datos) => {
          this.students = datos; 
        },
        error: (error) => console.error(error),
        complete: () => {
          this.isLoading = false; 
        },
      });
  }

  onSubmit(){
    if(this.editingId != null && this.editingId != undefined){
      this.students = this.students.map((student) =>
        student.id === this.editingId
          ? { ...student, ...this.studentForm.value }
          : student
      );
    } 
    else{
      ///nuevo estudiante
      const newStudent: newStudent  = this.studentForm.value
   
      this.studentsService.createStudent(newStudent)
      .subscribe({
        next: (response) =>{
          this.students = [...this.students, response]
        },
        error: (error) => console.error(error),
        complete: () => {
          
        }
      })
     
    }

    this.studentForm.reset()
    this.editingId = null
  }
  
  onVisibilityStudent(id: string){

  }

  onEditStudent(student: Student){
    this.editingId = student.id;
    this.studentForm.patchValue(student)
  }

  onDeleteStudent(id: string){
    if(confirm("esta seguro que quiere eliminar este estudiante " + id + "?")){
      this.students = this.students.filter((student) => student.id !== id)

      this.studentsService.deleteStudent(id.toLocaleString()).subscribe({
        next: (response) => {
          this.students = response;
        },
      });
    }

    
  }

}
