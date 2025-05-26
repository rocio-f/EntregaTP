import { Component, Input } from '@angular/core';
import { Inscription, InscriptionCourses } from '../../models';

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
}
