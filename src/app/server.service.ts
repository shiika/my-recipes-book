import { HttpClient, HttpParams, HttpRequest, HttpResponse, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from './recipes/recipe.service';
import { Response } from "@angular/http";

import 'rxjs';
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { AuthService } from "./auth/auth.service";
import { Recipe } from "./recipes/shared/recipe.model";

@Injectable()
export class ServerService {

  constructor(
    private http: HttpClient, 
    private recipeSer: RecipeService,
    private authService: AuthService) {}
  
  saveData() {
    // const token = this.authService.getToken(); commented out to use interceptor
    // return this.http.put(`https://recipe-book-838d9.firebaseio.com/data.json`,
    // this.recipeSer.getRecipe(), {
    //   observe: 'body',
    //   params: new HttpParams().set('auth', token) // Configure our params via params proberty by defining a new HttpParams()
    // });

    //                             Creating a native new HttpRequest
    const req = new HttpRequest('PUT', 'https://recipe-book-838d9.firebaseio.com/data.json', this.recipeSer.getRecipe(), {
      reportProgress: true
      // params: new HttpParams().set('auth', token)
    }); // thus far we only created the request not sending it to server (not returning it)

    return this.http.request(req);
  }

  fetchData() {
    // const token = this.authService.getToken();
    // const headers = new HttpHeaders().set('Authorization', 'Beaerer snoaovowqvsdkfiw');
    // HttpClient by default extracts response into json, so we can directly manipulate with body data(Json data)
    // Defining response type by adding a generic to get method
    // Also we can observe specific form of data wheather it is full response or body data, and wheather this body data is text, json, etc.
    return (this.http.get<Recipe[]>(`https://recipe-book-838d9.firebaseio.com/data.json`, {
      observe: 'body',
      responseType: 'json'
      // headers: headers
    }))
              .pipe(
                map(
                  (recipes) => {
                    for (let recipe of recipes) {
                      if (!recipe.ingredients) {
                        recipe.ingredients = []
                      }
                    }
                    return recipes
                  }
                ),
                catchError(
                  (err: HttpErrorResponse) => {
                    console.log(err);
                    return throwError("Something wrong happened")
                  }
                )
              )
      
  }
}
