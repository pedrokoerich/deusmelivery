import { HttpClient, HttpResponse } from '@angular/common/http';
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


  public get(): Observable<any> {
    const url = `${this.baseUrl}${this.serviceApi}`;
    return this.http.get(url, { headers: this.headers });
  }

  public saveProduct(product: any): Observable<HttpResponse<any>> { 

    if (product.id) {
      const url = `${this.baseUrl}${this.serviceApi}/${product.id}`;
      return this.http.put(url, product, { observe: 'response' });
    } else {
      const url = `${this.baseUrl}${this.serviceApi}`;
      return this.http.post(url, product, { observe: 'response' });
    }

  }


  public deleteProduct(id: string): Observable<HttpResponse<any>> {
    const url = `${this.baseUrl}${this.serviceApi}/${id}`;
    return this.http.delete(url, { observe: 'response' });
  }

}
