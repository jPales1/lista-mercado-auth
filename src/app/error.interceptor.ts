import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocorreu um erro desconhecido!';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erro: ${error.error.message}`;
        } else {
          switch (error.status) {
            case 0:
              errorMessage = 'Falha de conexão. Verifique sua internet.';
              break;
            case 401:
              errorMessage = 'Sessão expirada. Por favor, faça login novamente.';
              this.auth.loginWithRedirect();
              break;
            case 500:
              errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
              break;
            default:
              errorMessage = `Erro: ${error.status}\nMensagem: ${error.message}`;
              break;
          }
        }
        alert(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}