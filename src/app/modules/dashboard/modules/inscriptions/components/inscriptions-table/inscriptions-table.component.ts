import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { Inscription, InscriptionCourses } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inscriptions-table',
  standalone: false,
  templateUrl: './inscriptions-table.component.html',
  styleUrl: './inscriptions-table.component.scss'
})
export class InscriptionsTableComponent {
displayedColumns: string[] = ['id', 'name', 'actions'];

  @Input()
  dataSource: InscriptionCourses[] = []

  @Output()
  unsuscribeCourse = new EventEmitter<InscriptionCourses>()
  
  @Output()
  inscribeCourse = new EventEmitter<InscriptionCourses>()
}
