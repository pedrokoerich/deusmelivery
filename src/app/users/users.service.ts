import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private token = localStorage.getItem('token');
  public readonly headers = { 
    'X-PO-No-Count-Pending-Requests': 'false', 
    'X-PO-Screen-Lock': 'true',
    'X-PO-Ignore-Loading': 'false',
    'X-PO-Request-Intercept': 'true',
  };
  public readonly serviceApi = 'api/v1/users';

  constructor(
    private http: HttpClient
  ) {
  }

  public get(): Observable<any> {
    return this.http.get(this.serviceApi, { headers: this.headers });
  }

  public getUserById(id: string): Observable<any> {
    return this.http.get(`${this.serviceApi}/${id}`, { headers: this.headers });
  }


  public saveUser(user: any): Observable<HttpResponse<any>> { 
    console.log(user)
    if (user.id) {
      return this.http.put(`${this.serviceApi}/${user.id}`, user, { observe: 'response', headers: this.headers});
    } else {
      return this.http.post(this.serviceApi, user, { observe: 'response', headers: this.headers});
    }

  }

  
  public deleteUser(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.serviceApi}/${id}`, { observe: 'response', headers: this.headers});
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
