import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { SuppliersEditComponent } from './suppliers-edit/suppliers-edit.component';
import { PoButtonModule, PoContainerModule, PoLoadingModule, PoModule, PoPageModule, PoWidgetModule } from '@po-ui/ng-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { HttpClientModule } from '@angular/common/http';
import { SuppliersRoutingModule } from './suppliers-routing.module';


@NgModule({
  declarations: [
    SuppliersListComponent,
    SuppliersEditComponent
  ],
  imports: [
    SuppliersRoutingModule,
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
export class SuppliersModule { }
