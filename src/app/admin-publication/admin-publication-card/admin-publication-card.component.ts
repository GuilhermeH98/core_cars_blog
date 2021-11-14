import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/model/Category';
import { User } from 'src/app/model/User';
declare var bootbox: any;

@Component({
  selector: 'app-admin-publication-card',
  templateUrl: './admin-publication-card.component.html',
  styleUrls: ['./admin-publication-card.component.scss']
})
export class AdminPublicationCardComponent implements OnInit {

    @Output() deletePublication = new EventEmitter<number>();
    @Output() editPublication = new EventEmitter<number>();
    @Input() publicationId: number;
    @Input() image;
    @Input() title: string;
    @Input() content: string;;
    @Input() data: Date;
    @Input() category: Category;
    @Input() user: User;

    constructor() { }

    ngOnInit(): void {
    }

    delete(){
        bootbox.confirm(
            `Are you sure you want to delete the publication ${this.title}`,
            (isConfirmed) => {
                if(isConfirmed == false) { return; }
                this.deletePublication.emit(this.publicationId);
            });
    }

    edit(){
        this.editPublication.emit(this.publicationId);
    }

}
