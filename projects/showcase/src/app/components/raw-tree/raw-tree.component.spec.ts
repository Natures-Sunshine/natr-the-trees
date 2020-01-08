import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawTreeComponent } from './raw-tree.component';

describe('RawTreeComponent', () => {
  let component: RawTreeComponent;
  let fixture: ComponentFixture<RawTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
