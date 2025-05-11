import { Component } from '@angular/core';
import { Student } from './models';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { StudentService } from './students.services';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  editingId: number | null = null;
  studentForm: FormGroup;

  students: Student[] = []
  isLoading = false;

  constructor(private fb: FormBuilder, private studentsService: StudentService) {
    this.studentForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      grade: ['', Validators.required]
    })

    this.loadStudents()
  }

  loadStudents(){
     this.isLoading = true;
    this.studentsService
      .getStudents()
      .then((datos) => 
        // console.log(datos)
        this.students = datos
      )
      .catch((error) => console.error(error)) 
      .finally(() => (this.isLoading = false)); 
  }

  onSubmit(){
    if(this.editingId != null && this.editingId != undefined){
      //editando
      this.students = this.students.map((student) => student.id === this.editingId ? 
      {...student, ...this.studentForm.value} : student )
    } 
    else{
      ///nuevo estudiante
      let lastStudent = this.students[this.students.length-1];
      this.studentForm.value.id = lastStudent.id + 1;
      this.students = [...this.students, this.studentForm.value]
    }

    this.studentForm.reset()
    this.editingId = null

    console.log("fin submit" + this.editingId)
  }
  
  onEditStudent(student: Student){
    
    this.editingId = student.id;
    this.studentForm.patchValue(student)
  }

  onDeleteStudent(id: number){
    if(confirm("esta segudo que quiere eliminar este estudiante " + id + "?")){
      this.students = this.students.filter((student) => student.id !== id)
    }
  }
}
