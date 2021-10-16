import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeDynamicComponent } from './tree-dynamic.component';

describe('TreeDynamicComponent', () => {
  let component: TreeDynamicComponent;
  let fixture: ComponentFixture<TreeDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeDynamicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
