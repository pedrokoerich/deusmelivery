import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUsersComponent } from './form-users.component';
import { beforeEach, describe, it } from 'node:test';

describe('FormUsersComponent', () => {
  let component: FormUsersComponent;
  let fixture: ComponentFixture<FormUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function expect(component: FormUsersComponent) {
  throw new Error('Function not implemented.');
}

