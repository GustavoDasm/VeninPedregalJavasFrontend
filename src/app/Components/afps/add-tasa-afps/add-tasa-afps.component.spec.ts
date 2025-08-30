import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTasaAfpsComponent } from './add-tasa-afps.component';

describe('AddTasaAfpsComponent', () => {
  let component: AddTasaAfpsComponent;
  let fixture: ComponentFixture<AddTasaAfpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTasaAfpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTasaAfpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
