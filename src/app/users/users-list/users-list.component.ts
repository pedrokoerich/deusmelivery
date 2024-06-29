import { Component, ViewChild } from '@angular/core';
import { PoModalComponent, PoNotificationService, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
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
  @ViewChild('modalConfirm', { static: true }) modalConfirm: PoModalComponent | undefined;
  
  fields: Array<PoTableColumn> = [
    {
      property: 'status', width: '8%', label: 'Status', type: 'subtitle', subtitles: [
        { value: 'A', color: 'color-11', label: 'Ativo', content: '' },
        { value: 'I', color: 'color-07', label: 'Inativo', content: '' },
      ]
    },
    { property: 'name', label: 'Nome', type: 'string', width: '25%' },
    { property: 'login', label: 'E-mail', type: 'string', width: '25%' },
    { property: 'phone', label: 'Celular', type: 'string', format: '(99) 99999-9999', width: '10%' },
    { property: 'birthday', label: 'Nascimento',type: 'date', width: '10%'},
    { property: 'genre', label: 'Gênero', type: 'string', width: '10%'  },
  ];

  public readonly actions: Array<PoPageAction> = [
    { label: 'Novo', icon: 'po-icon-plus', action: () => this.router.navigate(['/users/new']) },
    { label: 'Atualizar', icon: 'po-icon-refresh', action: () => this.getUsers() }
  ];
  
  public actionsTab: Array<PoTableAction> = 
  [
    {
      action: this.viewUser.bind(this),
      icon: 'po-icon po-icon-eye',
      label: 'Visualizar',
    },
    {
      action: this.editUser.bind(this),
      icon: 'po-icon po-icon-edit',
      label: 'Alterar',
      //disabled: this.disabledCancelMedicao.bind(this)
    },
    {
      action: this.deleteUser.bind(this),
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
  public modalMessage: string = '';
  public userIdToDelete: string = '';

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
        // Mapear os valores de genre
        const mappedData = data.map(user => ({
          ...user,
          genre: user.genre === 'M' ? 'Masculino' : user.genre === 'F' ? 'Feminino' : user.genre
        }));

      if (lShowMore) {
        this.items.push(...mappedData);
      } else {
        this.items = mappedData;
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
      name: [''],
      email: [''],
      phone: [''],
      birthday: [''],
      genre: ['']
    };
    const formGroup = this.fb.group(formGroupConfig);
    return formGroup;
  }


  viewUser(item) {
    this.router.navigate(['/users/view/' + item.id])
  }

  editUser(item) {
    this.router.navigate(['/users/edit/' + item.id])
  }

  deleteUser(item) {
    this.userIdToDelete = item.id;

    this.modalConfirm.title = 'Exclusão de Usuário'
    this.modalMessage = 'Deseja realmente excluir o usuário ' + item.name + '?'
    this.modalConfirm.open();
  }

  confirmDelete() {
    if (this.userIdToDelete) {
      this.modalConfirm.close();
  
      this.usersService.deleteUser(this.userIdToDelete).subscribe(
        (response) => {
          console.log(response);
          if (response.status === 200) {
            this.poNotification.success('Usuário excluído com sucesso!');
          } else {
            this.poNotification.error('Erro ao excluir usuário. Código de status:' + response.status);
          }
        },
        (error) => {
          this.poNotification.error('Erro ao chamar o serviço deleteUser:' + error);
        }
      );
    }
  }
  
}
