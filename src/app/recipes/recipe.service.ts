import { Recipe } from './shared/recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from './shared/ingredients.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Injectable()

export class RecipeService {
    constructor(private store: Store<{ ingredients: Ingredient[] }>) {}

    itemSelected: EventEmitter<{}> = new EventEmitter<Recipe>();
    startEditing = new Subject<Recipe[]>();
    

    recipes: Recipe[] = [
        new Recipe(
            'Shakshooka', 
            'Egg merged with Tomatoes', 
            '../../../assets/img/shakshuka-superJumbo-v2.jpg',
            [new Ingredient('Egg', 3),
            new Ingredient('Tomatoes', 5)]),
        new Recipe(
            'Chicken Breasts', 
            'Batates mahroosa m3 fraa5 xD', 
            'https://www.inspiredtaste.net/wp-content/uploads/2011/12/Pan-Roasted-Chicken-Bread-Recipe-3-1200.jpg',
            [new Ingredient('Chicken', 1), new Ingredient('Botatoes', 4)])
    ];

    getTest(id: number) {
        return this.recipes[id];
    }

    getRecipe() {
        return this.recipes.slice(); // We took a copy of this recipes array here therefore we cant access to that array but here
    }

    updateRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.startEditing.next(this.recipes.slice());
    }

    deleteRecipe(id: number) {
        this.recipes.splice(id, 1);
        this.startEditing.next(this.recipes.slice());
    }

    addRecipe(newRecipe: Recipe) {
        this.recipes.push(newRecipe);
        this.startEditing.next(this.recipes.slice())
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.startEditing.next(this.recipes.slice())        
    }
}