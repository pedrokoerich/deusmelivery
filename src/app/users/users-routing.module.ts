import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { PoModule } from '@po-ui/ng-components';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: UsersListComponent },
  { path: 'new', component: UsersEditComponent },
  { path: 'view/:id', component: UsersEditComponent },
  { path: 'edit/:id', component: UsersEditComponent }
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

export class UsersRoutingModule { }