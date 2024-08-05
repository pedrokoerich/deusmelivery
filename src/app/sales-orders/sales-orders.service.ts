import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesOrdersService {
  public readonly headers = { 
    'X-PO-No-Count-Pending-Requests': 'false', 
    'X-PO-Screen-Lock': 'true',
    'X-PO-Ignore-Loading': 'false',
    'X-PO-Request-Intercept': 'true',
  };
  public readonly serviceApi = 'api/v1/sales_orders';

  constructor(
    private http: HttpClient
  ) {
  }

  public get(): Observable<any> {
    return this.http.get(this.serviceApi, { headers: this.headers });
  }

  public delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.serviceApi}/${id}`, { observe: 'response' });
  }
}
