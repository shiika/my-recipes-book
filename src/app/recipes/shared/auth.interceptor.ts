import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { Store } from "@ngrx/store";

import { switchMap, take } from 'rxjs/operators';

import * as AppReducer from '../../store/app.reducers';
import * as AuthReducer from '../../auth/store/auth.reducers';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<AppReducer.AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // We cant edit the original HttpRequest as it is IMMUTABLE, therefore we should clone HttpRequest and configure it with a new configuration
        
        return this.store.select('auth')
            .pipe(
                take(1),
                switchMap(
                    (authState: AuthReducer.State) => {
                        const clonedReq = req.clone({params: req.params.append('auth', authState.token)});
                        console.log('intercepted!', clonedReq);
                        return next.handle(clonedReq)
                    }
                )
            )
            
        // return next.handle(clonedReq)
    }
}