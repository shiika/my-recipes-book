import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';

import * as firebase from 'firebase';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyAsIGCrExKqBzSaK2Yx6sU-5aO0oWV0Mus",
      authDomain: "recipe-book-838d9.firebaseapp.com",
    });

    // if (!this.authService.isAuthenticated()) {
    //   this.router.navigate(['signin'])
    // }

    console.log(this.authService.isAuthenticated())

    // console.log(this.authService.isAuthenticated());
  }
}
