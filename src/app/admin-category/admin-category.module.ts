import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCategoryComponent } from './admin-category.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessageModule } from '../components/message/message.module';

@NgModule({
  declarations: [ AdminCategoryComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MessageModule,
    RouterModule
  ]
})
export class AdminCategoryModule { }
