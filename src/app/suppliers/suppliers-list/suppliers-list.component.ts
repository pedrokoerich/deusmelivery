import { Component, ViewChild } from '@angular/core';
import { SuppliersService } from '../suppliers.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PoModalComponent, PoTableColumn, PoPageAction, PoTableAction, PoNotificationService } from '@po-ui/ng-components';
import { take, tap, finalize } from 'rxjs';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrl: './suppliers-list.component.css'
})
export class SuppliersListComponent {
  @ViewChild('modalConfirm', { static: true }) modalConfirm: PoModalComponent | undefined;
  
  fields: Array<PoTableColumn> = [
    {
      property: 'status', width: '8%', label: 'Status', type: 'subtitle', subtitles: [
        { value: 'Ativo', color: 'color-11', label: 'Ativo', content: '' },
        { value: 'Inativo', color: 'color-07', label: 'Inativo', content: '' },
      ]
    },
    { property: 'fantasyName', label: 'Nome', type: 'string', width: '25%' },
    { property: 'email', label: 'E-mail', type: 'string', width: '25%' },
    { property: 'phone', label: 'Telefone', type: 'string', format: '(99) 99999-9999', width: '10%' },
    { property: 'cnpj', label: 'CNPJ', type: 'String', format:'99.999.999/9999-99', width: '10%'},
  ];

  public readonly actions: Array<PoPageAction> = [
    { label: 'Novo', icon: 'po-icon-plus', action: () => this.router.navigate(['/suppliers/new']) },
    { label: 'Atualizar', icon: 'po-icon-refresh', action: () => this.getSuppliers() }
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
  public supplierIdToDelete: string = '';

  constructor(
    private suppliersService: SuppliersService,
    private poNotification: PoNotificationService,
    public fb: FormBuilder,
    private router: Router

  ) { }


  ngOnInit() {
    this.getSuppliers();
  }


  getSuppliers(lShowMore = false) {
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
  
    this.suppliersService.get().pipe(
      take(1),
      tap((data: any) => {
        if (lShowMore) {
          this.items.push(...data);
        } else {
          this.items = data;
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
    this.router.navigate(['/suppliers/view/' + item.id])
  }

  editUser(item) {
    this.router.navigate(['/suppliers/edit/' + item.id])
  }

  deleteUser(item) {
    this.supplierIdToDelete = item.id;

    this.modalConfirm.title = 'Exclusão de Usuário'
    this.modalMessage = 'Deseja realmente excluir o usuário ' + item.name + '?'
    this.modalConfirm.open();
  }

  confirmDelete() {
    if (this.supplierIdToDelete) {
      this.modalConfirm.close();
  
      this.suppliersService.deleteSupplier(this.supplierIdToDelete).subscribe(
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

