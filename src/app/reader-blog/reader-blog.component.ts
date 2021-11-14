import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../core/api/publication.service';
import { Publication } from '../model/Publication';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reader-blog',
  templateUrl: './reader-blog.component.html',
  styleUrls: ['./reader-blog.component.scss']
})
export class ReaderBlogComponent implements OnInit {

    publications: Publication[] = [];

    constructor(
      private publicationService: PublicationService,
      private activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.publications = this.activatedRoute.snapshot.data['publications'];
        this.loadPublicationWithImage();
    }

    loadPublicationWithImage(){
        this.publications
            .forEach(publication => {
                this.getImage(publication.photoKey, (photolink) => {
                    if(photolink){
                        publication.photoLink = photolink;
                    }
                });
            });
    }

  getImage(photKey, callback){
      this.publicationService
          .getImage(photKey)
          .subscribe((response) => {
              const blob = new Blob([response], { type:'image/jpeg' });
              const url = window.URL.createObjectURL(blob);
              callback(url);
          }, (error) => {

        });
  }

}
