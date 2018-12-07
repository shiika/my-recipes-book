import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { AuthGuardService } from "../auth/auth-guard.service";
import { RecipesStartComponent } from "./recipes-start/recipes-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesDetailsComponent } from "./recipes-details/recipes-details.component";

const recipesRoutes: Routes = [
    { 
        path: "", 
        component: RecipesComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: "", component: RecipesStartComponent, canActivate: [AuthGuardService]},
            { path: "new", component: RecipeEditComponent},
            { path: ":id", component: RecipesDetailsComponent, canActivate: [AuthGuardService]},
            { path: ":id/edit", component: RecipeEditComponent}
    ]}
];

@NgModule({
    imports: [
        RouterModule.forChild(recipesRoutes)
    ],
    exports: [RouterModule],
    providers: [AuthGuardService]
})

export class RecipesRoutingModule {}