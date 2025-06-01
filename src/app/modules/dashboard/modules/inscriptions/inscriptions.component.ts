import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inscription, InscriptionCourses } from './models';
import { InscriptionService } from '../../../../core/services/inscriptions.service';
import { concatMap, first, map, observable, Observable, of, take } from 'rxjs';
import { CourseService } from '../../../../core/services/courses.service';
import { Course } from '../courses/models';
import { NewInscrtiption, User } from '../../../../core/models';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-inscriptions',
  standalone: false,
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})
export class InscriptionsComponent {
  authUser$: Observable<User | null>;
  
  isLoading = false;

  editingId: number | null = null;
  inscriptionForm: FormGroup;

  user: User = {} as User

  inscriptions: Inscription[] = []
  inscriptionsByStudent: Inscription[] | null = []
  courses: Course[] = []
  inscriptionCourses: InscriptionCourses[] = []


  constructor(
    private authService: AuthService,
    private fb: FormBuilder, 
    private inscriptionService: InscriptionService,
    private courseServices: CourseService) {

      this.authUser$ = this.authService.authUser$;  

      this.inscriptionForm = this.fb.group({
    })

    this.getLoguedUser()
    this.loadInscriptedCoursesByStudent()
  }

  getLoguedUser(){
    
    this.authUser$.subscribe(
      {
        next: (response) => {
          this.user = response != null ? response : this.user;
        },
      }
    )
  }

  loadInscriptions(){
    this.isLoading = true;
    this.inscriptionService
      .getInscriptions()
      .pipe(take(1), first())
            .subscribe({
              next: (datos) => {
                this.inscriptions = datos; 
                
                console.log('inscripciones loaded')
              },
              error: (error) => console.error(error),
              complete: () => {
                this.isLoading = false; 
              },
            });
  }

  loadInscriptedCoursesByStudent(){
    of('234')
    .pipe(
      concatMap(() => {
        return this.loadAllCourses()
      }),
      concatMap((dataCourses) => {
        this.courses = dataCourses
        return this.getInscriptionsByStudent()
      })
    )
    .subscribe({
        next: (inscriptionsByStudent: Inscription[]) => {

          if(inscriptionsByStudent != null){
            this.courses.forEach(course => {
              let inscriptCourse: InscriptionCourses = {} as InscriptionCourses

            let resp = inscriptionsByStudent.find(x => x.courseId == course.id)
            
            Object.assign(inscriptCourse, course)
            
            //si no hay inscripcion no se usa el id, se crea de 0
            inscriptCourse.courseId = course.id
            inscriptCourse.inscriptionId = resp != null ? resp?.id : '0' 
            inscriptCourse.inscripted = resp != null

            this.inscriptionCourses.push(inscriptCourse)
            });
          }
          this.inscriptionCourses = [...this.inscriptionCourses]
          return this.inscriptionCourses
        },
      });
  }

  loadAllCourses() : Observable<any> {
    return this.courseServices.getCourses()
  }

  getInscriptionsByStudent() : Observable<any> {
    return this.inscriptionService.getInscriptionsByStudent(this.user.id)
  }

  
onUnsuscribeCourse(inscriptionCourse: InscriptionCourses){
    if(confirm("esta seguro que quiere desuscribirse del curso " + inscriptionCourse.name + "?")){
      this.inscriptionCourses = this.inscriptionCourses.filter((i) => i.inscriptionId !== inscriptionCourse.inscriptionId)

      this.inscriptionService.deleteInscription(inscriptionCourse.inscriptionId.toLocaleString()).subscribe({
        next: (response) => {
          // this.inscriptions = response;
          window.location.reload()  
        },
      });
    }
  }

onInscribeCourse(inscriptionCourse: InscriptionCourses){
  console.log("DATO DEL FRONT: ", inscriptionCourse)
    if(confirm("esta seguro que quiere inscribirse en el siguiente curso: " + inscriptionCourse.name + "?")){
      const newInscription: NewInscrtiption = {
        courseId: inscriptionCourse.courseId,
        studentId: this.user.id
      }
      console.log("llego newinscription: ", newInscription)
      this.inscriptionService.createInscription(newInscription).subscribe({
        next: (response) => {
          window.location.reload()

          // this.loadInscriptedCoursesByStudent()
        },
      });
    }
  }

 }

 