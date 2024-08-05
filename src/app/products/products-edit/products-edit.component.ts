import { environment } from './../../../environments/environment';
import { SuppliersService } from './../../suppliers/suppliers.service';
import { ProductsService } from './../products.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoDynamicFormField, PoDynamicFormFieldChanged, PoDynamicFormValidation, PoNotificationService } from '@po-ui/ng-components';
import { finalize, take, tap } from 'rxjs';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrl: './products-edit.component.css'
})
export class ProductsEditComponent {
  public readonly baseUrl = environment.apiUrl;

  public serviceSuppliersApi = `${this.baseUrl}api/v1/suppliers/combo`;
  public productId: string = '';
  public form: any = this.createReactiveForm();
  public breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Produtos', action: () => this.router.navigate(['products']) },
      { label: '' }
    ]
  };

  public suppliers: Array<any> = [];
  public options: Array<any> = [
    { value: '01', label: 'Sucos' },
    { value: '02', label: 'Refrigerantes' },
    { value: '03', label: 'Cervejas' },
    { value: '04', label: 'Energéticos' },
    { value: '05', label: 'Whisky' },
    { value: '06', label: 'Vodkas' },
    { value: '07', label: 'Cachaças' },
    { value: '08', label: 'Vinhos' },
    { value: '09', label: 'Águas' },
    { value: '10', label: 'Outros' },
  ];

  product = {};
  validateFields: Array<string> = ['state'];
  public title: string = '';
  public VISUALIZAR: boolean = false;
  public userId: string = '';
  public category: string = '';

  loading: boolean = false;

  constructor(
    public poNotification: PoNotificationService,
    private ProductsService: ProductsService,
    public  SuppliersService: SuppliersService,
    public router: Router,
    private routeActive: ActivatedRoute,
    public fb: FormBuilder,
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

    this.productId = this.routeActive.snapshot.paramMap.get('id');
    if (this.productId) {
      this.loadProduct(this.productId);
    }
  }



  public saveProduct(): void{
    this.ProductsService.saveProduct(this.form.value).subscribe(
      (response) => {
        if (response.status === 200) {
          this.poNotification.success('Produto cadastrado com sucesso!');
        } else {
          this.poNotification.error('Erro ao salvar o produto. Código de status:' + response.status);
        }
      }
    );
    this.router.navigate(['/products']);
  }


  loadProduct(productId: string) {
    this.ProductsService.getProductById(productId).pipe(
      take(1),
      tap((data: any) => {
        this.form.patchValue({
          id: data.id,
          name: data.name,
          category: data.category,
          quantity: data.quantity,
          fornec: data.fornec,
          productValue: data.productValue
        });
        
        this.form.get('fornec').setValue(data.fornec);
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
      fornec: [0]
    };
    const formGroup = this.fb.group(formGroupConfig);
    return formGroup;
  }

  public getSuppliersCombo(dado: any) {
    this.suppliers.length = 0;
    if (dado) {
      this.SuppliersService.getCombo(dado).pipe(take(1)).subscribe(
        (data: any) => {
          this.suppliers = data.items;
        }
      );
    }
  }

}
