import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDetailComponent } from './student-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StudentDetailComponent', () => {
  let component: StudentDetailComponent;
  let fixture: ComponentFixture<StudentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentDetailComponent],
      imports:[
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
