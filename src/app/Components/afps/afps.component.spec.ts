import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfpsComponent } from './afps.component';

describe('AfpsComponent', () => {
  let component: AfpsComponent;
  let fixture: ComponentFixture<AfpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
