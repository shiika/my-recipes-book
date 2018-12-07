import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../recipes/shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingredientSubscription: Subscription;

  shown: boolean = true;

  constructor(
    private shoppingList: ShoppingListService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.ingredients = this.shoppingList.getIngredients();

    this.ingredientSubscription = this.shoppingList.ingredientObserv.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['signin']);
    }

  }

  ngOnDestroy() {
    this.ingredientSubscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingList.startedEditing.next(index);
  }
}
