import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
logInForm: FormGroup;

constructor(
  private router: Router, 
  private fb: FormBuilder,
  private authService: AuthService) {
  
this.logInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })

}

  login() {

    if(this.logInForm.invalid){
      alert("Los campos de ususario y contraseña son obligatorios")
    } else {
      const {email, password} = this.logInForm.value
      const user = this.authService.logIn(email, password)
    }
  }

  register(){
    this.router.navigate(['auth/register']);
  }
}
