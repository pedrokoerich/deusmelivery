import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import {
  PoModalPasswordRecoveryType,
  PoPageBlockedUserReasonParams,
  PoPageLoginCustomField,
  PoPageLoginLiterals,
  PoPageLoginRecovery,
  PoPageLogin,
  PoModalPasswordRecoveryComponent,
  PoModalPasswordRecovery
} from '@po-ui/ng-templates';
import { Subscription, lastValueFrom, take } from 'rxjs';
import { PoModalComponent, PoNotificationService } from '@po-ui/ng-components';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('passwordRecoveryModal', { static: true }) passwordRecoveryModal: PoModalPasswordRecoveryComponent;
  @ViewChild('modalNewUser', { static: true }) modalNewUser: PoModalComponent;
  
  public formLogin: FormGroup = this.createFormLogin();
  attempts = 3;
  exceededAttempts: number;
  literalsI18n: PoPageLoginLiterals;
  loading: boolean = false;
  loginErrors = [];
  passwordErrors = [];
  params: PoPageBlockedUserReasonParams = { attempts: 3, hours: 24 };
  passwordRecovery: PoPageLoginRecovery = {
    url: 'https://po-sample-api.onrender.com/v1/users',
    type: PoModalPasswordRecoveryType.All,
    contactMail: 'support@deusmelivery.com.br'
  };
  showPageBlocked: boolean = false;

  constructor(
    private fb: FormBuilder,
    private LoginService: LoginService,
    private router: Router,
    private globals: AppComponent,
    private PoNotificationService: PoNotificationService
  ) { }

  ngonInit() {
    this.LoginService.logout();
  }
  
  loginSubmit(formData: any) {
    console.log(formData);
    this.LoginService.login(formData).subscribe(
      (response) => {
        this.globals.profile.title = response['username'];
        localStorage.setItem('token', response['token']);
        localStorage.setItem('username', response['username']);
        this.LoginService.autenticado = true;
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.PoNotificationService.error('Erro ao efetuar login: ' + error);
      }
    );
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

  openPasswordRecoveryModal() {
    this.passwordRecoveryModal.open();
  }

  openNewUserModal() {
    this.modalNewUser.open();
  }

  createFormLogin() {
    const formGroupConfig = {
      login: ['', Validators.required],
      password: ['', Validators.required]
    };
  
    const formGroup = this.fb.group(formGroupConfig);
    return formGroup;
  }

  submitRestorPass(event: PoModalPasswordRecovery) {
    this.LoginService.sendMailRecovery(event).pipe(take(1)).subscribe(
      (data: Array<object>) => {
        this.passwordRecoveryModal.completed();
        this.PoNotificationService.success({ message: 'Sua senha foi enviada para ' + event.email });
      });
  }
}

