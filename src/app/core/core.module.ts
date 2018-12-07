import { NgModule } from "@angular/core";
import { HomeComponent } from "./Home/home.component";
import { HeaderComponent } from "./header/header.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../recipes/shared/shared.module";
import { AppRoutingModule } from "../app-routing.module";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { RecipeService } from "../recipes/recipe.service";
import { ServerService } from "../server.service";
import { AuthService } from "../auth/auth.service";
import { AuthGuardService } from "../auth/auth-guard.service";

@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AppRoutingModule
    ],
    exports: [
        HeaderComponent,
        AppRoutingModule
    ],
    providers: [ShoppingListService, RecipeService, ServerService, AuthService]
})

export class CoreModule {

}