// src/app/auth.interceptor.ts

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const baseUrl = 'http://localhost:8080';
    const token = localStorage.getItem('token');

    // Verifica se a URL é relativa
    if (req.url.startsWith('api/')) {
      let headers = req.headers;

      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }

      // Clona a requisição e ajusta os cabeçalhos e a URL
      const cloned = req.clone({
        url: `${baseUrl}/${req.url}`, // Ajusta a URL para incluir o baseUrl
        headers: headers
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
