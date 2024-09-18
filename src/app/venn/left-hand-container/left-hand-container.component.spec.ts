import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftHandContainerComponent } from './left-hand-container.component';

describe('LeftHandContainerComponent', () => {
  let component: LeftHandContainerComponent;
  let fixture: ComponentFixture<LeftHandContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftHandContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftHandContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
