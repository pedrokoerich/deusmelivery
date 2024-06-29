import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private token = localStorage.getItem('token');
  public readonly headers = { 
    'X-PO-No-Count-Pending-Requests': 'false', 
    'X-PO-Screen-Lock': 'true',
    'X-PO-Ignore-Loading': 'false',
    'X-PO-Request-Intercept': 'true',
    'Authorization': `Bearer ${this.token}`
  };
  public readonly serviceApi = 'api/v1/sales_orders';
  constructor(
    private http:HttpClient
  ) { }

  public getTop5BebidasMaisConsumidas() {
    return this.http.get(`${this.serviceApi}/Top5BebidasMaisConsumidas`, { headers: this.headers })
  }

  public getTop5BairrosMaisConsumidores() {
    return this.http.get(`${this.serviceApi}/Top5BairrosMaisConsumidores`, { headers: this.headers })
  }

  public getVendasNosUltimos12Meses() {
    return this.http.get(`${this.serviceApi}/VendasNosUltimos12Meses`, { headers: this.headers })
  }

  public getVendasNoAno() {
    return this.http.get(`${this.serviceApi}/VendasNoAno`, { headers: this.headers })
  }

  public getVendasNoMes() {
    return this.http.get(`${this.serviceApi}/VendasNoMes`, { headers: this.headers })
  }

  public getTop10ClientesFieis() {
    return this.http.get(`${this.serviceApi}/Top10ClientesFieis`, { headers: this.headers })
  }
}
