import { Component } from '@angular/core';

import { NavController, ModalController, PopoverController, ToastController, AlertController, LoadingController } from 'ionic-angular';

import { NewRecipePage } from '../new-recipe/new-recipe';
import { Recipe } from '../../shared/recipe.model';
import { RecipesService } from '../../services/recipes.service';
import { RecipePage } from '../recipe/recipe';
import { RecipesOptionsPage } from './recipes-options/recipes-options';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})

export class RecipesPage {
  recipes: Recipe[];

  constructor(
    private navCtrl: NavController,
    private recipesService: RecipesService,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  onLoadRecipes() {
    this.recipes = this.recipesService.getRecipes();
  }

  ionViewWillEnter() {
    this.onLoadRecipes();
  }

  onNewRecipe() {
    const modal = this.modalCtrl.create(NewRecipePage, { mode: 'Nova' });
    modal.present();
    modal.onWillDismiss(
      () => this.onLoadRecipes()
    );
  }

  onTapRecipe(index: number) {
    this.navCtrl.push(RecipePage, { recipeIndex: index });
  }

  onRemoveRecipe(index: number) {
    this.recipesService.removeRecipe(index);
    this.onLoadRecipes();
  }

  onShowOptions(event) {
    const loading = this.loadingCtrl.create({ content: 'Verificando...' });
    const popover = this.popoverCtrl.create(RecipesOptionsPage);
    popover.present({ ev: event });
    popover.onDidDismiss(
      data => {
        if (!data) {
          return;
        } else {
          loading.present();
          if (data.action === 'save') {
            this.authService.getActiveUSer().getIdToken().then(
              (token: string) => {
                this.recipesService.storeRecipes(token).subscribe(
                  () => {
                    loading.dismiss();
                    this.handleSuccess(data.action);
                  },
                  () => {
                    loading.dismiss();
                    this.handleError(data.action);
                  }
                );
              }
            );
          } else if (data.action === 'load') {
            this.authService.getActiveUSer().getIdToken().then(
              (token: string) => {
                this.recipesService.fetchRecipes(token).subscribe(
                  (recipes: Recipe[]) => {
                    if (!recipes) {
                      const alert = this.alertCtrl.create({
                        title: 'Receitas inexistentes!',
                        subTitle: 'Não há receitas a serem carregadas.',
                        buttons: ['Ok']
                      });
                      loading.dismiss();
                      alert.present();
                    } else {
                      loading.dismiss();
                      this.onLoadRecipes();
                      this.handleSuccess(data.action);
                    }
                  },
                  () => {
                    loading.dismiss();
                    this.handleError(data.action);
                  }
                );
              }
            );
          }
        }
      }
    );
  }

  handleSuccess(action: string) {
    const toast = this.toastCtrl.create({
      message: action === 'save' ? 'Receitas salvas com sucesso!' : 'Receitas carregadas com sucesso!',
      duration: 3000
    });
    toast.present();
  }

  handleError(option: string) {
    const alert = this.alertCtrl.create({
      title: 'Erro!',
      subTitle: option === 'load' ? 'Não foi possível carregar as receitas.' : 'Não foi possível salvar as receitas.',
      buttons: ['Ok']
    });
    alert.present();
  }

}