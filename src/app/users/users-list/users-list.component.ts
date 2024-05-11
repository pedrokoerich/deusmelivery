import { Component } from '@angular/core';
import { PoNotificationService, PoPageAction, PoTableAction } from '@po-ui/ng-components';
import { UsersService } from '../users.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take, tap } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  fields: Array<any> = [
    { property: 'id', label: 'Cod. Usuário', filter: true, gridColumns: 4 },
    { property: 'name', label: 'Nome', filter: true, gridColumns: 8 },
/*     { property: 'CA_HOR1', label: 'Início', filter: true, gridColumns: 1 },
    { property: 'CA_HOR2', label: 'Fim', filter: true, gridColumns: 1 },
    { property: 'CA_HOR3', label: 'Translado', filter: true, gridColumns: 1 },
    { property: 'CA_HOR4', label: 'Total', filter: true, gridColumns: 1 },
    { property: 'CA_CODPRJ', label: 'Projeto', filter: true, gridColumns: 1 },
    { property: 'CA_TECNICO', label: 'Técnico', filter: true, gridColumns: 1 } */
  ];

  public readonly actions: Array<PoPageAction> = [
    { label: 'Novo', icon: 'po-icon-plus', action: () => this.router.navigate(['/users/new']) },
    { label: 'Atualizar' }
  ];
  
  public actionsTab: Array<PoTableAction> = 
  [
    {
      //action: (this.viewMedicao.bind(this)),
      icon: 'po-icon po-icon-eye',
      label: 'Visualizar',
    },
    {
      //action: this.editMedicao.bind(this),
      icon: 'po-icon po-icon-edit',
      label: 'Alterar',
      //disabled: this.disabledCancelMedicao.bind(this)
    },
    {
      //action: this.deleteMedicao.bind(this),
      icon: 'po-icon po-icon-delete',
      label: 'Excluir',
      //disabled: this.disabledCancelMedicao.bind(this)
    }
  ];

  public items: Array<any> = []
  public lShowMore: boolean = false;
  public page: number = 1;
  public loading: boolean = false;
  public disableNext: boolean = false;
  public reactiveForm: any = this.createReactiveForm();

  constructor(
    private usersService: UsersService,
    private poNotification: PoNotificationService,
    public fb: FormBuilder,
    private router: Router

  ) { }


  ngOnInit() {
    this.getUsers();

  }


  getUsers(lShowMore = false) {

    if (lShowMore) {
      this.page++;
    } else {
      this.page = 1;
    }
    let filters = {
      page: this.page
    };
    filters = Object.assign(filters, this.reactiveForm.value);

    this.loading = true;
  
    this.usersService.get().pipe(
      take(1),
      tap((data: any) => {
        if (lShowMore) {
          this.items.push(...data);
        } else {
          this.items = data;
          console.log("entrou aqui")
        }
        this.disableNext = !data.hasNext;
        console.log(this.items)
      }),
      finalize(() => this.loading = false)
    ).subscribe();
  }


  createReactiveForm() {
    const formGroupConfig = {
      id: [''],
      name: ['']
    };
    const formGroup = this.fb.group(formGroupConfig);
    return formGroup;
  }
}
