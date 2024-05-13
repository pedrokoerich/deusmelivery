import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb } from '@po-ui/ng-components';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrl: './products-edit.component.css'
})
export class ProductsEditComponent {
  public title: string = '';
  public productId: string = '';
  public breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Produtos', action: () => this.router.navigate(['products']) },
      { label: '',  },
    ]
  };


  constructor(
    private router: Router,
  ) {}
  
  ngOnInit(): void {
  }
}
