import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { PoModule } from '@po-ui/ng-components';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'list', component: ProductsListComponent },
  { path: 'new', component: ProductsEditComponent },
  { path: 'view/:id', component: ProductsEditComponent },
  { path: 'edit/:id', component: ProductsEditComponent }
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

export class ProductsRoutingModule { }