import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsTableComponent } from './students-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';

describe('StudentsTableComponent', () => {
  let component: StudentsTableComponent;
  let fixture: ComponentFixture<StudentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsTableComponent],
      imports: [
        HttpClientTestingModule,
        MatTableModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
