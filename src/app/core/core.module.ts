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
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../recipes/shared/auth.interceptor";
import { LoggingInterceptor } from "../recipes/shared/logging.interceptor";

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
    providers: [ShoppingListService, RecipeService, ServerService, AuthService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }]
})

export class CoreModule {

}