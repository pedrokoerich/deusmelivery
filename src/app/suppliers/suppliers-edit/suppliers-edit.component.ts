import { Router, ActivatedRoute } from '@angular/router';
import { PoDynamicFormField, PoNotificationService, PoDynamicFormFieldChanged, PoDynamicFormValidation, PoBreadcrumb } from '@po-ui/ng-components';
import { take, tap, finalize } from 'rxjs';
import { SuppliersService } from './../suppliers.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-suppliers-edit',
  templateUrl: './suppliers-edit.component.html',
  styleUrl: './suppliers-edit.component.css'
})
export class SuppliersEditComponent {
  public breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Fornecedores', action: () => this.router.navigate(['suppliers']) },
      { label: '',  },
    ]
  };

  fields: Array<PoDynamicFormField> = [
    { property: 'id', container: 'DADOS CADASTRAIS', gridColumns: 6, gridSmColumns: 12, label: 'Cod Usuário', visible: false },
    { property: 'name', container: 'DADOS CADASTRAIS', required: true, gridColumns: 6, gridSmColumns: 12, order: 1, placeholder: 'Informe o nome do fornecedor', label: 'Nome' },
    { property: 'fantasyName',  required: false, gridColumns: 6, gridSmColumns: 12, order: 1, placeholder: 'Nome Fantasia', label: 'Nome Fantasia' },
    { property: 'cnpj', label: 'CNPJ', mask: '99.999.999/9999-99', gridColumns: 6, gridSmColumns: 12 },
    { property: 'status', label: 'Status', gridColumns: 3, type: 'boolean', booleanTrue: 'Ativo', booleanFalse: 'Inativo', formatModel: true },
    { property: 'email', label: 'E-mail', container: 'CONTATOS', gridColumns: 6, icon: 'po-icon-mail', pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$", errorMessage: 'E-mail inválido' },
    { property: "phone", label: "Telefone", mask: "(99) 99999-9999", gridColumns: 6 },
    { property: 'address', label: 'Endereço', gridColumns: 6 },
    { property: 'addressNumber', label: 'Nº Endereço', type: 'number', gridColumns: 6 },
    { property: 'state', gridColumns: 6, options: [{ state: 'Santa Catarina', code: 'SC' }, { state: 'São Paulo', code: 'SP' }, { state: 'Rio de Janeiro', code: 'RJ' }, { state: 'Minas Gerais', code: 'MG' }], fieldLabel: 'state', fieldValue: 'code', label: 'Estado' },
    { property: 'city', disabled: true, gridColumns: 6, fieldValue: 'code', fieldLabel: 'city', label: 'Cidade' }
  ];

  supplier = {};
  validateFields: Array<string> = ['state'];
  public title: string = '';
  public VISUALIZAR: boolean = false;
  public supplierId: string = '';
  loading: boolean = false;

  constructor(
    public poNotification: PoNotificationService,
    private supplierService: SuppliersService,
    private router: Router,
    private routeActive: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.router.url.includes('view')) {
      this.VISUALIZAR = true;
      this.title = 'Visualização de Fornecedor';
      this.disableFields();
    } else if (this.router.url.includes('edit')) {
      this.VISUALIZAR = false;
      this.title = 'Edição de Fornecedor';
      this.disablePasswordAndCpf();
    } else {
      this.VISUALIZAR = false;
      this.title = 'Inclusão de Fornecedor';
      this.supplier = {
        status: 'Ativo'
      };
    }

    this.supplierId = this.routeActive.snapshot.paramMap.get('id');
    if (this.supplierId) {
      // Se o ID existe na URL, chame a função para carregar o usuário
      this.loadSupplier(this.supplierId);
    }
  }

  disableFields() {
    this.fields = this.fields.map(field => {
      field.disabled = true;
      return field;
    });
  }

  disablePasswordAndCpf() {
    this.fields = this.fields.map(field => {
      if (field.property === 'password' || field.property === 'cpf') {
        field.disabled = true;
      }
      return field;
    });
  }


  onChangeFields(changedValue: PoDynamicFormFieldChanged): PoDynamicFormValidation {
    return {
      value: { city: undefined },
      fields: [
        {
          property: 'city',
          gridColumns: 6,
          options: this.supplierService.getCity(changedValue.value.state),
          disabled: false
        }
      ]
    };
  }

  public saveSupplier(): void {
    console.log(this.supplierId);
    this.supplierService.saveSupplier(this.supplier).subscribe(
      (response) => {
        if (response.status === 200) {
          this.poNotification.success('Fornecedor salvo com sucesso!');
        } else {
          this.poNotification.error('Erro ao salvar fornecedor. Código de status:' + response.status);
        }
      },
      (error) => {
        this.poNotification.error('Erro ao chamar o serviço saveSupplier:' + error);
      }
    );
    this.router.navigate(['/suppliers']);
  }

  loadSupplier(supplierId: string) {
    this.supplierService.getUserById(supplierId).pipe(
      take(1),
      tap((data: any) => {
        console.log(data)
        this.supplier = data;
      }),
      finalize(() => this.loading = false)
    ).subscribe();
  }
}
