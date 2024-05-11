import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import {
  PoModalPasswordRecoveryType,
  PoPageBlockedUserReasonParams,
  PoPageLoginCustomField,
  PoPageLoginLiterals,
  PoPageLoginRecovery,
  PoPageLogin
} from '@po-ui/ng-templates';
import { Subscription, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  attempts = 3;
  loading: boolean = false;
  literalsI18n: PoPageLoginLiterals;
  loginErrors = [];
  passwordErrors = [];
  params: PoPageBlockedUserReasonParams = { attempts: 3, hours: 24 };
  passwordRecovery: PoPageLoginRecovery = {
    url: 'https://po-sample-api.onrender.com/v1/users',
    type: PoModalPasswordRecoveryType.All,
    contactMail: 'support@mail.com'
  };
  showPageBlocked: boolean = false;

  
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
    this.router.navigate(['/users']);  
  }

  checkLogin(formData) {
    this.loading = true;

    /* if (formData.login === 'devpo' && formData.password === '1986') {
      this.passwordErrors = [];
      this.exceededAttempts = 0;
      this.loginErrors = [];

      setTimeout(() => {
        this.poDialog.alert({
          ok: () => (this.loading = false),
          title: 'Access released',
          message: 'You are on vacation, take time to rest.'
        });
      }, 3000);
    } else {
      this.loading = false;
      this.generateAttempts();
      this.passwordErrors = ['Senha e/ou usuário inválido, verifique e tente novamente.'];
      this.loginErrors = ['Senha e/ou usuário inválido, verifique e tente novamente.'];
    } */
  }

  passwordChange() {
    if (this.passwordErrors.length) {
      this.passwordErrors = [];
    }
  }

  loginChange() {
    if (this.loginErrors.length) {
      this.loginErrors = [];
    }
  }

  private generateAttempts() {
    if (this.attempts >= 1) {
      this.attempts--;
      //this.exceededAttempts = this.attempts;
    }
    if (this.attempts === 0) {
      this.showPageBlocked = true;
    }
  }


  // public defineLogin(token) {
  //   localStorage.setItem('ERPTOKEN', token);

  // }
}
