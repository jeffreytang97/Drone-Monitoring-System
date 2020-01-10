import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DroneSearchComponent} from './drone-search.component';

describe('DroneSearchComponent', () => {
  let component: DroneSearchComponent;
  let fixture: ComponentFixture<DroneSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DroneSearchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DroneSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
