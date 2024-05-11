import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { PoMenuItem, PoPageAction } from '@po-ui/ng-components';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = `DeusMelivery (1.0.0)`;

  constructor (
    public loginService: LoginService,
  ) { }

  public menus: Array<PoMenuItem> = [
    { label: 'Dashboard', link: '/dashboard', icon: "po-icon-chart-area", shortLabel: 'Dash' },
    { label: 'Usuários', link: '/users', icon: "po-icon-users", shortLabel: 'Users' },
    { label: 'Produtos', link: '/products', icon: "po-icon-pushcart", shortLabel: 'Produtos' },
    { label: 'Pedidos', link: '/sales-orders', icon: "po-icon-cart", shortLabel: 'Pedidos' },
  ];

}
