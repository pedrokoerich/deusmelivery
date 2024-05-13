import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginService } from './login/login.service';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsComponent } from './products/products.component';
import { SalesOrdersComponent } from './sales-orders/sales-orders.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LoginService] 
  },
  {
    path: 'dashboard',
    component: LoginComponent,
    canActivate: [LoginService] 
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
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
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    /* canActivate: [LoginService] */ 
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
