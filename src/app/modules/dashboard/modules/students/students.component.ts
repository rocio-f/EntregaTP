import { Component } from '@angular/core';
import { Student } from './models';
import { FormBuilder,  FormGroup } from '@angular/forms';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  // isEditing: boolean = false;
  editingId: number | null = null;
  studentForm: FormGroup;

  students: Student[] = [
    {id: 1, name: 'Maria', lastName: 'Garcia', grade: 6},
    {id: 2, name: 'Carolina', lastName: 'Peres', grade: 8},
    {id: 3, name: 'Juan', lastName: 'Perez', grade: 4},
    {id: 4, name: 'Lucia', lastName: 'Doe', grade: 6},
    {id: 5, name: 'Marcos', lastName: 'Fulano', grade: 5},
    {id: 6, name: 'Lucia', lastName: 'Smith', grade: 9},
    {id: 7, name: 'Antonio', lastName: 'Guerrera', grade: 8}
  ]

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      id: [''],
      name: [''],
      lastName: [''],
      grade: ['']
    })
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
