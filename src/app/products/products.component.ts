import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  public refrigerantesQTD: number = 0;
  public sucosQTD: number = 0;
  public energeticosQTD: number = 0;
  public cervejasQTD: number = 0;

  constructor(
    private router: Router,
    private ProductsService: ProductsService
  ) { }

  ngOnInit() {
    this.getIndicadores();
  }

  public getIndicadores() {
    this.ProductsService.getIndicadores().subscribe((response) => {
      response.forEach(item => {
        switch (item.category) {
          case '01':
            this.sucosQTD = item.totalQuantity;
            break;
          case '02':
            this.refrigerantesQTD = item.totalQuantity;
            break;
          case '03':
            this.cervejasQTD = item.totalQuantity;
            break;
          case '04':
            this.energeticosQTD = item.totalQuantity;
            break;
          default:
            break;
        }
      });
    });
  }


  goToProducts(param) {
    this.router.navigate(['/products/list/'+param]);
  }

}
