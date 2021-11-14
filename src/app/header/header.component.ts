import { Component } from '@angular/core';
import { UserService } from '../core/user/user.service';
import { Login } from '../model/Login';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user$: Observable<Login>;

  constructor(
    private userService: UserService,
    private router: Router){
    this.user$ = userService.getUserSubject();
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['login']);
  }
}
