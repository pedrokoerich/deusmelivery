import { ProductsService } from './../products.service';
import { Component, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoModalComponent, PoNotificationService, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  @ViewChild('modalConfirm', { static: true }) modalConfirm: PoModalComponent | undefined;

  fields: Array<PoTableColumn> = [
    { property: 'name', label: 'Produto', type: 'string', width: '25%' },
    { property: 'category', label: 'Categoria', type: 'string', width: '20%'},
    { property: 'fornecedorName', label: 'Fornecedor', type: 'string', width: '20%' },
    { property: 'quantity', label: 'Quantidade', type: 'number', width: '15%', },
    { property: 'productValue', label: 'Valor', type: 'number', width: '10%'},

  ];

  public breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Produtos', action: () => this.router.navigate(['products']) },
      { label: '',  },
    ]
  };
  
  public readonly actions: Array<PoPageAction> = [
    { label: 'Novo', icon: 'po-icon-plus', action: () => this.router.navigate(['/products/new'])},
    { label: 'Atualizar', icon: 'po-icon-refresh', action: () => this.ngOnInit()}
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
    private router: Router,
    private routeActive: ActivatedRoute

  ) { }

  ngOnInit() {
    this.routeActive.params.subscribe(params => {
      const category = params['category'];
      this.getProducts(false, category);
    });
  }

  getProducts(lShowMore = false, category?: string) {
    if (lShowMore) {
      this.page++;
    } else {
      this.page = 1;
    }
    
    let filters: any = {
      page: this.page,
      categoryFilter: category
    };
    
    filters = Object.assign(filters, this.reactiveForm.value);
    this.loading = true;
  
    this.productsService.get(filters).pipe(
      take(1),
      tap((data: any) => {
        console.log(data);
          const mappedData = data.map(item => {
              return {
                  ...item,
                  category: this.getCategoryLabel(item.category) // Substitua o código pelo rótulo
              };
          });

          if (lShowMore) {
              this.items = [...this.items, ...mappedData]; // Mescla os novos dados com os dados existentes
          } else {
              this.items = mappedData; // Substitui os dados existentes pelos novos dados
          }
          this.disableNext = !data.hasNext;
      }),
      finalize(() => this.loading = false)
  ).subscribe();
  }
  
  getCategoryLabel(category: string): string {
    const categoryMap = {
        '01': 'Sucos',
        '02': 'Refrigerantes',
        '03': 'Cervejas',
        '04': 'Energéticos',
        '05': 'Whisky',
        '06': 'Vodkas',
        '07': 'Cachaças',
        '08': 'Vinhos',
        '09': 'Águas',
        '10': 'Outros'
    };

    return categoryMap[category] || 'Categoria Desconhecida';
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

    this.modalConfirm.title = 'Exclusão de Produto'
    this.modalMessage = 'Deseja realmente excluir o produto ' + item.name + '?'
    this.modalConfirm.open();
  }

  confirmDelete() {
    if (this.productIdToDelete) {
      this.modalConfirm.close();
  
      this.productsService.deleteProduct(this.productIdToDelete).subscribe(
        (response) => {
          if (response.status === 200) {
            this.poNotification.success('Produto excluído com sucesso!');
            this.ngOnInit();
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
