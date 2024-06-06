import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliersComponent } from './suppliers.component'
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { SuppliersEditComponent } from './suppliers-edit/suppliers-edit.component';
import { PoModule } from '@po-ui/ng-components';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: SuppliersComponent },
  { path: 'list', component: SuppliersListComponent },
  { path: 'new', component: SuppliersEditComponent },
  { path: 'view/:id', component: SuppliersEditComponent },
  { path: 'edit/:id', component: SuppliersEditComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    PoModule,
    CommonModule
  ],
  providers: [HttpClient],
  exports: [RouterModule]
})

export class SuppliersRoutingModule { }