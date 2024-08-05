import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { PoPageChangePasswordComponent, PoPageChangePasswordRequirement } from '@po-ui/ng-templates';
import { take } from 'rxjs';
import { LoginService } from '../login/login.service';
import { UserPasswordChangeService } from './user-password-change.service';

@Component({
  selector: 'app-user-password-change',
  templateUrl: './user-password-change.component.html',
  styleUrl: './user-password-change.component.css'
})
export class UserPasswordChangeComponent implements OnInit {
  @ViewChild(PoPageChangePasswordComponent, { static: true }) changePassword: PoPageChangePasswordComponent | undefined;
  constructor(private userPasswordChangeService: UserPasswordChangeService,
              private loginService: LoginService,
              private router: Router,
              private thfNotification: PoNotificationService,
              ) { }

  ngOnInit() {
  }

  alterarSenha(data) {
    this.userPasswordChangeService.get(data).pipe(take(1)).subscribe(
      (data: Array<object>) => {
        this.loginService.logout();
        this.router.navigate(['/']);
        this.thfNotification.success(`Senha alterada com sucesso refaça o login`);
      }
    );
  }




}
