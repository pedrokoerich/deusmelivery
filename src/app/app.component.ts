import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { PoMenuItem, PoPageAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'deusmelivery';

  constructor (
    public loginService: LoginService,
  ) { }

  public menus: Array<PoMenuItem> = [
    { label: 'Dashboard', link: '/dashboard', icon: "po-icon-chart-area", shortLabel: 'Dash' },
    { label: 'Usuários', link: '/users', icon: "po-icon-users", shortLabel: 'Users' },
    { label: 'Produtos', link: '/products', icon: "po-icon-pushcart", shortLabel: 'Produtos' },
    { label: 'Pedidos', link: '/sales-orders', icon: "po-icon-cart", shortLabel: 'Pedidos' },
    {
      label: 'Timekeeping',
      icon: 'po-icon-clock',
      shortLabel: 'Timekeeping',
      badge: { value: 1 }
    },
    {
      label: 'Useful links',
      icon: 'po-icon-share',
      shortLabel: 'Links',
      subItems: [
        { label: 'Ministry of Labour', link: 'http://trabalho.gov.br/' },
        { label: 'SindPD Syndicate', link: 'http://www.sindpd.com.br/' }
      ]
    },
    {
      label: 'Benefits',
      icon: 'po-icon-star',
      shortLabel: 'Benefits',
      subItems: [
        {
          label: 'Meal tickets',
          subItems: [
            { label: 'Acceptance network ' },
            {
              label: 'Extracts',
              subItems: [
                { label: 'Monthly', badge: { value: 3, color: 'color-03' } },
                { label: 'Custom' }
              ]
            }
          ]
        },
        { label: 'Transportation tickets',  badge: { value: 12 } }
      ]
    }
  ];

}
