import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from './shared/recipe.model';
import { RecipeService } from './recipe.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as AppReducer from '../store/app.reducers';
import * as AuthReducer from '../auth/store/auth.reducers';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  bigRecipe: Recipe;

  constructor(
    private recipeService: RecipeService, 
    private authService: AuthService,
    private router: Router,
    private store: Store<AppReducer.AppState>) { }

  ngOnInit() {
    this.recipeService.itemSelected.subscribe(
      (recipe: Recipe) => {
        this.bigRecipe = recipe
      }
    );

    this.store.select('auth')
      .subscribe(
        (authState: AuthReducer.State) => {
          if (!authState.authed) {
            
          }
        }
      )


  }

}
