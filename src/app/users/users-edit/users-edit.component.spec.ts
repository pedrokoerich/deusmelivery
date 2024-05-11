import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEditComponent } from './users-edit.component';
import { beforeEach, describe, it } from 'node:test';

describe('UsersEditComponent', () => {
  let component: UsersEditComponent;
  let fixture: ComponentFixture<UsersEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function expect(component: UsersEditComponent) {
  throw new Error('Function not implemented.');
}

