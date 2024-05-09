import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginService } from './login/login.service';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsComponent } from './products/products.component';
import { SalesOrdersComponent } from './sales-orders/sales-orders.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  },
  { 
    path: 'products', 
    component: ProductsComponent, 
    canActivate: [LoginService] 
  },
  { 
    path: 'sales-orders', 
    component: SalesOrdersComponent, 
    canActivate: [LoginService] 
  },
  { 
    path: 'users', 
    component: UsersComponent, 
    canActivate: [LoginService] 
  },
  { 
    path: '**', 
    component: PageNotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
