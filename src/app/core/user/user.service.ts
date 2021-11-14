import { Injectable } from '@angular/core';
import { Login } from 'src/app/model/Login';
import { BehaviorSubject, Observable } from 'rxjs';

const USER_STORAGE = "user";

@Injectable({providedIn: 'root'})
export class UserService {

  private userSubject = new BehaviorSubject<Login>(null);

  constructor() {
    this.getUser() && this.setUserSubject(this.getUser());
  }

  getUserSubject(): Observable<Login>{
    return this.userSubject.asObservable();
  }

  setUserSubject(login: Login){
    this.userSubject.next(login);
  }

  setToken(token: string): void{
    this.setToken(token);
  }

  setUser(login: Login): void{
    window.localStorage.setItem(USER_STORAGE, JSON.stringify(login));
    this.setUserSubject(login);
  }

  getUser(): Login {
    return JSON.parse(window.localStorage.getItem(USER_STORAGE));
  }

  getToken(): string{
    return `${this.getUser().token.type} ${this.getUser().token.token}`;
  }

  getUserEmail(): string {
    return this.getUser().email;
  }

  hasToken(): boolean{
    return this.getUser()?.token != null ? true: false;
  }

  isLogged(): boolean {
    return this.hasToken();
  }

  logout(): void{
    window.localStorage.removeItem(USER_STORAGE);
    this.userSubject.next(null);
  }

}
