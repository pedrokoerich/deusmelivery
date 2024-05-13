import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public autenticado = false;
  public readonly serviceApi = 'api/v1/login';
  public readonly baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient, 
    private router: Router
  ) { }


  login(form: any): Observable<any> {
    const url = `${this.baseUrl}${this.serviceApi}`;
    return this.http.get(url, form);
  }

  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean> | boolean {

    if (this.autenticado) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
