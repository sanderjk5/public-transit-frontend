import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeatGraphComponent } from './meat-graph.component';

describe('MeatGraphComponent', () => {
  let component: MeatGraphComponent;
  let fixture: ComponentFixture<MeatGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeatGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeatGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
