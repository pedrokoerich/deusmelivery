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
  public drinksConsumption: Array<PoChartSerie> = [
    { label: 'Brazil', data: 2796, tooltip: 'Brazil (South America)', color: 'color-10' },
    { label: 'Vietnam', data: 1076, tooltip: 'Vietnam (Asia)' },
    { label: 'Colombia', data: 688, tooltip: 'Colombia (South America)' },
    { label: 'Indonesia', data: 682, tooltip: 'Indonesia (Asia/Oceania)' },
    { label: 'Peru', data: 273, tooltip: 'Peru (South America)' }
  ];

  public readonly columns: Array<PoTableColumn> = [
    { property: 'STATUS', width: '10%', label: 'Status' },
    { property: 'NAME', width: '15%', label: 'Nome', },
    { property: 'GENRE', width: '10%', label: 'Gênero'},
    { property: 'EMAIL', width: '15%', label: 'E-mail'},
    { property: 'PHONE', width: '10%', label: 'Telefone' },
    { property: 'STATE', width: '10%', label: 'Estado' },
    { property: 'CITY', width: '10%', label: 'Cidade' },
    { property: 'ADDRESS', width: '10%', label: 'Endereço'},
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
  options: PoChartOptions = {
    axis: {
      minRange: 0,
      maxRange: 40,
      gridLines: 5
    }
  };
  vendasPorCategoriaDeBebidaType: PoChartType = PoChartType.Line;
  vendasPorCategoriaDeBebida: Array<PoChartSerie> = [
    { label: 'Brazil', data: [35, 32, 25, 29, 33, 33], color: 'color-10' },
    { label: 'Vietnam', data: [15, 17, 23, 19, 22, 18] },
    { label: 'Colombia', data: [8, 7, 6, 9, 10, 11] },
    { label: 'India', data: [5, 6, 5, 4, 5, 5] },
    { label: 'Indonesia', data: [7, 6, 10, 10, 4, 6] }
  ];

  categories: Array<string> = ['2010', '2011', '2012', '2013', '2014', '2015'];

  constructor(
    private dashboardService: DashboardService,
    public router: Router,
    private notification: PoNotificationService
  ) { }

  ngOnInit():void {
    this.getItems()
  }

  public getItems() {

    this.dashboardService.getItems().subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        this.notification.error('Error')
      }
    )
  }
}
