import { Component } from '@angular/core';
import { PoBreadcrumb, PoDynamicFormField } from '@po-ui/ng-components';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.css'
})
export class UsersEditComponent {
    public readonly serviceApi = 'api/v1/users';
  
    public readonly actions = {
      save: '/users', // Endpoint para salvar/editar um usuário
      saveNew: '/users/new' // Endpoint para salvar um novo usuário
    };
  
    public readonly literals = {
      pageActionCancel: 'Cancelar',
      pageActionSave: 'Salvar',
      pageActionSaveNew: 'Salvar e Novo'
    };
  
    public readonly breadcrumb: PoBreadcrumb = {
      items: [
        { label: 'Usuários', link: '/users' }, // Link para a lista de usuários
        { label: 'Editar' }
      ]
    };
  
    public readonly fields: Array<PoDynamicFormField> = [
      { property: 'id', label: 'ID do Usuário', key: true, required: true },
      { property: 'name', label: 'Nome', required: true }
    ];
  }
