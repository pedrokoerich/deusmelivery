import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public readonly headers = { 
    'X-PO-No-Count-Pending-Requests': 'false', 
    'X-PO-Screen-Lock': 'true'
  };
  public readonly serviceApi = 'api/v1/users';
  public readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    console.log('Base URL:', this.baseUrl);
  }

  public get(filters: any): Observable<any> {
    const url = `${this.baseUrl}${this.serviceApi}`;
    return this.http.get(url, { headers: this.headers, params: filters });
  }

  public getUserById(id: string): Observable<any> {
    const url = `${this.baseUrl}${this.serviceApi}/${id}`;
    return this.http.get(url);
  }

  public saveUser(user: any): Observable<any> {
    const url = user.id ? `${this.baseUrl}${this.serviceApi}/${user.id}` : `${this.baseUrl}${this.serviceApi}`;
    console.log(user)
    if (user.id) {
      return this.http.put(url, user);
    } else {
      return this.http.post(url, user);
    }
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
