import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inscription, InscriptionCourses } from './models';
import { InscriptionService } from '../../../../core/services/inscriptions.service';
import { first, Observable, take } from 'rxjs';
import { CourseService } from '../../../../core/services/courses.service';
import { Course } from '../courses/models';
import { User } from '../../../../core/models';
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
  courses: Course[] = []
  inscriptionCourses: InscriptionCourses[] = []


  constructor(
    private authService: AuthService,
    private fb: FormBuilder, 
    private inscriptionService: InscriptionService,
    private courseServices: CourseService) {

      this.authUser$ = this.authService.authUser$;  

      this.inscriptionForm = this.fb.group({
        // name: ['', Validators.required],
        // professor: ['', Validators.required],
        // modality: ['', Validators.required],
        // level: ['', Validators.required]
    })

    this.getLoguedUser()
    // this.loadInscriptions()
    // this.loadAllCourses()
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
    // const ccc = this.inscriptionService
    //   .getAllCoursesAndStudentInscriptions(this.user.id)
    //   .pipe(take(1), first())
    //         .subscribe({
    //           next: (datos) => {
    //             this.inscriptionCourses = datos; 
                
    //             console.log('inscripciones loaded' + JSON.stringify(datos))
    //           },
    //           error: (error) => console.error(error),
    //           complete: () => {
    //             this.isLoading = false; 
    //           },
    //         });
  }

//   loadAllCourses(){
//     this.courseServices.getCourses()
//     .pipe(take(1), first())
//             .subscribe({
//               next: (datos) => {
//                 this.courses = datos; 
//                 console.log('cursos loaded')
//               },
//               error: (error) => console.error(error),
//               complete: () => {
//                 this.getInscriptedCoursesByStudent()
//               },
//             });
//   }

//   getInscriptedCoursesByStudent(){
//     this.inscriptionService.getInscriptionsByStudent(this.user?.id)
//       .pipe(take(1), first())
//       .subscribe({
//         next: (datos) => {
          
//           if(datos != null){
//             this.courses.forEach(course => {
//               let inscriptCourse: InscriptionCourses = {} as InscriptionCourses

//             let resp = datos.find(x => x.courseId == course.id)
            
//             Object.assign(inscriptCourse, course)
            
//             //si no hay inscripcion no se usa el id, se crea de 0
//             inscriptCourse.inscriptionId = resp != null ? resp?.id : 0 
//             inscriptCourse.inscripted = resp != null

//             this.inscriptionCourses.push(inscriptCourse)
//             });
//           }
//           console.log('inscripcion cursos leaded')
//         },
//         error: (error) => console.error(error),
//         complete: () => {
// console.log("Incripciones a cursos: "+JSON.stringify(this.inscriptionCourses) )
//         },
//       });
//   }

unsuscribeCourse(inscriptionCourse: InscriptionCourses){
  console.log("llego  unsuscribeCourse")
    if(confirm("esta seguro que quiere desuscribirse del curso " + inscriptionCourse.name + "?")){
      this.inscriptionCourses = this.inscriptionCourses.filter((i) => i.courseId !== inscriptionCourse.inscriptionId)
    }

    this.inscriptionService.deleteInscription(inscriptionCourse.courseId.toLocaleString()).subscribe({
        next: (response) => {
          this.inscriptions = response;
        },
      });
  }

 }
