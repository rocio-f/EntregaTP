import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/index.ts/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
registerForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    
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

    if(this.registerForm.invalid){
      alert("Todos los campos son obligatorios")
    } else {
      const {name, lastName, email, password} = this.registerForm.value
      const user = this.authService.register(name, lastName, email, password)
    }
    // this.router.navigate(['dashboard']);
  }
}
