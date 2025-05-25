import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../../../../shared/shared.module';
import { AuthService } from '../../../../core/services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports:[
        HttpClientTestingModule,
        MatFormFieldModule,
        SharedModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('el email y la password deben ser campos requeridos', () => {
    component.logInForm.setValue({
      email: '',
      password: '',
    });

    expect(component.logInForm.valid).toBeFalsy();
  });

  it('si el formulario es invalido, no se debe hacer login y debe mostrar un alert', () => {
    component.logInForm.setValue({
      email: '',
      password: '',
    });

    const alertSpy = spyOn(window, 'alert');

    component.login();

    expect(alertSpy).toHaveBeenCalledWith('Los campos de ususario y contraseña son obligatorios');
  });

  it('si el formulario es valido, se debe hacer login', () => {
    component.logInForm.setValue({
      email: 'mail@mail.com',
      password: '789',
    });

    const authService = TestBed.inject(AuthService);
    const loginSpy = spyOn(authService, 'logIn');

    component.login();

    expect(loginSpy).toHaveBeenCalledWith('mail@mail.com', '789');
  });
});
