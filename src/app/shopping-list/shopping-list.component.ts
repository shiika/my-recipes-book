import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Store} from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as ShoppingListReducers from "./store/shopping-list.reducers";
import * as AppReducer from '../store/app.reducers';

import { map } from 'rxjs/operators';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<ShoppingListReducers.State>;

  shown: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppReducer.AppState>) {}

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList')

    // this.ingredientSubscription = this.shoppingList.ingredientObserv.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );

  }

  onEditItem(index: number) {
    // this.shoppingList.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }
}
