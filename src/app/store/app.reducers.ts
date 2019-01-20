import { ActionReducerMap } from "@ngrx/store";
import * as ShoppingListReducer from "../shopping-list/store/shopping-list.reducers";
import * as AuthReducer from "../auth/store/auth.reducers";

export interface AppState {
    shoppingList: ShoppingListReducer.State,
    auth: AuthReducer.State
}

export const AppReducers: ActionReducerMap<AppState> = {
    shoppingList: ShoppingListReducer.shoppingListReducer,
    auth: AuthReducer.authReducer
}

