import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoDynamicFormField, PoDynamicFormFieldChanged, PoDynamicFormValidation, PoNotificationService } from '@po-ui/ng-components';
import { finalize, take, tap } from 'rxjs';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrl: './form-users.component.css'
})
export class FormUsersComponent {

  fields: Array<PoDynamicFormField> = [
    {
      property: 'id',
      container: 'DADOS PESSOAIS',
      gridColumns: 6,
      gridSmColumns: 12,
      label: 'Cod Usuário',
      visible: false
    },
    {
      property: 'name',
      container: 'DADOS PESSOAIS',
      required: true,
      gridColumns: 6,
      gridSmColumns: 12,
      order: 1,
      placeholder: 'Informe seu nome completo',
      label: 'Nome',
    },
    {
      property: 'birthday',
      label: 'Data de Nascimento',
      type: 'date',
      format: 'mm/dd/yyyy',
      gridColumns: 6,
      gridSmColumns: 12,
      order: -1
    },
    { property: 'cpf', label: 'CPF', mask: '999.999.999-99', gridColumns: 6, gridSmColumns: 12, visible: false },
    { property: 'cnpj', label: 'CNPJ', mask: '99.999.999/9999-99', gridColumns: 6, gridSmColumns: 12, visible: false },
    { property: 'genre', label: 'Gênero', gridColumns: 6, gridSmColumns: 12, options: ['Masc', 'Fem', 'Outro'], order: 2 },
    {
      property: 'secretKey',
      label: 'Senha',
      gridColumns: 6,
      secret: true,
      pattern: '[a-zA]{5}[Z0-9]{3}',
      errorMessage: 'São necessários pelo menos 5 caracteres alfabéticos e 3 numéricos.',
      placeholder: 'Crie sua senha',
    },
    {
      property: 'status',
      label: 'Status',
      gridColumns: 3,
      type: 'boolean',
      booleanTrue: 'Ativo',
      booleanFalse: 'Inativo',
      formatModel: true
    },
    { property: 'email', label:'E-mail',container: 'CONTATOS', gridColumns: 6, icon: 'po-icon-mail' },
    { property: 'phone', label:'Celular', mask: '(99) 99999-9999', gridColumns: 6 },
    { property: 'address', label:'Endereço', gridColumns: 6 },
    {
      property: 'addressNumber',
      label: 'Nº Endereço',
      type: 'number',
      gridColumns: 6,
    },
    {
      property: 'state',
      gridColumns: 6,
      options: [
        { state: 'Santa Catarina', code: 'SC' },
        { state: 'São Paulo', code: 'SP' },
        { state: 'Rio de Janeiro', code: 'RJ' },
        { state: 'Minas Gerais', code: 'MG' }
      ],
      fieldLabel: 'state',
      fieldValue: 'code',
      label: 'Estado',
    },
    { property: 'city', disabled: true, gridColumns: 6, fieldValue: 'code', fieldLabel: 'city', label: 'Cidade', },

  ];

  person = {};
  validateFields: Array<string> = ['state'];
  public title: string = '';
  public VISUALIZAR: boolean = false;
  public userId: string = '';

  loading: boolean = false;

  constructor(
    public poNotification: PoNotificationService,
    private UsersService: UsersService,
    private router: Router,
    private routeActive: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.router.url.includes('view')) {
      this.VISUALIZAR = true;
      this.title = 'Visualização de Usuário';
    }else if (this.router.url.includes('edit')) {
      this.VISUALIZAR = false;
      this.title = 'Edição de Usuário';
    } else {
      this.VISUALIZAR = false;
      this.title = 'Inclusão de Usuário';
    }

    this.userId = this.routeActive.snapshot.paramMap.get('id');
    if (this.userId) {
      // Se o ID existe na URL, chame a função para carregar o usuário
      this.loadUser(this.userId);
    }
  }

  onChangeFields(changedValue: PoDynamicFormFieldChanged): PoDynamicFormValidation {
    return {
      value: { city: undefined },
      fields: [
        {
          property: 'city',
          gridColumns: 6,
          options: this.UsersService.getCity(changedValue.value.state),
          disabled: false
        }
      ]
    };
  }

  onLoadFields(value: any) {
    return this.UsersService.getUserDocument(value);
  }

  public saveUser(): void{
    console.log(this.person)
    this.UsersService.saveUser(this.person).subscribe(
      (response) => {
        if (response.status === 200) {
          this.poNotification.success('Usuário salvo com sucesso!');
        } else {
          this.poNotification.error('Erro ao salvar usuário. Código de status:' + response.status);
        }
      },
      (error) => {
        this.poNotification.error('Erro ao chamar o serviço saveUser:' + error);
      }
    );
    this.router.navigate(['/users']);
  }


  loadUser(userId: string) {
    this.UsersService.getUserById(userId).pipe(
      take(1),
      tap((data: any) => {
          this.person = data;
      }),
      finalize(() => this.loading = false)
    ).subscribe();

  }

}
