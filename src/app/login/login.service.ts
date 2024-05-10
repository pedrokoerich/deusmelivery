import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public autenticado = false;

  constructor(
    private http: HttpClient, 
    private router: Router
  ) { }


  login(username: string, password: string) {
    return this.http.post<any>(`/api/oauth2/v1/token`,
      {},
      {
        params: {
          grant_type: 'password',
          password: password,
          username: username
        }
      })
  }

}
