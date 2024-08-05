import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { PoChartOptions, PoChartSerie, PoChartType, PoNotificationService, PoTableColumn } from '@po-ui/ng-components';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public isLoading: boolean = true;
  public qtdVendasNoAno: number = 0;
  public qtdVendasNoMes: number = 0;
  public items: Array<any> = []
  public drinksConsumption: Array<PoChartSerie> = [];

  public readonly columns: Array<PoTableColumn> = [
    { property: 'name', width: '15%', label: 'Nome', },
    { property: 'login', width: '15%', label: 'E-mail'},
    { property: 'phone', width: '10%', label: 'Telefone' },
    { property: 'state', width: '10%', label: 'Estado' },
    { property: 'city', width: '10%', label: 'Cidade' },
    { property: 'address', width: '10%', label: 'Endereço'},
    { property: 'address_number', width: '10%', label: 'Nº Endereço'}
  ];

  public neighborhoodConsumption: Array<PoChartSerie> = [
    { label: 'Finland', data: 9.6, tooltip: 'Finland (Europe)' },
    { label: 'Norway', data: 7.2, tooltip: 'Norway (Europe)' },
    { label: 'Netherlands', data: 6.7, tooltip: 'Netherlands (Europe)' },
    { label: 'Slovenia', data: 6.1, tooltip: 'Slovenia (Europe)' },
    { label: 'Austria', data: 5.5, tooltip: 'Austria (Europe)' }
  ];

  neighborhoodConsumingChartType: PoChartType = PoChartType.Donut;
  vendasPorCategoriaDeBebidaType: PoChartType = PoChartType.Line;
  vendasPorCategoriaDeBebida: Array<PoChartSerie> = [];

  categories: Array<string> = ['03/2024', '04/2024', '05/2024', '06/2024', '07/2024', '08/2024', '09/2024', '10/2024', '11/2024', '12/2024', '01/2025', '02/2025'];

  constructor(
    private dashboardService: DashboardService,
    public router: Router,
    private notification: PoNotificationService
  ) { }

  ngOnInit():void {
    this.getTop5BebidasMaisConsumidas();
    this.getTop5EstadosMaisConsumidores();
    //this.getVendasNosUltimos12Meses();
    this.getVendasNoAno();
    this.getVendasNoMes();
    this.getTop10ClientesFieis();
  }

  public getTop5BebidasMaisConsumidas() {
    this.dashboardService.getTop5BebidasMaisConsumidas().subscribe({
      next: (response: Array<any>) => {
        this.drinksConsumption = response.map((item) => {
          return {
            label: item.productName,
            data: item.quantitySold,
            tooltip: `${item.productName}: ${item.quantitySold} vendidos`
          };
        });
      },
      error: (error) => {
        this.notification.error(error.message);
      }
    });
  }
  

  public getTop5EstadosMaisConsumidores() {
    this.dashboardService.getTop5EstadosMaisConsumidores().subscribe({
      next: (response: Array<any>) => {
        this.neighborhoodConsumption = response.map((item, index) => {
          const roundedPercentage = item.percentageSold.toFixed(2);
          return {
            label: item.stateSale,
            data: parseFloat(roundedPercentage), // Garantir que o valor de dados seja um número
            tooltip: `${item.stateSale}: ${roundedPercentage} %`
          };
        });
      },
      error: (error) => {
        this.notification.error(error.message);
      }
    });
  }

  /* public getVendasNosUltimos12Meses() {
    this.dashboardService.getVendasNosUltimos12Meses().subscribe({
      next: (response: Array<any>) => {
        console.log(response)
        this.vendasPorCategoriaDeBebida = response.map((item) => {
          return {
            label: item.category,
            data: item.totalSales,
            tooltip: `${item.month}: ${item.totalSales} vendidos`
          };
        }
        );
 
      },
      error: (error) => {
        this.notification.error(error.message)
      }
    });
  }
 */
  public getVendasNoAno() {
    this.dashboardService.getVendasNoAno().subscribe({
      next: (response: number) => {
        this.qtdVendasNoAno = response;
      },
      error: (error) => {
        this.notification.error(error.message)
      }
    });
  }

  public getVendasNoMes() {
    this.dashboardService.getVendasNoMes().subscribe({
      next: (response: number) => {
        this.qtdVendasNoMes = response;
      },
      error: (error) => {
        this.notification.error(error.message)
      }
    });
  }

  public getTop10ClientesFieis() {
    this.dashboardService.getTop10ClientesFieis().subscribe({
      next: (response: Array<any>) => {
        this.items = response;
      },
      error: (error) => {
        this.notification.error('Error')
      }
    });
  }
}
