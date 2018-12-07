import { Component, OnInit, Input} from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from '../../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() id: number;

  constructor(private recipeService: RecipeService, private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    
  }

  // getRecipe() {
  //   this.recipeService.itemSelected.emit(this.recipe)
  // }

  
  

}
