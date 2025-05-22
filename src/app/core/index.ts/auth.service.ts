import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { Student } from "../models";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService{
    private _authUser$ = new BehaviorSubject<Student | null>(null)

    authUser$: Observable<Student | null> = this._authUser$.asObservable()

    constructor(private http: HttpClient, private router: Router){}

    logIn(email: string, password: string): void {
        this.http.get<Student[]>(`http://localhost:3000/users?email=${email}&password=${password}`)
        .subscribe({
            next: (response) => {
                const user = response[0]

                if(user){
                    localStorage.setItem('token', user.token)
                    this.router.navigate(['/dashboard'])
                    this._authUser$.next(user)
                } else{
                    alert("Usuario o contrseña incorrectos")
                }
            }
        })
    }

    logOut(): void{
        localStorage.removeItem('token')
        this._authUser$.next(null)
        this.router.navigate(['/logIn'])
    }

    verifyToken(): Observable<Student | boolean>{
        const storedToken = localStorage.getItem('token')

        return this.http
        .get<Student[]>(`http://localhost:3000/users?token=${storedToken}`)
        .pipe(
            map((response) => {
                const student = response[0]
                if(student){
                    localStorage.setItem('token', student.token)
                    this._authUser$.next(student);
                    return true
                } else{
                    return false
                }
            })
        )
    }
}