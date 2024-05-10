import { async, TestBed } from '@angular/core/testing';
import { PoMenuModule, PoPageModule, PoToolbarModule } from '@po-ui/ng-components';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PoMenuModule,
        PoPageModule,
        PoToolbarModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  });

});