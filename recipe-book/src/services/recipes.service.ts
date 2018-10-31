import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';

import { Recipe } from '../shared/recipe.model';
import { AuthService } from './auth.service';

@Injectable()
export class RecipesService {
  private dbAddress = this.authService.getDbAddress();
  private recipes: Recipe[] = [
    {
      title: 'Feijoada',
      description: 'Prato típico brasileiro.',
      difficulty: 'Difícil',
      ingredients: [
        {
          name: 'Feijão',
          amount: 10
        }, {
          name: 'Linguiça',
          amount: 5
        }
      ]
    }, {
      title: 'Hamburguer',
      description: 'Fast food.',
      difficulty: 'Fácil',
      ingredients: [
        {
          name: 'Carne moida',
          amount: 1
        }, {
          name: 'Pão',
          amount: 2
        }
      ]
    }
  ]

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  updateRecipe(recipe: Recipe, index: number) {
    this.recipes[index] = recipe;
  }

  getRecipes() {
    return this.recipes.slice();
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }

  storeRecipes(token: string) {
    const userId = this.authService.getActiveUSer().uid;
    return this.http.put(this.dbAddress + userId + '/recipes.json?auth=' + token, this.recipes);
  }
  
  fetchRecipes(token: string) {
    const userId = this.authService.getActiveUSer().uid;
    return this.http.get(this.dbAddress + userId + '/recipes.json?auth=' + token).do(
      (recipes: Recipe[]) => this.recipes = recipes
    );
  }
}