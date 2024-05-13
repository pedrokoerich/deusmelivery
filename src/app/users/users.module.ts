import { APP_INITIALIZER, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import {  PoModule } from '@po-ui/ng-components';
import { PoPageDynamicEditModule} from '@po-ui/ng-templates';
import { UsersRoutingModule } from './users-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsersListComponent,
  ],
  imports: [
    CommonModule,
    PoPageDynamicEditModule,
    PoModule,
    UsersRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
