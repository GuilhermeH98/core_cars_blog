import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderBlogComponent } from './reader-blog.component';

describe('ReaderForumComponent', () => {
  let component: ReaderBlogComponent;
  let fixture: ComponentFixture<ReaderBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaderBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
