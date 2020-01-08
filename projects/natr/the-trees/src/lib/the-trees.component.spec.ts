import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheTreesComponent } from './the-trees.component';

describe('TheTreesComponent', () => {
  let component: TheTreesComponent;
  let fixture: ComponentFixture<TheTreesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheTreesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheTreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
