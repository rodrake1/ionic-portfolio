import { Component, OnInit } from '@angular/core';

import { NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';

import { RecipesService } from '../../services/recipes.service';
import { NewRecipePage } from '../new-recipe/new-recipe';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Recipe } from '../../shared/recipe.model';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})

export class RecipePage implements OnInit {
  recipe: Recipe;
  index: number;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private recipesService: RecipesService,
    private shoppingListService: ShoppingListService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController
  ) { }
  
  onLoadRecipe() {
    this.recipe = this.recipesService.getRecipes()[this.index];
  }

  ngOnInit() {
    this.index = this.navParams.get('recipeIndex');
    this.onLoadRecipe();
  }

  ionViewWillEnter() {
    this.onLoadRecipe();
  }

  onAddToShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
    const toast = this.toastCtrl.create({
      message: 'Ingredientes adicionados com sucesso!',
      duration: 3000
    });
    toast.present();
  }

  onEditRecipe() {
    const modal = this.modalCtrl.create(NewRecipePage, {mode: 'Editar', selectedRecipe: this.recipe, recipeIndex: this.index});
    modal.present();
    modal.onWillDismiss(
      () => this.onLoadRecipe()
    );
  }

  onRemoveRecipe() {
    const alert = this.alertCtrl.create({
      title: 'Remover Receita',
      subTitle: 'Deseja realmente remover esta receita?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        }, {
          text: 'Sim',
          handler: () => {
            this.recipesService.removeRecipe(this.index);
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}
