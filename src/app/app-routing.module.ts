import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginService } from './login/login.service';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsComponent } from './products/products.component';
import { SalesOrdersComponent } from './sales-orders/sales-orders.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserPasswordChangeComponent } from './user-password-change/user-password-change.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [LoginService] 
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
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
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
    canActivate: [LoginService] 
  },
  { 
    path: 'sales-orders', 
    component: SalesOrdersComponent, 
    canActivate: [LoginService] ,
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivate: [LoginService] 
  },
  {
    path: 'suppliers',
    loadChildren: () => import('./suppliers/suppliers.module').then(m => m.SuppliersModule),
    canActivate: [LoginService] 
  },
  {
    path: 'user-password-change',
    component: UserPasswordChangeComponent,
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
