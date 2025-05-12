import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models';

@Component({
  selector: 'app-courses-table',
  standalone: false,
  templateUrl: './courses-table.component.html',
  styleUrl: './courses-table.component.scss'
})
export class CoursesTableComponent {
displayedColumns: string[] = ['id', 'name', 'professor', 'modality', 'level', 'actions'];

  @Input()
  dataSource: Course[] = []
  
  @Output()
  deleteCourse = new EventEmitter<number>()

  @Output()
  editCourse = new EventEmitter<Course>()
}
