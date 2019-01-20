import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';

import * as AppReducers from "../../store/app.reducers";
import * as AuthActions from "../store/auth.actions";
import * as AuthReducers from "../store/auth.reducers";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild("form") form: NgForm;

  constructor(public authService: AuthService, private store: Store<AppReducers.AppState>) { }

  ngOnInit() {
    this.form.reset();
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signIn(email, password);
    this.store.select('auth').subscribe((authState: AuthReducers.State) => console.log(authState));
  }

}
