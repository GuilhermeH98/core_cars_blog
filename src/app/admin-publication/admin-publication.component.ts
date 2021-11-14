import { Car } from './../model/Car';
import { Brand } from './../model/brand';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PublicationService } from '../core/api/publication.service';
import { Publication } from '../model/Publication';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../core/api/category.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../core/user/user.service';
import { MessageTypes } from '../model/MessageTypes';
import { CarService } from '../cars/cars.service';
declare var $:any;
declare var bootbox: any;

@Component({
  templateUrl: './admin-publication.component.html',
  styleUrls: ['./admin-publication.component.scss']
})
export class AdminPublicationComponent implements OnInit , OnDestroy{

    carFormGroup!: FormGroup;
    editFormGroup!: FormGroup;
    publications: Car[] = [];
    publicationClone!: Publication;
    marcas: Brand[] = [];
    selectedFile!: File;
    isPublicationFormOpen: boolean = false;
    isPublicationEditFormOpen: boolean = false;
    messageType: MessageTypes = MessageTypes.ERROR;
    hasFileError: boolean = false;
    disableFields: boolean = true;
    carToEdit?: Car;

    marcaParaEdit?: Brand;

    constructor(
        private publicationService: PublicationService,
        private activatedRoute: ActivatedRoute,
        private categoryService: CategoryService,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private carService: CarService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.publications = this.activatedRoute.snapshot.data['publications'];
        this.carToEdit = this.carService.carToEdit;
        this.createCarForm();
        this.createCarEditForm();
        this.getCategories();

        if(this.carService.carToEdit != null){
          this.editFormGroup.patchValue({name: this.carToEdit.name,model: this.carToEdit.model, year: this.carToEdit.year, fipe: this.carToEdit.fipe,fuel: this.carToEdit.fuel, brand: this.carToEdit.brand})
          this.getImage(this.carToEdit.photoKey, (photolink) => {
            if(photolink){
              this.carToEdit.photoLink = photolink;
            }})
        }
    }

    ngOnDestroy(): void{
      this.carService.carToEdit = null;
      this.carToEdit = null;
    }

    createCarForm(){
        this.carFormGroup = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            model: new FormControl('', Validators.required),
            year: new FormControl('', Validators.required),
            fipe: new FormControl('', Validators.required),
            fuel: new FormControl('', Validators.required),
            brand: new FormControl('', Validators.required)
        });
    }

    createCarEditForm(publication?: Publication, categoryIndex?: number){
        this.editFormGroup = this.formBuilder.group({
          name: new FormControl('', Validators.required),
          model: new FormControl('', Validators.required),
          year: new FormControl('', Validators.required),
          fipe: new FormControl('', Validators.required),
          fuel: new FormControl('', Validators.required),
          brand: new FormControl('', Validators.required)
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

            });
    }

    getCategories(){
        this.categoryService
            .getAllCategories()
            .subscribe((response) => {
                this.marcas = response;
                if(this.carToEdit != null){
                  let teste = this.marcas.find(marca => marca.id == this.carToEdit.brand.id)
                  this.editFormGroup.patchValue({ brand: teste});
                }
              }, (error) => {

        });
    }

    openPublicationForm(){
        this.isPublicationFormOpen = !this.isPublicationFormOpen;
    }

    hiddenPublicationForm(){
        this.isPublicationFormOpen = false;
        this.resetSelectedFile();
    }

    openPublicationEditForm(){
        this.isPublicationEditFormOpen = true;
    }


    hiddenPublicationEditForm(){
        this.isPublicationEditFormOpen = false;
        this.resetSelectedFile();
    }

    savePublication(){
        if(!this.selectedFile){
            this.hasFileError = true;
            return;
        }


        const name = this.carFormGroup.get('name').value;
        const model = this.carFormGroup.get('model').value;
        const year = this.carFormGroup.get('year').value;
        const fipe = this.carFormGroup.get('fipe').value;
        const fuel = this.carFormGroup.get('fuel').value;
        const brand: Brand = this.carFormGroup.get('brand').value as Brand;
        const user = this.userService.getUser();
        this.hasFileError = false;

        console.log(brand);

         const car = this.createPublicationObject(name, model, year,fipe,fuel,brand);

         this.publicationService
             .savePublication(car, this.selectedFile)
             .subscribe((response) => {
                 let publication = response;
                 this.getImage(publication.photoKey, (photoLink) => {
                     publication.photoKey = photoLink;
                   //  this.publications.push(publication);
                   //  this.hiddenPublicationForm();
                     this.carFormGroup.reset();
                     this.carFormGroup.patchValue({fuel: '', brand: ''})
                     bootbox.alert({title: "Carro cadastrado", message: "Carro cadastrado com sucesso!"});
                 });
             }, (error) => {
                 console.log(error);
                 if(error.error.includes('Maximum upload size')){
                   alert("Tamanho do arquivo ultrapassa o limite!")
                 };
             });
    }

    deleteCar(){
        this.publicationService
            .deletePublication(this.carToEdit.id)
            .subscribe((response) => {
                let car = this.carToEdit;
                bootbox.alert({title: "Carro deletado", message: "Carro deletado com sucesso!"});
                this.router.navigate(['cars']);
            }, (error) => {
              console.log(error)
            });
    }

    saveEditPublication(){

      const name = this.editFormGroup.get('name').value;
      const model = this.editFormGroup.get('model').value;
      const year = this.editFormGroup.get('year').value;
      const fipe = this.editFormGroup.get('fipe').value;
      const fuel = this.editFormGroup.get('fuel').value;
      const brand: Brand = this.editFormGroup.get('brand').value as Brand;
      console.log(brand);
      const user = this.userService.getUser();

      const car = this.createPublicationObject(name, model, year,fipe,fuel,brand);
        car.id = this.carToEdit.id;

        this.publicationService
            .editPublication(car, this.selectedFile)
            .subscribe((response) => {
                let publication = response;
                this.getImage(publication.photoKey, (photoLink) => {
                    publication.photoLink = photoLink;
                    bootbox.alert({title: "Carro Atualizado", message: "Carro atualizado com sucesso!"});
                    this.router.navigate(['cars']);
                });
            }, (error) => {
                console.log(error);
            });
    }

    selectFile(event) {
        this.selectedFile = event.target.files[0];
    }

    resetSelectedFile(){
        this.selectedFile = null;
    }

    createPublicationObject(name, model, year,fipe,fuel,brand): Car{
        return {
          name: name,
          model: model,
          year: year,
          fipe: fipe,
          fuel: fuel,
          brand: brand
        } as Car
    }

    deleteCategory(){
      bootbox.confirm(
          `Tem certeza que deseja deletar o carro: ${this.carFormGroup.get('name').value}?`,
          (isConfirmed) => {
              if(isConfirmed == false) { return; }
      }
      );
    }


}
