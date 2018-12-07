import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import  { Recipe } from '../shared/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  // recipes: Recipe[] = [
  //   new Recipe('Shakshooka', 'Egg merged with Tomatoes', '../../../assets/img/macarons-2548827.jpg'),
  //   new Recipe('Chicken Breasts', 'Batates mahroosa m3 molto xD', 'https://www.inspiredtaste.net/wp-content/uploads/2011/12/Pan-Roasted-Chicken-Bread-Recipe-3-1200.jpg')
  // ];

  recipes: Array<Recipe> = [];
  

  constructor(private recipeService: RecipeService, private rService: RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipe();
    this.rService.startEditing
      .subscribe(
        (recipes) => {
          this.recipes = recipes;
        }
      )
  }

}
