import { Component, ViewChild } from '@angular/core';
import { PoModalComponent, PoTableAction, PoTableComponent } from '@po-ui/ng-components';
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


  columns = [
    { property: 'id', label: 'Código', align: 'right', readonly: true, freeze: true, width: "120" },
    { property: 'produto', label: 'Produto', width: '200px', required: true },
    { property: 'valorUnitario', label: 'Valor Un.', width: "150" },
    { property: 'quantidade', label: 'Quant.', width: "100", required: true },
    { property: 'valorTotal', label: 'Total', align: 'center', width: "80" },
    { property: 'fornecedor', label: 'Fornec.', align: 'center', width: "140" },
    { property: 'dataEntrega', label: 'Data Entrega', type:'date', format: 'dd/MM/yyyy', align: 'center', width: "140" },
    { property: 'horaEntrega', label: 'Hora Entrega', align: 'center', width: "140" },
    { property: 'cliente', label: 'Cliente', align: 'center', width: "140" }
  ];

  ngonInit() {
    this.getItems();
  }

  constructor( 
    private SalesOrdersService: SalesOrdersService,
  ) { }

  getItems(lShowMore = false) {
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
        console.log(this.items)
      }),
      finalize(() => this.loading = false)
    ).subscribe();
  }

  

  sumTotal(row: any) {
    if (row.value) {
      this.total += row.value;
    }
  }

  decreaseTotal(row: any) {
    if (row.value) {
      this.total -= row.value;
    }
  }


  discount(item) {
    if (!item.disableDiscount) {
      const updatedItem = { ...item, value: item.value - item.value * 0.2, disableDiscount: true };
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
