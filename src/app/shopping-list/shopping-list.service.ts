import { Ingredient } from "../recipes/shared/ingredients.model";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

export class ShoppingListService {
    // ingredientsChanged: EventEmitter<any> = new EventEmitter<Ingredient[]>(); 
    ingredientObserv = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Egg', 3),
        new Ingredient('Tomatoes', 2)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index]
    }

    onAddIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        // this.ingredientsChanged.emit(this.ingredients.slice())
        this.ingredientObserv.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientObserv.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientObserv.next(this.ingredients.slice());
    }

    addIngredient(ingredients: Ingredient[]) {
        // for(let ing of ingredients) {
        //     this.onAddIngredient(ing)
        // }
        this.ingredients.push(...ingredients);
        this.ingredientObserv.next(this.ingredients.slice());
    }
}