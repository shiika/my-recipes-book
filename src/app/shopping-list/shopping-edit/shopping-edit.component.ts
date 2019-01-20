import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../../recipes/shared/ingredients.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../store/shopping-list.actions';
import * as AppReducers from "../../store/app.reducers";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild("itemInputName") itemName;
  // @ViewChild("itemInputAmount") itemAmount;
  @ViewChild('form') form: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private store: Store<AppReducers.AppState>) { }

  ngOnInit() {
    // this.subscription = this.shoppingList.startedEditing
    //   .subscribe(
    //     (index: number) => {
    //       this.editMode = true;
    //       this.editedItemIndex = index;
    //       this.editedItem = this.shoppingList.getIngredient(index);
    //       this.form.setValue({
    //         name: this.editedItem.name,
    //         amount: this.editedItem.amount
    //       })
    //     }
    //   );
    this.subscription = this.store.select('shoppingList').subscribe(
      state => {
        if (state.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = state.editedIngredient;
          this.form.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false
        }
      }
    )
    
  }
  
  onSubmit(form: NgForm) {
    // const ingName = this.itemName.nativeElement.value;
    // const ingAmount = this.itemAmount.nativeElement.value;
    const value = form.value;
    const ing = new Ingredient(value.name, value.amount);
    
    if(this.editMode) {
      // this.shoppingList.updateIngredient(this.editedItemIndex, ing);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(ing))
    } else {
      // this.shoppingList.onAddIngredient(ing)
      this.store.dispatch(new ShoppingListActions.AddIngredient(ing))

    }

    this.editMode = false;
    this.form.reset();

  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    this.form.reset();
    // this.shoppingList.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient())
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.EndEdit());
  }

}
