import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { SuppliersEditComponent } from './suppliers-edit/suppliers-edit.component';
import { PoButtonModule, PoContainerModule, PoLoadingModule, PoModule, PoPageModule, PoWidgetModule } from '@po-ui/ng-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SuppliersRoutingModule } from './suppliers-routing.module';
import { AuthInterceptor } from '../auth.interceptor';


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
    HttpClientModule,


  ],
})
export class SuppliersModule { }
