import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  PoBreadcrumb
} from '@po-ui/ng-components';


@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {
  public title: string = '';
  public userId: string = '';
  public breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Usuários', action: () => this.router.navigate(['users']) },
      { label: '',  },
    ]
  };


  constructor(
    private router: Router,
  ) {}
  
  ngOnInit(): void {
  }

}
