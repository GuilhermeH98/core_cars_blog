import { Brand } from './../../model/brand';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../model/Category';
import { Config } from '../../config';


const BK_URL_CATEGORY = `${Config.BK_URL}/brand`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getAllCategories(){
    return this.http
      .get<Brand[]>(
        `${BK_URL_CATEGORY}/all`
    );
  }

  saveCategory(name: string){

    const category: Brand = {
      id: null,
      name: name,
    }

    return this.http
      .post<Category>(
        BK_URL_CATEGORY,
        category,
        { observe: 'response'}
    );
  }

  deleteCategory(id: number){
    return this.http
      .delete(`${BK_URL_CATEGORY}/${id}`);
  }

  editCategory(category: Brand){
    return this.http
      .put<Category>(
        `${BK_URL_CATEGORY}`,
        category,
        { observe: 'response'}
      );
  }


}
