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


  public saveUser(user: any): Observable<HttpResponse<any>> { // Define o tipo de retorno como HttpResponse<any>
    const url = `${this.baseUrl}${this.serviceApi}`;
    return this.http.post(url, user, { observe: 'response' }); // Adiciona { observe: 'response' } para obter a resposta completa, incluindo o cabeçalho HTTP
  }
  

  public updateUser(user: any): Observable<any> {
    const url = `${this.baseUrl}${this.serviceApi}/${user.id}`;
    return this.http.put(url, user);
  }
  
  public deleteUser(id: string): Observable<any> {
    const url = `${this.baseUrl}${this.serviceApi}/${id}`;
    return this.http.delete(url);
  }
  
}
