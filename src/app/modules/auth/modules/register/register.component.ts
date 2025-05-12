import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
registerForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    
    this.registerForm = this.fb.group({
          nombre: ['', Validators.required],
          apellido: ['', Validators.required],
          email: ['', Validators.required],
          password: ['', Validators.required],
        })

  }

  cancelar(){
    this.router.navigate(['auth/login']);
  }

  registrarse(){
    this.router.navigate(['dashboard']);
  }
}
