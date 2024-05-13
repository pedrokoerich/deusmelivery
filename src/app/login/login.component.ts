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
  PoModalPasswordRecoveryComponent
} from '@po-ui/ng-templates';
import { Subscription, lastValueFrom } from 'rxjs';
import { PoModalComponent } from '@po-ui/ng-components';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

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
    private router: Router
  ) { }

  ngonInit() {
    
  }
  loginSubmit() {
/*     this.LoginService.login(this.formLogin.value).subscribe(
      (response) => { */
        this.LoginService.autenticado = true;
        this.router.navigate(['/users']);
/*       },
      (error) => {
        console.error('Erro ao efetuar login', error);
      }
    ); */
  }

  // Função para abrir o modal de recuperação de senha
  openPasswordRecoveryModal() {
    this.passwordRecoveryModal.open();
  }

  // Função para abrir o modal de registro de novo usuário
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
}

