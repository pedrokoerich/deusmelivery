import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoDynamicFormField, PoPageEditLiterals } from '@po-ui/ng-components';
import { UsersService } from '../users.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {
  public user: any = {};
  public title: string = '';
  public VISUALIZAR: boolean = false;
  public userFormValues: any = {}; // Objeto para armazenar os valores dos campos do formulário
  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Usuários', link: '/users' },
      { label: 'Editar' }
    ]
  };
  public readonly fields: Array<PoDynamicFormField> = [
    { property: 'id', label: 'ID do Usuário', key: true, required: true },
    { property: 'name', label: 'Nome', required: true }
  ];
  
  public readonly actions = {
    save: this.saveUser.bind(this), // Endpoint para salvar/editar um usuário
  };

  public literals: PoPageEditLiterals = {
    cancel: 'Voltar',
    save: 'Confirmar',
  };
  public reactiveForm!: UntypedFormGroup;
  constructor(
    private routeActive: ActivatedRoute, 
    private router: Router,
    private usersService: UsersService,
    private formBuilder: UntypedFormBuilder,
  ) {}

  ngOnInit(): void {
    this.createReactiveForm();
    if (this.router.url.includes('new')) {
      this.VISUALIZAR = false;
      this.title = 'Inclusão de Usuário';
    }

    const userId = this.routeActive.snapshot.params['id'];
    if (userId) {
      this.loadUser(userId);
    }
  }

  private loadUser(userId: string) {
    this.usersService.getUserById(userId).subscribe(
      user => {
        this.user = user;
        // Define os valores do usuário no formulário
        this.setUserFormValues();
      },
      error => console.error('Erro ao carregar os dados do usuário:', error)
    );
  }

  private setUserFormValues() {
    // Define os valores do usuário no objeto de valores do formulário
    this.fields.forEach(field => {
      if (this.user[field.property] !== undefined) {
        this.userFormValues[field.property] = this.user[field.property];
      }
    });
  }

  public saveUser(): void{
    this.usersService.saveUser(this.reactiveForm.value).pipe(
      tap((response: any) => {
        console.log('Usuário salvo com sucesso:', response);
        // Implemente a navegação conforme necessário
      }),
      catchError((error: any) => {
        console.error('Erro ao salvar o usuário:', error);
        throw error;
      })
    ).subscribe();
  }

  public cancel() {
    this.router.navigate(['/users']);
  
  }

  createReactiveForm() {
    this.reactiveForm = this.formBuilder.group({
      /* id: ['', Validators.required], */
      name: ['', Validators.required],
    });
  }
}
