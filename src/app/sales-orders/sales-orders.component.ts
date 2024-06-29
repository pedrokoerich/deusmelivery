import { Component, ViewChild } from '@angular/core';
import { PoModalComponent, PoTableAction, PoTableColumn, PoTableComponent } from '@po-ui/ng-components';
import { take, tap, finalize } from 'rxjs';
import { SalesOrdersService } from '../sales-orders/sales-orders.service';

@Component({
  selector: 'app-sales-orders',
  templateUrl: './sales-orders.component.html',
  styleUrl: './sales-orders.component.css'
})
export class SalesOrdersComponent {
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;
  @ViewChild(PoTableComponent, { static: true }) poTable: PoTableComponent;
  
  public items: Array<any> = []
  public lShowMore: boolean = false;
  public page: number = 1;
  public total: number = 0;
  public loading: boolean = false;
  public disableNext: boolean = false;
  public detail: any; 


  columns: Array<PoTableColumn> = [
    { property: 'id', label: 'Código', width: "120" },
    { property: 'productName', label: 'Produto', width: '200px' },
    { property: 'price', label: 'Valor Un.', width: "150" },
    { property: 'quantity', label: 'Quant.', width: "100" },
    { property: 'totalPrice', label: 'Total',  width: "80" },
    { property: 'supplierName', label: 'Fornec.',  width: "140" },
    { property: 'dataEntrega', label: 'Data Entrega', type:'date', format: 'dd/MM/yyyy',  width: "140" },
    { property: 'horaEntrega', label: 'Hora Entrega',  width: "140" },
    { property: 'userName', label: 'Cliente',  width: "140" }
  ];

  ngOnInit():void {
    this.getItems();
  }

  constructor( 
    private SalesOrdersService: SalesOrdersService,
  ) { }

  public getItems(lShowMore = false) {
    if (lShowMore) {
      this.page++;
    } else {
      this.page = 1;
    }
    let filters = {
      page: this.page
    };
    filters = Object.assign(filters);

    this.loading = true;
  
    this.SalesOrdersService.get().pipe(
      take(1),
      tap((data: any) => {
        if (lShowMore) {
          this.items.push(...data);
        } else {
          this.items = data;
        }
        console.log(this.items)
        this.disableNext = !data.hasNext;
      }),
      finalize(() => this.loading = false)
    ).subscribe();
  }

  

  sumTotal(row: any) {
    if (row.totalPrice) {
      this.total += row.totalPrice;
    }
  }

  decreaseTotal(row: any) {
    if (row.totalPrice) {
      this.total -= row.totalPrice;
    }
  }

  sumAll() {
    this.total = 0;
    this.items.forEach((row) => {
      this.sumTotal(row.totalPrice);
    });
  }

  decreaseAll() {
    this.total = 0;
    this.items.forEach((row) => {
      this.decreaseTotal(row.totalPrice);
    });
  }


  discount(item) {
    if (!item.disableDiscount) {
      const updatedItem = { ...item, value: item.totalPrice - item.totalPrice * 0.2, disableDiscount: true };
      this.poTable.updateItem(item, updatedItem);
    }
  }

  private validateDiscount(item) {
    return item.disableDiscount;
  }

  
  details(item) {
    this.detail = item;
    this.poModal.open();
  }

  remove(item: { [key: string]: any }) {
    this.poTable.removeItem(item);
  }
}
