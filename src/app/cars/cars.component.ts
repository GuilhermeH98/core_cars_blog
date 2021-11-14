import { FormBuilder, FormGroup } from '@angular/forms';
import { PublicationService } from './../core/api/publication.service';
import { Car } from './../model/Car';
import { Brand } from './../model/brand';
import { teste } from './teste';
import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../core/api/category.service";
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from './cars.service';
import { UserService } from '../core/user/user.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})

export class CarsComponent implements OnInit {
  cars: Car[] = [];
  marcas: Brand[] = [];

  carsFormGroup!: FormGroup;

  constructor( private categoryService: CategoryService,private formBuilder: FormBuilder,private router: Router,private userService: UserService,
    private activatedRoute: ActivatedRoute,private publicationService: PublicationService,private carService: CarService){
  }

  ngOnInit(){
    this.carsFormGroup = this.formBuilder.group({brand: ['']})
    this.getAllBrand();
  }

  editCar(carToEdit: Car){
    if(this.userService.isLogged() === true){
      this.carService.carToEdit = carToEdit;
      this.router.navigate(['admin']);
    }
    else{
      this.router.navigate(['login']);

    }

  }

  changeBrand(){
    const brandId = this.carsFormGroup.get('brand').value;
    if(brandId){
    this.cars = [];
    this.publicationService
        .getCars(brandId)
        .subscribe((response) => {
            response.forEach(car => {
                this.cars.push(car);
                this.loadCarsWithImage();
            });

        }, (error) => {
          console.log(error);

    });
    }
  }

  getAllBrand(){
    this.categoryService
        .getAllCategories()
        .subscribe((response) => {
            response.forEach(brand => {
                this.marcas.push(brand);
            });
            this.carsFormGroup.patchValue({brand: this.marcas[0]?.id});
            this.changeBrand();
        }, (error) => {
          console.log(error);

    });
  }

  getCars(){
    this.publicationService
        .getCars(this.marcas[0].id)
        .subscribe((response) => {
            response.forEach(car => {
                this.cars.push(car);
                this.loadCarsWithImage();
            });
        }, (error) => {
          console.log(error);

    });
  }

  loadCarsWithImage(){
    this.cars
        .forEach(car => {
            this.getImage(car.photoKey, (photolink) => {
                if(photolink){
                    car.photoLink = photolink;
                }
            });
        });
  }

  getImage(photKey, callback){
    this.publicationService
        .getImage(photKey)
        .subscribe((response) => {
            const blob = new Blob([response], { type:'image/jpeg' });
            const url = window.URL.createObjectURL(blob);
            callback(url);
        }, (error) => {
          console.log(error)
        });
  }

  groupColumns(arrayExample: Car[]) {
    const newRows = [];
    for(let index = 0; index < arrayExample.length; index+=3) {
      newRows.push(arrayExample.slice(index, index + 3));
    }

    return newRows;
  }
}
