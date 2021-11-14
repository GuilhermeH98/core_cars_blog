import { Inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Publication } from '../model/Publication';
import { PublicationService } from '../core/api/publication.service';

@Injectable({ providedIn: 'root'})
export class CarsResolver implements Resolve<Publication[]>{

    constructor(private publicationService: PublicationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
       //   return this.publicationService.getCars();
    }

}
