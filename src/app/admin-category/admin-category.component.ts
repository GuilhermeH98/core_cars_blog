import { Brand } from './../model/brand';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Category } from '../model/Category';
import { CategoryService } from '../core/api/category.service';
import { MessageTypes } from '../model/MessageTypes';
import { Utils } from '../utils/utils';
declare var bootbox: any;

const FORM_MODEL = {
  SAVE: 'SAVE',
  EDIT: 'EDIT',
}

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

    categoryForm: FormGroup;
    categories: Brand[] = [];
    messageTypeError: MessageTypes = MessageTypes.ERROR;
    errorMessage: string = '';
    formModel: string;
    categoryClone: Brand = {} as Brand;

    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService
    ) { }

    ngOnInit(): void {
        this.createBrandForm();
        this.getAllBrand();
    }

    createBrandForm(){
        this.categoryForm = this.formBuilder.group({
            categoryName: new FormControl('', [Validators.required, Validators.minLength(1)]),
        });
    }

    getAllBrand(){
        this.categoryService
            .getAllCategories()
            .subscribe((response) => {
                response.forEach(category => {
                    this.categories.push(category);
                });
            }, (error) => {

        });
    }

    saveBrand(){
        const categoryName: string = this.categoryForm.get('categoryName').value;

        this.categoryService
            .saveCategory(categoryName)
            .subscribe((response) => {
                this.categories.push(response.body);
                this.resetErrorMessage();
                this.categoryForm.reset();
                bootbox.alert({title: "Marca criada", message: "Marca criada com sucesso"});
            }, (error) => {
                this.formModel = FORM_MODEL.SAVE;
                this.errorMessage = error.error;
        });
    }

    deleteCategory(category: Brand){
        bootbox.confirm(
            `Tem certeza que deseja deletar a marca: ${category.name}`,
            (isConfirmed) => {
                if(isConfirmed == false) { return; }
                this.categoryService
                .deleteCategory(category.id)
                .subscribe((reseponse) => {
                    Utils.removeArrayItem(category, this.categories);
                    bootbox.alert({title: "Marca removida", message: "Marca removida com sucesso"});
                }, (error) => {
                  bootbox.alert({title: "Não pode deletar",message: "Existem carros vinculados a essa marca."});
            });
        });
    }


    editCategory(oldCategory: Brand){
      if(oldCategory.name === this.categoryClone.name){
        oldCategory.editting = false;
        this.resetCategoryClone();
        this.resetErrorMessage()
        return;

      }
      console.log(this.categoryClone);

      const editado: Brand = {
        id: this.categoryClone.id,
        name: this.categoryClone.name
      }

      console.log(editado);

      this.categoryService
          .editCategory(editado)
          .subscribe((response) => {
              this.resetErrorMessage();
              this.categoryClone.editting = false
              Utils.removeArrayItem(oldCategory, this.categories);
              this.categories.push(this.categoryClone);
              bootbox.alert({title: "Marca Atualizada", message: "Marca atualizada com sucesso"})
          }, (error) => {
            console.log(error);
              this.formModel = FORM_MODEL.EDIT;
              this.errorMessage = error.error;
      });
    }


    allowEdittingModel(category: Category){
        if(this.hasCategoryEditting() === true) { return;}
        category.editting = true;
        this.categoryClone = Object.assign({}, category);
    }

    resetCategoryClone(){
        this.categoryClone = {} as Category
    }

    resetErrorMessage(){
        this.errorMessage = '';
        this.formModel = '';
    }

    cancelEdittingModel(category: Category){
        category.editting = false;
        this.resetCategoryClone();
        this.resetErrorMessage();
    }


    hasCategoryEditting(){
        return this.categories.find(category => category.editting === true) ? true: false;
    }

}
