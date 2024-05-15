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
  
  loginSubmit() {
    this.LoginService.login(this.formLogin.value).subscribe(
      (response) => {
        this.globals.profile.title = response['username'];
        localStorage.setItem('token', response['token']);
        localStorage.setItem('type', response['usertype']);
        localStorage.setItem('username', response['username']);
        this.LoginService.autenticado = true;
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.PoNotificationService.error('Erro ao efetuar login: ' + error);
      }
    );
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

