import { APP_INITIALIZER, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { PoButtonModule, PoContainerModule, PoFieldModule, PoLoadingModule, PoModule, PoPageModule, PoTableModule, PoWidgetModule } from '@po-ui/ng-components';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        ProductsComponent,
        PageNotFoundComponent
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
        HttpClientModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'pt' },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }
    
      ],
      bootstrap: [AppComponent]
})
export class AppModule { }
