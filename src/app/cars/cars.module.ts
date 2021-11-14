import { CarsComponent } from './cars.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageFormatModule } from '../utils/pipe/imageFormat/image-format.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminBlogCardModule } from '../admin-publication/admin-publication-card/admin-publication-card.module';
import { MessageModule } from '../components/message/message.module';
import { ModalModule } from '../components/modal/modal.module';



@NgModule({
  declarations: [ CarsComponent ],
  imports: [
    CommonModule,
    AdminBlogCardModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    MessageModule,
    RouterModule,
    ImageFormatModule
    ]
})
export class CarsModule { }
