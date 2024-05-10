import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { PoPageLogin } from '@po-ui/ng-templates';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    public router: Router,
    public loginService: LoginService) {

    // // Caso já estiver logado não precisa enrtar na tela
    // if (this.loginService.isLogged()) {
    //   if (this.globals.menus.length > 0 && this.globals.menus[0].link) {
    //     this.router.navigate([this.globals.menus[0].link]);
    //   } else {
    //     this.globals.logout()
    //   }
    // }
  }

  public async loginSubmit(formData: PoPageLogin) {
    const service$ = this.loginService.login(formData.login, formData.password)
    const value = await lastValueFrom(service$);
    this.router.navigate(['/users']);  }

  // public defineLogin(token) {
  //   localStorage.setItem('ERPTOKEN', token);

  // }
}
