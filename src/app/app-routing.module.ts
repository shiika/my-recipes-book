import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { HomeComponent } from "./core/Home/home.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { AuthGuardService } from "./auth/auth-guard.service";

const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: "recipes", loadChildren: "./recipes/recipes.module#RecipesModule" },
    { path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuardService] },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})

export class AppRoutingModule {

}