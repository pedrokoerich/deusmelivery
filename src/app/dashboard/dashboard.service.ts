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
  public readonly serviceApi = 'api/v1/dashboard';
  public readonly baseUrl = environment.apiUrl;
  constructor(
    private http:HttpClient
  ) { }

  public getItems() {
    return this.http.get(`${this.baseUrl}${this.serviceApi}`, { headers: this.headers })
  }
}
