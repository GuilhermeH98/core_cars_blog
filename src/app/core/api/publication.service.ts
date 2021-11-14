import { Brand } from './../../model/brand';
import { Car } from './../../model/Car';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/app/config';
import { Publication } from 'src/app/model/Publication';

const BK_URL_PUBLICATION = `${Config.BK_URL}/car`;

@Injectable({providedIn: 'root'})
export class PublicationService {

    constructor(
        private http: HttpClient
    ) { }

    getCars(brand: number){
        return this.http
                .get<Car[]>(`${BK_URL_PUBLICATION}/brand/` + brand
            );
    }

    getImage(photoKey: string){
        return this.http
            .get(`${BK_URL_PUBLICATION}/photo/${photoKey}`,
                { responseType: 'blob' }
            );
    }

    savePublication(car: Car, file: File){


        let formData = new FormData();
        formData.append("publication", new Blob([JSON.stringify({
                        "name": car.name,
                        "model": car.model,
                        "year": car.year,
                        "fipe": car.fipe,
                        "fuel": car.fuel,
                        "brand": car.brand

        })],{
            type: "application/json"
        }));
        formData.append("file", file);

        return this.http
            .post<Car>(BK_URL_PUBLICATION, formData);

    }

    deletePublication(id: number){
        return this.http
            .delete(`${BK_URL_PUBLICATION}/${id}`);
    }

    editPublication(car: Car, file: File){
        let formData = new FormData();
        if(!file){
            file = null;
        }

        console.log(car.brand);

        formData.append("publication", new Blob([JSON.stringify({
                        "id": car.id,
                        "name": car.name,
                        "model": car.model,
                        "year": car.year,
                        "fipe": car.fipe,
                        "fuel": car.fuel,
                        "brand": car.brand
        })],{
            type: "application/json"
        }));
        formData.append("file", file);

        return this.http
            .put<Car>(BK_URL_PUBLICATION, formData);
    }


}
