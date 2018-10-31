import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';

import { Ingredient } from '../shared/ingredient.model';
import { AuthService } from './auth.service';

@Injectable()
export class ShoppingListService {
  private dbAddress = this.authService.getDbAddress();
  private ingredients: Ingredient[] = [
    {
      name: 'Leite',
      amount: 5
    }, {
      name: 'Pão',
      amount: 10
    }, {
      name: 'Carne',
      amount: 2
    }
  ];
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addIngredient(name: string, amount: number) {
    let increasedAmount: number;
    const index = this.ingredients.findIndex(
      existentIngredient => {
        increasedAmount = +existentIngredient.amount + +amount;
        return existentIngredient.name === name;
      }
    );
    if (index > -1) {
      this.updateIngredient(name, increasedAmount, index);
    } else {
      this.ingredients.push(new Ingredient(name, amount));
    }
  }

  addIngredients(recipeIngredients: Ingredient[]) {
    recipeIngredients.forEach(
      newIngredient => {
        let increasedAmount: number;
        const index = this.ingredients.findIndex(
          existentIngredient => {
            increasedAmount = +newIngredient.amount + +existentIngredient.amount;
            return existentIngredient.name === newIngredient.name;
          }
        );
        if (index > -1) {
          this.updateIngredient(newIngredient.name, increasedAmount, index);
        } else {
          this.ingredients.push(newIngredient);
        }
      }
    );
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  updateIngredient(name: string, amount: number, index: number) {
    this.ingredients[index] = new Ingredient(name, amount);
  }

  storeShoppingList(token: string) {
    const userId = this.authService.getActiveUSer().uid;
    return this.http.put(this.dbAddress + userId + '/shopping-list.json?auth=' + token, this.ingredients);
  }

  fetchShoppingList(token: string) {
    const userId = this.authService.getActiveUSer().uid;
    return this.http
      .get(this.dbAddress + userId + '/shopping-list.json?auth=' + token)
      .do(
        (data: Ingredient[]) => this.ingredients = data
      );
  }

}