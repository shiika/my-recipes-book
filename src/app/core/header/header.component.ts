import {Component} from '@angular/core';
import { Response } from "@angular/http";
import { ServerService } from 'src/app/server.service';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Recipe } from 'src/app/recipes/shared/recipe.model';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(
    private serverSer: ServerService, 
    private recipeSer: RecipeService,
    private authService: AuthService) {}
  
  onSave() {
    this.serverSer.saveData()
      .subscribe(
        (response: Response) => {
          console.log(response)
        }
      )
  }

  onLogout() {
    this.authService.logout();
  }

  onFetch() {

    // const checkIng = map(
    //   (response: Response) => {
    //     const recipes = response.json();
    //     for (let recipe of recipes) {
    //       if (!recipe.ingredient) {
    //         recipe.ingredient = []
    //       }
    //     }
    //     return recipes
    //   }
    // );

    this.serverSer.fetchData()
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeSer.updateRecipes(recipes);
          console.log(recipes)
        },
        (err: any) => console.log(`I think ${err}`)
      )
  }

  onNavigate() {
    this.authService.authed = false;
    console.log(this.authService.authed);
  }
}
