import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserPasswordChangeService {
  public readonly serviceApi = 'api/v1/userchangepassword';
  public readonly baseUrl = environment.apiUrl;

  private headers = { 

    'Content-Type': 'application/json', 
    'X-PO-No-Count-Pending-Requests': 'false', 
    'X-PO-Screen-Lock': 'true' 
  };

  constructor(
    private http: HttpClient
  ) { }

  get(data) {
    const url = `${this.baseUrl}${this.serviceApi}`;
    return this.http.get<any>(url, { headers: this.headers, params:data });
  }
}
