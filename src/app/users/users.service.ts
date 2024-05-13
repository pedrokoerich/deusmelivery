import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public readonly headers = { 
    'X-PO-No-Count-Pending-Requests': 'false', 
    'X-PO-Screen-Lock': 'true',
    'X-PO-Ignore-Loading': 'false',
    'X-PO-Request-Intercept': 'true',
  };
  public readonly serviceApi = 'api/v1/users';
  public readonly baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  public get(): Observable<any> {
    const url = `${this.baseUrl}${this.serviceApi}`;
    return this.http.get(url, { headers: this.headers });
  }

  public getUserById(id: string): Observable<any> {
    const url = `${this.baseUrl}${this.serviceApi}/${id}`;
    return this.http.get(url);
  }


  public saveUser(user: any): Observable<HttpResponse<any>> { 

    if (user.id) {
      const url = `${this.baseUrl}${this.serviceApi}/${user.id}`;
      return this.http.put(url, user, { observe: 'response' });
    } else {
      const url = `${this.baseUrl}${this.serviceApi}`;
      return this.http.post(url, user, { observe: 'response' });
    }

  }

  
  public deleteUser(id: string): Observable<HttpResponse<any>> {
    const url = `${this.baseUrl}${this.serviceApi}/${id}`;
    return this.http.delete(url, { observe: 'response' });
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

  getUserDocument(value) {
    const cpfField = { property: 'cpf', visible: true };
    const cnpjField = { property: 'cnpj', visible: true };
    const document = value.isJuridicPerson ? cnpjField : cpfField;

    return {
      fields: [document]
    };
  }

}
