import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JabasComponent } from './jabas.component';

describe('JabasComponent', () => {
  let component: JabasComponent;
  let fixture: ComponentFixture<JabasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JabasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JabasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
