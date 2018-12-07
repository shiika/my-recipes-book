import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthService {
  token: string;
  authed: boolean = true;

  constructor(private router: Router) { }

  signUp(email: string, password: any) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        err => console.log(err)
      )
  }

  signIn(email:string, password: any) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          
          if (response) {
            this.router.navigate(['/']);
            console.log(this.isAuthenticated())
          }

          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            )
        }
      ).catch(
        (err) => {
          console.log(err.message);
        }
      )
  } 

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      )
      .catch(
        (err: Error) => console.log(err.message)
      );

      return this.token
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    this.token = null;
    firebase.auth().signOut();
    this.router.navigate(['signin']);
  }
}
