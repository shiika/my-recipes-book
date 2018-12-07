import { Component, OnInit} from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.css']
})
export class RecipesDetailsComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private activeRoute: ActivatedRoute,
    private rService: RecipeService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.id = +params["id"];
        this.recipe = this.recipeService.getTest(this.id);
      }
    )
  }

  addToShopping() {
    this.recipeService.onAddToShopping(this.recipe.ingredients)
  }

  removeRecipe() {
    this.rService.deleteRecipe(this.id)
  }

}
