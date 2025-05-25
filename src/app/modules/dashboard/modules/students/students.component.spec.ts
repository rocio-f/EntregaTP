import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsComponent } from './students.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsComponent],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
