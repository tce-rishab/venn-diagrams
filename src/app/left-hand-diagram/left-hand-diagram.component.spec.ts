import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftHandDiagramComponent } from './left-hand-diagram.component';

describe('LeftHandDiagramComponent', () => {
  let component: LeftHandDiagramComponent;
  let fixture: ComponentFixture<LeftHandDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftHandDiagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftHandDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
