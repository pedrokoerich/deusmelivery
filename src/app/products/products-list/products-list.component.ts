import { ProductsService } from './../products.service';
import { Component, ViewChild } from '@angular/core';
import { PoModalComponent, PoNotificationService, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take, tap } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  @ViewChild('modalConfirm', { static: true }) modalConfirm: PoModalComponent | undefined;

  fields: Array<PoTableColumn> = [
    { property: 'name', label: 'Produto', type: 'string', width: '25%' },
    { property: 'category', label: 'Categoria', type: 'string', width: '25%'},
    { property: 'fornec', label: 'Fornecedor', type: 'string', width: '10%' },
    { property: 'quantity', label: 'Quantidade', type: 'number', width: '10%', },
    { property: 'productValue', label: 'Valor', type: 'number', width: '10%'},

  ];
  
  public readonly actions: Array<PoPageAction> = [
    { label: 'Novo', icon: 'po-icon-plus', action: () => this.router.navigate(['/products/new'])},
    { label: 'Atualizar', icon: 'po-icon-refresh', action: () => this.getProducts()}
  ];

  public actionsTab: Array<PoTableAction> = [
    {
      action: this.viewProduct.bind(this),
      icon: 'po-icon po-icon-eye',
      label: 'Visualizar',
    },
    {
      action: this.editProduct.bind(this),
      icon: 'po-icon po-icon-edit',
      label: 'Alterar',
      //disabled: this.disabledCancelMedicao.bind(this)
    },
    {
      action: this.deleteProduct.bind(this),
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
  public productIdToDelete: string = '';

  constructor(
    private productsService: ProductsService,
    private poNotification: PoNotificationService,
    public fb: FormBuilder,
    private router: Router

  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(lShowMore = false) {
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
  
    this.productsService.get().pipe(
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
      category: [''],
      quantity: [0],
      productValue: [0],
      fornec: ['']
    };
    const formGroup = this.fb.group(formGroupConfig);
    return formGroup;
  }


  viewProduct(item) {
    this.router.navigate(['/products/view/' + item.id])
  }

  editProduct(item) {
    this.router.navigate(['/products/edit/' + item.id])
  }

  deleteProduct(item) {
    this.productIdToDelete = item.id;

    this.modalConfirm.title = 'Exclusão de Usuário'
    this.modalMessage = 'Deseja realmente excluir o usuário ' + item.name + '?'
    this.modalConfirm.open();
  }

  confirmDelete() {
    if (this.productIdToDelete) {
      this.modalConfirm.close();
  
      this.productsService.deleteProduct(this.productIdToDelete).subscribe(
        (response) => {
          console.log(response);
          if (response.status === 200) {
            this.poNotification.success('Produto excluído com sucesso!');
          } else {
            this.poNotification.error('Erro ao excluir o produto. Código de status:' + response.status);
          }
        },
        (error) => {
          this.poNotification.error('Erro ao chamar o serviço deleteProduct:' + error);
        }
      );
    }
  }
  
}
