import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { RecipesDetailsComponent } from "./recipes-details/recipes-details.component";
import { RecipesItemComponent } from "./recipes-list/recipes-item/recipes-item.component";
import { RecipesStartComponent } from "./recipes-start/recipes-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "./shared/shared.module";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipesListComponent,
        RecipesDetailsComponent,
        RecipesItemComponent,
        RecipesStartComponent,
        RecipeEditComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule
    ],
    providers: [],
    bootstrap: []
})

export class RecipesModule {

}