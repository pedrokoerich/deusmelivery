import { Component, ViewChild } from '@angular/core';
import { PoModalComponent, PoNotificationService, PoTableAction, PoTableColumn, PoTableComponent } from '@po-ui/ng-components';
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
  @ViewChild('modalConfirm', { static: true }) modalConfirm: PoModalComponent | undefined;
  
  public items: Array<any> = []
  public lShowMore: boolean = false;
  public page: number = 1;
  public total: number = 0;
  public loading: boolean = false;
  public disableNext: boolean = false;
  public detail: any; 
  public modalMessage: string = '';
  public pedidoIdToDelete: number = 0;

  actions: Array<PoTableAction> = [
    { action: this.deleteProduct.bind(this), icon: 'po-icon po-icon-delete', label: 'Excluir' }
  ];

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
    private poNotification: PoNotificationService
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
      tap({
        next: (data: any) => {
          if (lShowMore) {
            this.items.push(...data);
          } else {
            this.items = data;
          }
          this.disableNext = !data.hasNext;
        },
        complete: () => {
          this.loading = false;
        }
      })
    ).subscribe();
  }

  deleteProduct(item) {
    this.pedidoIdToDelete = item.id;

    this.modalConfirm.title = 'Exclusão de Pedido'
    this.modalMessage = 'Deseja realmente excluir o pedido ' + item.id + '?'
    this.modalConfirm.open();
  }

  confirmDelete() {
    if (this.pedidoIdToDelete) {
      this.modalConfirm.close();
  
      this.SalesOrdersService.delete(this.pedidoIdToDelete).subscribe(
        (response) => {
          if (response.status === 200) {
            this.poNotification.success('Pedido excluído com sucesso!');
            this.getItems();
          } else {
            this.poNotification.error('Erro ao excluir o pedido. Código de status:' + response.status);
          }

        },
        (error) => {
          this.poNotification.error('Erro ao chamar o serviço deletePedido:' + error);
        }
      );
    }
  }

}
