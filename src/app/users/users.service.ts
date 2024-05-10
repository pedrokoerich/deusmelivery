import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  public readonly headers = { 'X-PO-No-Count-Pending-Requests': 'false', 'X-PO-Screen-Lock': 'true' };

  constructor(
    private http: HttpClient,
  ) { }

  public get(filters: any) {
    return this.http.get(`api/v1/users`, { headers: this.headers, params: filters });
  }

}
