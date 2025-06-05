import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models';
import { Observable } from 'rxjs';
import { User } from '../../../../../../core/models';
import { AuthService } from '../../../../../../core/services/auth.service';

@Component({
  selector: 'app-courses-table',
  standalone: false,
  templateUrl: './courses-table.component.html',
  styleUrl: './courses-table.component.scss'
})
export class CoursesTableComponent {
displayedColumns: string[] = ['id', 'name', 'professor', 'modality', 'level', 'actions'];

  @Input()
  dataSource: Course[] | null = []
  
  @Input()
  loading: boolean | null = false 

  @Input()
  error: string | null = ''
  
  @Output()
  deleteCourse = new EventEmitter<string>()

  @Output()
  editCourse = new EventEmitter<Course>()

    authUser$: Observable<User | null>;
  
    constructor(private authService: AuthService) {
      this.authUser$ = this.authService.authUser$;
    }
}
