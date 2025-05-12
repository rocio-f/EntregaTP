import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  constructor(private router: Router){

  }
  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['auth', 'login']);
  }
}
