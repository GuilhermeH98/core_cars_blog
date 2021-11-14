import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs/operators';

import { Config } from '../../config';
import { Login } from 'src/app/model/Login';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private userService: UserService) { }


  login(email: string, password: string){

    const login: Login = {
      email: email,
      password: password,
      token: null
    }

    return this.http
      .post<Login>(
        `${Config.BK_URL}/auth`, 
        login, 
        { observe: 'response'}
      )
      .pipe(tap(response => {
        const login: Login = response.body;
        this.userService.setUser(login);
      }));
  }
}
