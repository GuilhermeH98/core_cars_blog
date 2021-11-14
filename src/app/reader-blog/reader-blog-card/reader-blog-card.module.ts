import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReaderBlogCardComponent } from './reader-blog-card.component';
import { DateFormatPipeModule } from 'src/app/utils/pipe/DateFormat/date-format.pipe.module';

@NgModule({
  declarations: [ ReaderBlogCardComponent],
  imports: [ CommonModule, DateFormatPipeModule],
  exports: [ ReaderBlogCardComponent ]
})
export class ReaderBlogCardModule { }
