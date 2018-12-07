import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from './shared/recipe.model';
import { RecipeService } from './recipe.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  bigRecipe: Recipe;
  @Input() loadedFeature: string;
  

  constructor(
    private recipeService: RecipeService, 
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.recipeService.itemSelected.subscribe(
      (recipe: Recipe) => {
        this.bigRecipe = recipe
      }
    );

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['signin'])
    }

  }

}
