import { LoginGuard } from './core/guard/login-guard';
import { CarsComponent } from './cars/cars.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReaderBlogComponent } from './reader-blog/reader-blog.component';
import { AdminPublicationComponent } from './admin-publication/admin-publication.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminPublicationResolver } from './admin-publication/admin-publication.resolver';
import { Guard } from './core/guard/guard';
import { CarsResolver } from './cars/cars.resolver';

const routes: Routes = [

    {
      path: 'login',
      component: LoginComponent,
      canActivate: [LoginGuard]
    },
    {
      path: 'admin',
      component: AdminPublicationComponent,
      canActivate: [Guard]
    },
    {
      path: 'brand',
      component: AdminCategoryComponent,
      canActivate: [Guard]
    },
    {
      path: '',
      component: LoginComponent,
    },
    {
      path: 'cars',
       component: CarsComponent,
    }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
