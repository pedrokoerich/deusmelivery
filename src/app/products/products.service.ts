import { HttpClient, HttpResponse, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public readonly headers = { 
    'X-PO-No-Count-Pending-Requests': 'false', 
    'X-PO-Screen-Lock': 'true',
    'X-PO-Ignore-Loading': 'false',
    'X-PO-Request-Intercept': 'true',
  };

  public readonly serviceApi = 'api/v1/products';
  public readonly baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  public getIndicadores(): Observable<any> {
    return this.http.get(`${this.serviceApi}/indicadores`, { headers: this.headers });
  }


  public get(filters: any = {}): Observable<any> {
    return this.http.get<any>(`${this.serviceApi}`, { params: filters });
  }

  public saveProduct(product: any): Observable<HttpResponse<any>> { 
    if (product.id) {
      return this.http.put(`${this.serviceApi}/${product.id}`, product, { observe: 'response' });
    } else {
      return this.http.post(this.serviceApi, product, { observe: 'response' });
    }
  }

  public deleteProduct(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.serviceApi}/${id}`, { observe: 'response' });
  }

  public getProductById(id: string): Observable<any> {
    return this.http.get(`${this.serviceApi}/${id}`, { headers: this.headers });
  }
}
