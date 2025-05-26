import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionsComponent } from './inscriptions.component';
import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsTableComponent } from './components/inscriptions-table/inscriptions-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    InscriptionsComponent,
    InscriptionsTableComponent
  ],
  imports: [
    CommonModule,
    InscriptionsRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class InscriptionsModule { }
