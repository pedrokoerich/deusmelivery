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
          { city: 'Palhoça', code: 5 },
          { city: 'Lages', code: 6 },
          { city: 'Balneário Camboriú', code: 7 },
          { city: 'Brusque', code: 8 }
        ];
      }
      case 'SP': {
        return [
          { city: 'São Paulo', code: 9 },
          { city: 'Guarulhos', code: 10 },
          { city: 'Campinas', code: 11 },
          { city: 'São Bernardo do Campo', code: 12 }
        ];
      }
      case 'RJ': {
        return [
          { city: 'Rio de Janeiro', code: 13 },
          { city: 'São Gonçalo', code: 14 },
          { city: 'Duque de Caxias', code: 15 },
          { city: 'Nova Iguaçu', code: 16 }
        ];
      }
      case 'MG': {
        return [
          { city: 'Belo Horizonte', code: 17 },
          { city: 'Uberlândia', code: 18 },
          { city: 'Contagem', code: 19 },
          { city: 'Juiz de Fora', code: 20 }
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
