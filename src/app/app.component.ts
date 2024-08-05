import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { PoMenuItem, PoPageAction, PoToolbarAction, PoToolbarProfile } from '@po-ui/ng-components';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (
    public loginService: LoginService,
    private router : Router
  ) { }

  public isCleanWindow = false;
  public version = environment.version;
  public titleAppCom = `DeusMelivery (${this.version})`

  public menus: Array<PoMenuItem> = [
    { label: 'Dashboard', link: '/dashboard', icon: "po-icon-chart-area", shortLabel: 'Dash' },
    { label: 'Produtos', link: '/products', icon: "po-icon-pushcart", shortLabel: 'Produtos' },
    { label: 'Pedidos', link: '/sales-orders', icon: "po-icon-cart", shortLabel: 'Pedidos' },
    { label: 'Fornecedores', link: '/suppliers', icon: "po-icon-truck", shortLabel: 'Fornecedores' },
    { label: 'Usuários', link: '/users', icon: "po-icon-users", shortLabel: 'Users' },
  ];

  public profile: PoToolbarProfile = {
    subtitle: '',
    title: localStorage.getItem('username')
  };

  public profileactions: Array<PoToolbarAction> = [
      { icon: 'po-icon-edit', label: 'Alterar Senha',  url: './user-password-change'  },

      { icon: 'po-icon-exit', label: 'Sair', type: 'danger', separator: true, action: item => this.logout() }
  ];

  logout() {
    this.loginService.logout();
    this.loginService.autenticado = false;
    this.router.navigate(['/login']);
  }

  getLocalStorage(varName, varDefaultValue, jsonStringfy) {
    if (localStorage.getItem(varName)) {
      if (jsonStringfy) {
        return JSON.parse(localStorage.getItem(varName))
      } else {
        return localStorage.getItem(varName)
      }
    } else {
      return varDefaultValue
    }
  }

  saveLocalStorage(varName, vaValue, jsonStringfy) {
    if (jsonStringfy) {
      localStorage.setItem(varName, JSON.stringify(vaValue))
    } else {
      localStorage.setItem(varName, vaValue)
    }
  }

}
