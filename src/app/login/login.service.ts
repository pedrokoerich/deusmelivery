import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public readonly headers = {
    'Content-Type': 'application/json',
    'X-PO-No-Count-Pending-Requests': 'false', 
    'X-PO-Screen-Lock': 'true' 
  };

  public autenticado = false;
  public readonly serviceApi = 'api/v1/auth/login';
  public readonly baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient, 
    private router: Router
  ) { }


  login(form: any): Observable<HttpResponse<any>> {
    const url = `${this.baseUrl}${this.serviceApi}`;
    return this.http.post(url, form,{ observe: 'response' });
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

  sendMailRecovery(data) {
    const url = `${this.baseUrl}`+`api/v1/recoverypass`;
    return this.http.post(url, data, { headers: this.headers })
  }

  logout() {
    localStorage.removeItem('type');
    localStorage.removeItem('token');
  }

  public isLogged() {
    return localStorage.getItem('token');
  }

}
