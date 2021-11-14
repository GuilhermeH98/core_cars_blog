import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderBlogCardComponent } from './reader-blog-card.component';

describe('ReaderForumCardComponent', () => {
  let component: ReaderBlogCardComponent;
  let fixture: ComponentFixture<ReaderBlogCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaderBlogCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderBlogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
