import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // We cant edit the original HttpRequest as it is IMMUTABLE, therefore we should clone HttpRequest and configure it with a new configuration
        const clonedReq = req.clone({params: req.params.append('auth', this.authService.getToken())});
        console.log('intercepted!', clonedReq);
        return next.handle(clonedReq)
    }
}