import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPublicationCardComponent } from './admin-publication-card.component';
import { DateFormatPipeModule } from 'src/app/utils/pipe/DateFormat/date-format.pipe.module';



@NgModule({
  declarations: [ AdminPublicationCardComponent ],
  imports: [ CommonModule, DateFormatPipeModule],
  exports: [ AdminPublicationCardComponent ]
})
export class AdminBlogCardModule { }
