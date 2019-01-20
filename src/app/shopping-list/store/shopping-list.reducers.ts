import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from "../../recipes/shared/ingredients.model";

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
};

export const initialState: State = {
    ingredients: [
        new Ingredient('Egg', 3),
        new Ingredient('Tomatoes', 2)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }

        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }

        case ShoppingListActions.UPDATE_INGREDIENT: 
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            };
            const ingredients = [...state.ingredients];
            ingredients[state.editedIngredientIndex] = updatedIngredient;
            
            return {
                ...state,
                ingredients: ingredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            }

        case ShoppingListActions.DELETE_INGREDIENT:
            const ingredients2 = [...state.ingredients];
            ingredients2.splice(state.editedIngredientIndex, 1);
            
            return {
                ...state,
                ingredients: ingredients2,
                editedIngredient: null,
                editedIngredientIndex: -1
            }

        case ShoppingListActions.START_EDIT: 
            const editedIng = state.ingredients[action.payload];
            return {
                ...state,
                editedIngredient: editedIng,
                editedIngredientIndex: action.payload
            }

        case ShoppingListActions.END_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            }

        default: 
            return state
    }
}