import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightHandContainerComponent } from './right-hand-container.component';

describe('RightHandContainerComponent', () => {
  let component: RightHandContainerComponent;
  let fixture: ComponentFixture<RightHandContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightHandContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightHandContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
