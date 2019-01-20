import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';

import 'rxjs';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as AppReducers from '../store/app.reducers';
import * as AuthReducer from './store/auth.reducers';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private store: Store<AppReducers.AppState>) { }

  canActivate(
    activatedRoute: ActivatedRouteSnapshot, 
    router: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('auth')
      .pipe(
        map(
          (authState: AuthReducer.State) => {
            return authState.authed
          }
        )
      )
    } 
}
