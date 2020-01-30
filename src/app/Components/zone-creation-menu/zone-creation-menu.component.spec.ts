import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneCreationMenuComponent } from './zone-creation-menu.component';

describe('ZoneCreationMenuComponent', () => {
  let component: ZoneCreationMenuComponent;
  let fixture: ComponentFixture<ZoneCreationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneCreationMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneCreationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
