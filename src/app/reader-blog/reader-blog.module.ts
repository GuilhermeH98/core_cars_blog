import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReaderBlogComponent } from './reader-blog.component';
import { ReaderBlogCardModule } from './reader-blog-card/reader-blog-card.module';
import { ImageFormatModule } from '../utils/pipe/imageFormat/image-format.module';



@NgModule({
  declarations: [ ReaderBlogComponent ],
  imports: [ 
      CommonModule, 
      ReaderBlogCardModule,
      ImageFormatModule
    ]
})
export class ReaderForumModule { }
