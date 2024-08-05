import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoComboOption, PoResponseApi } from '@po-ui/ng-components';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  public readonly headers = { 
    'X-PO-No-Count-Pending-Requests': 'false', 
    'X-PO-Screen-Lock': 'true',
    'X-PO-Ignore-Loading': 'false',
    'X-PO-Request-Intercept': 'true'
  };
  public readonly serviceApi = 'api/v1/suppliers';

  constructor(
    private http: HttpClient
  ) {
  }

  public get(): Observable<any> {
    return this.http.get(this.serviceApi, { headers: this.headers });
  }

  public getCombo(filter: String) {
    return this.http.get(this.serviceApi+'/combo?filter='+filter, { headers: this.headers });
  }

  public getUserById(id: string): Observable<any> {
    return this.http.get(this.serviceApi+`/${id}`, { headers: this.headers });
  }


  public saveSupplier(supplier: any): Observable<HttpResponse<any>> { 

    if (supplier.id) {
      return this.http.put(`${this.serviceApi}/${supplier.id}`, supplier, { observe: 'response', headers: this.headers});
    } else {
      return this.http.post(`${this.serviceApi}`, supplier, { observe: 'response', headers: this.headers});
    }

  }

  public deleteSupplier(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.serviceApi}/${id}`, { observe: 'response', headers: this.headers});
  }

  getFilteredData(param: any, filterParams?: any): Observable<Array<PoComboOption>> {
    const value = param.value;
    const params = { ...filterParams, filter: value };
    return this.http.get<any[]>(`${this.serviceApi}/combo`, { params })
      .pipe(map(response => response.map(item => ({
        label: item.label,
        value: item.value
      }))));
  }
  
  getObjectByValue(value: any, filterParams?: any): Observable<PoComboOption> {
    const params: any = { ...filterParams, filter: value };
    return this.http.get<any[]>(`${this.serviceApi}/combo`, { params })
    .pipe(map(response => response[0]));

  }

  getCity(state: string) {
    switch (state) {
      case 'SC': {
        return [
          { city: 'Palhoça', code: 'Palhoça' },
          { city: 'Lages', code: 'Lages' },
          { city: 'Balneário Camboriú', code: 'Balneário Camboriú' },
          { city: 'Brusque', code: 'Brusque' }
        ];
      }
      case 'SP': {
        return [
          { city: 'São Paulo', code: 'São Paulo' },
          { city: 'Guarulhos', code: 'Guarulhos' },
          { city: 'Campinas', code: 'Campinas' },
          { city: 'São Bernardo do Campo', code: 'São Bernardo do Campo' }
        ];
      }
      case 'RJ': {
        return [
          { city: 'Rio de Janeiro', code: 'Rio de Janeiro' },
          { city: 'São Gonçalo', code: 'São Gonçalo' },
          { city: 'Duque de Caxias', code: 'Duque de Caxias' },
          { city: 'Nova Iguaçu', code: 'Nova Iguaçu' }
        ];
      }
      case 'MG': {
        return [
          { city: 'Belo Horizonte', code: 'Belo Horizonte' },
          { city: 'Uberlândia', code: 'Uberlândia' },
          { city: 'Contagem', code: 'Contagem' },
          { city: 'Juiz de Fora', code: 'Juiz de Fora' }
        ];
      }
    }
    return [];
  }
}
