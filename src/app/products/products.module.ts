import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { PoButtonModule, PoContainerModule, PoLoadingModule, PoModalModule, PoModule, PoPageModule, PoTableModule, PoWidgetModule } from '@po-ui/ng-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProductsRoutingModule } from './products-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductsEditComponent
  ],
  imports: [
    ProductsRoutingModule,
    PoModule,
    PoLoadingModule,
    FormsModule,
    ReactiveFormsModule,
    PoTemplatesModule,
    PoPageModule,
    PoButtonModule,
    PoWidgetModule,
    PoContainerModule,
    HttpClientModule
  ]
})
export class ProductsModule { }
