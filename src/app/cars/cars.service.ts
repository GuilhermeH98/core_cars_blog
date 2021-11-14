import { Car } from './../model/Car';
import { Injectable } from '@angular/core';


const USER_STORAGE = "user";

@Injectable({providedIn: 'root'})
export class CarService {

  carToEdit?: Car;

  constructor() {
  }

}
