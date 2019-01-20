import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AppReducer from "../store/app.reducers";
import * as AuthReducer from './store/auth.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable()

export class AuthService {
  token: string;
  authed: boolean = true;

  constructor(private router: Router, private store: Store<AppReducer.AppState>) { }

  signUp(email: string, password: any) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        () => {
          this.store.dispatch(new AuthActions.SignUp());
          this.router.navigate(['/']);

          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                this.store.dispatch(new AuthActions.SetToken(token));
              }
            )
        }
      )
      .catch(
        err => console.log(err)
      )
  }

  signIn(email:string, password: any) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {  
          this.store.dispatch(new AuthActions.SignIn())
          this.router.navigate(['/']);

          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                this.store.dispatch(new AuthActions.SetToken(token));
              }
            )
        }
      ).catch(
        (err) => {
          console.log(err.message);
        }
      )
  }

  logout() {
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.LogOut());
  }
}
