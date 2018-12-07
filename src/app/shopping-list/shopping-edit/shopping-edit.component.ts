import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../../recipes/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

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

  constructor(private shoppingList: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingList.startedEditing
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.editedItemIndex = index;
          this.editedItem = this.shoppingList.getIngredient(index);
          this.form.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );

    
  }
  
  onSubmit(form: NgForm) {
    // const ingName = this.itemName.nativeElement.value;
    // const ingAmount = this.itemAmount.nativeElement.value;
    const value = form.value;
    const ing = new Ingredient(value.name, value.amount);
    
    if(this.editMode) {
      this.shoppingList.updateIngredient(this.editedItemIndex, ing);
    } else {
      this.shoppingList.onAddIngredient(ing)
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
    this.shoppingList.deleteIngredient(this.editedItemIndex);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
