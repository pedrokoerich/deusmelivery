import { ProductsService } from './../products.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoDynamicFormField, PoDynamicFormFieldChanged, PoDynamicFormValidation, PoNotificationService } from '@po-ui/ng-components';
import { finalize, take, tap } from 'rxjs';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrl: './products-edit.component.css'
})
export class ProductsEditComponent {
  public productId: string = '';
  public breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Produtos', action: () => this.router.navigate(['products/list']) },
      { label: '',  },
    ]
  };



  fields: Array<PoDynamicFormField> = [
    {
      property: 'id',
      gridColumns: 6,
      gridSmColumns: 12,
      label: 'Cod Produto',
      visible: false
    },
    {
      property: 'name',
      required: true,
      gridColumns: 6,
      gridSmColumns: 12,
      order: 1,
      placeholder: 'Informe o nome do produto',
      label: 'Produto',
    },
    {
      property: 'category',
      options: [{ category: 'Refrigerantes', value: '01' }, { category: 'Sucos', value: '02' }, { category: 'Cervejas', value: '03' }, { category: 'Energéticos', value: '04' }], 
      fieldLabel: 'category', 
      fieldValue: 'value',
      label: 'Categoria',
      type: 'string',
      gridColumns: 6,
      gridSmColumns: 12,
      order: -1,
      placeholder: 'Informe a categoria do produto',
    },
    {
      property: 'fornec',
      label: 'Fornecedor',
      optionsService: 'https://localhost:8080/api/v1/suppliers/combo',
      fieldLabel: 'name',
      fieldValue: 'id',
      gridColumns: 6,
      gridSmColumns: 12,
      placeholder: 'Informe o fornecedor do produto',
    },
    {
      property: 'productValue',
      type: 'currency',
      gridColumns: 6,
      gridSmColumns: 12,
      decimalsLength: 2,
      thousandMaxlength: 7,
      icon: 'po-icon-finance',
      label: 'Valor do Produto',
      placeholder: 'Informe o valor unitário do produto'
    },
    {
      property: 'quantity',
      label: 'Quantidade em Estoque',
      type: 'number',
      gridColumns: 6,
      placeholder: 'Informe a quantidade em estoque do produto',
    },

  ];

  product = {};
  validateFields: Array<string> = ['state'];
  public title: string = '';
  public VISUALIZAR: boolean = false;
  public userId: string = '';

  loading: boolean = false;

  constructor(
    public poNotification: PoNotificationService,
    private ProductsService: ProductsService,
    private router: Router,
    private routeActive: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.router.url.includes('view')) {
      this.VISUALIZAR = true;
      this.title = 'Visualização de Produto';
    }else if (this.router.url.includes('edit')) {
      this.VISUALIZAR = false;
      this.title = 'Edição de Produto';
    } else {
      this.VISUALIZAR = false;
      this.title = 'Inclusão de Produto';
    }

    this.userId = this.routeActive.snapshot.paramMap.get('id');
    if (this.userId) {
      this.loadProduct(this.userId);
    }
  }



  public saveUser(): void{
    this.ProductsService.saveProduct(this.product).subscribe(
      (response) => {
        if (response.status === 200) {
          this.poNotification.success('Produto cadastrado com sucesso!');
        } else {
          this.poNotification.error('Erro ao salvar o produto. Código de status:' + response.status);
        }
      },
      (error) => {
        this.poNotification.error('Erro ao chamar o serviço saveProduct:' + error);
      }
    );
    this.router.navigate(['/products/list']);
  }


  loadProduct(userId: string) {
    this.ProductsService.getProductById(userId).pipe(
      take(1),
      tap((data: any) => {
          this.product = data;
      }),
      finalize(() => this.loading = false)
    ).subscribe();

  }

}
