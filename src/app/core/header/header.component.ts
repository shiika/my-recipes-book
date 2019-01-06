import {Component} from '@angular/core';
import { ServerService } from 'src/app/server.service';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Recipe } from 'src/app/recipes/shared/recipe.model';
import { HttpErrorResponse } from '@angular/common/http';
// import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(
    private serverSer: ServerService, 
    private recipeSer: RecipeService,
    public authService: AuthService) {}
  
  onSave() {
    this.serverSer.saveData()
      .subscribe(
        //                      HttpEvents
        // (response: HttpEvent<Object>) => {
        //   console.log(response.type === HttpEventType.Sent);
        //   // Data object we recieve is holding type, this type refers to a specific HttpEvent
        //   // Sent => {
        //   // type: 0
        //   // }
        //   // Response => {
        //   // type: 4
        //   // }
        //   }
        (response) => {
          console.log(response);
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
        (recipes) => {
          this.recipeSer.updateRecipes(recipes);
          console.log(recipes)
        },
        (err: HttpErrorResponse) => console.log(`I think ${err}`)
      )
  }

  onNavigate() {
    this.authService.authed = false;
    console.log(this.authService.authed);
  }
}
