import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
logInForm: FormGroup;

constructor(private router: Router, private fb: FormBuilder) {
  
this.logInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })

}

  login() {
    localStorage.setItem('token', '123456ABC');
    this.router.navigate(['dashboard']);
  }

  register(){
    this.router.navigate(['auth/register']);
  }
}
