import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/model/Category';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-reader-blog-card',
  templateUrl: './reader-blog-card.component.html',
  styleUrls: ['./reader-blog-card.component.scss']
})
export class ReaderBlogCardComponent implements OnInit{

    @Input() image;
    @Input() title: string;
    @Input() content: string;;
    @Input() data: Date;
    @Input() category: Category;
    @Input() user: User;

    constructor() {}

    ngOnInit(): void {
    }



}
