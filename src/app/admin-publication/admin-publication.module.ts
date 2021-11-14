import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPublicationComponent } from './admin-publication.component';
import { ModalModule } from '../components/modal/modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from '../components/message/message.module';
import { ImageFormatModule } from '../utils/pipe/imageFormat/image-format.module';
import { AdminBlogCardModule } from './admin-publication-card/admin-publication-card.module';



@NgModule({
  declarations: [ AdminPublicationComponent ],
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
export class AdminPublicationModule { }
