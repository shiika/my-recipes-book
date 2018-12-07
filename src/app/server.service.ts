import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { RecipeService } from './recipes/recipe.service';
import { Response } from "@angular/http";

import 'rxjs';
import { map, catchError } from "rxjs/operators";
import { Observable, of, throwError } from "rxjs";
import { AuthService } from "./auth/auth.service";

@Injectable()
export class ServerService {

  constructor(
    private http: Http, 
    private recipeSer: RecipeService,
    private authService: AuthService) {}
  
  saveData() {
    return this.http.put("https://recipe-book-838d9.firebaseio.com/data.json", this.recipeSer.getRecipe());
  }

  fetchData() {
    // return this.http.get("https://recipe-book-838d9.firebaseio.com/data.json")
    const token = this.authService.getToken();
    console.log(token);
    return (this.http.get(`https://recipe-book-838d9.firebaseio.com/data.json?auth=${token}`))
              .pipe(
                map(
                  (response: Response) => {
                    const recipes = response.json();
                    for (let recipe of recipes) {
                      if (!recipe.ingredient) {
                        recipe.ingredient = []
                      }
                    }
                    return recipes
                  }
                ),
                catchError(
                  (err: Response) => {
                    return throwError("Something went wrong")
                  }
                )
              )
      
  }
}
