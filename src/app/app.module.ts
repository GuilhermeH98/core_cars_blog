import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { ReaderForumModule } from './reader-blog/reader-blog.module';
import { HeaderComponent } from './header/header.component';
import { AdminPublicationModule } from './admin-publication/admin-publication.module';
import { AdminCategoryModule } from './admin-category/admin-category.module';
import { CoreModule } from './core/core.module';
import { CarsModule } from './cars/cars.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    CoreModule,
    LoginModule,
    AdminPublicationModule,
    AdminCategoryModule,
    CarsModule,
    ReaderForumModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
