import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { User } from '../models';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        MockProvider(Router),
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    localStorage.clear();
  });

  it('Debe realizar el login', () => {
    const email = 'mail@mail.com';
    const password = '789';
    const mockResponse: User[] = [
      {
        id: 1,
        name: 'pepe',
        lastName: 'garcia',
        grade: '5',
        email,
        password,
        role: 'admin',
        token: 'hs3fga5df56gsd9f69ds6f',
      },
    ];

    service.logIn(email, password);

    httpMock
      .expectOne(
        `http://localhost:3000/users?email=${email}&password=${password}`
      )
      .flush(mockResponse);

    expect(localStorage.getItem('token')).toBe(mockResponse[0].token);
  });

  it('Debe realizar el logout', () => {
    const spyOnNavigate = spyOn(router, 'navigate');

    service.logOut();

    expect(localStorage.getItem('token')).toBeNull();
    expect(spyOnNavigate).toHaveBeenCalledWith(['/logIn']);
  });
});
