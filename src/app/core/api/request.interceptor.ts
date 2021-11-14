import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { UserService } from '../user/user.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor{

    constructor(private userService: UserService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.userService.hasToken()){
            const token = this.userService.getToken();
            req = req.clone({
                setHeaders: {
                    'Authorization': token
                }
            });
        }
        return next.handle(req);
    }

}