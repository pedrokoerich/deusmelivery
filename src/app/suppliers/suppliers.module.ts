import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { SuppliersEditComponent } from './suppliers-edit/suppliers-edit.component';
import { SuppliersComponent } from './suppliers.component';


@NgModule({
  declarations: [
    SuppliersComponent,
    SuppliersListComponent,
    SuppliersEditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SuppliersModule { }
