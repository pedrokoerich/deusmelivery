import { APP_INITIALIZER, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { PoButtonModule, PoContainerModule, PoFieldModule, PoLoadingModule, PoModule, PoPageModule, PoTableModule, PoWidgetModule } from '@po-ui/ng-components';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { PoPageChangePasswordModule, PoTemplatesModule } from '@po-ui/ng-templates';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { FormUsersComponent } from './shared/form-users/form-users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalesOrdersComponent } from './sales-orders/sales-orders.component';
import { UserPasswordChangeComponent } from './user-password-change/user-password-change.component';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        SalesOrdersComponent,
        PageNotFoundComponent,
        UsersEditComponent,
        FormUsersComponent,
        DashboardComponent,
        UserPasswordChangeComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        PoModule,
        PoLoadingModule,
        FormsModule,
        ReactiveFormsModule,
        PoTemplatesModule,
        PoPageModule,
        RouterModule.forRoot([], {}),
        PoButtonModule,
        PoWidgetModule,
        PoContainerModule,
        HttpClientModule,
        PoPageChangePasswordModule 
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }
    
      ],
      bootstrap: [AppComponent]
})
export class AppModule { }
