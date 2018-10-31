import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActionSheetController, AlertController, ToastController, PopoverController, LoadingController } from 'ionic-angular';

import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListOptionsPage } from './shopping-list-options/shopping-list-options';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})

export class ShoppingListPage {
  ingredient: Ingredient;
  ingredientIndex: number;
  ingredients: Ingredient[];
  @ViewChild('form') shoppingListForm: NgForm;

  constructor(
    private shoppingistService: ShoppingListService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private loadingCtrl: LoadingController
  ) { }

  onLoadIngredients() {
    this.ingredients = this.shoppingistService.getIngredients();
  }

  ionViewWillEnter() {
    this.onLoadIngredients();
  }

  onAddIngredient(form: NgForm) {
    this.shoppingistService.addIngredient(form.value.ingredientName, form.value.amount);
    form.reset();
    this.onLoadIngredients();
  }

  onEditIngredient() {
    const alert = this.alertCtrl.create({
      title: 'Editar Ingrediente',
      inputs: [
        {
          type: 'text',
          name: 'name',
          placeholder: 'Nome',
          value: this.ingredient.name
        }, {
          type: 'number',
          name: 'amount',
          placeholder: 'Quantidade',
          value: this.ingredient.amount.toString()
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Atualizar',
          handler: data => {
            if (data.name.trim() === '' || data.amount.toString().trim() === '' || data.name === null || data.amount === null || isNaN(data.amount)) {
              const toast = this.toastCtrl.create({
                message: 'Favor utilizar valores válidos',
                showCloseButton: true,
                closeButtonText: 'X'
              });
              toast.present();
              return;
            }
            this.shoppingistService.updateIngredient(data.name, data.amount, this.ingredientIndex);
            this.onLoadIngredients();
          }
        }
      ]
    });
    alert.present();
  }

  onRemoveIngredient() {
    this.shoppingistService.removeIngredient(this.ingredientIndex);
    this.onLoadIngredients();
  }

  onTapItem(ingredient: Ingredient, index: number) {
    this.ingredient = ingredient;
    this.ingredientIndex = index;
    const actionSheet = this.actionSheetCtrl.create({
      title: ingredient.name,
      buttons: [
        {
          text: 'Editar',
          handler: () => {
            this.onEditIngredient();
          }
        }, {
          text: 'Remover',
          role: 'destructive',
          handler: () => {
            this.onRemoveIngredient();
          }
        }, {
          text: 'Cancelar',
          role: 'cancel',
        }
      ]
    });
    actionSheet.present();
  }

  onShowOptions(event) {
    const loading = this.loadingCtrl.create({ content: 'Verificando...' });
    const popover = this.popoverCtrl.create(ShoppingListOptionsPage);
    popover.present({ ev: event });
    popover.onDidDismiss(
      data => {
        if (!data) {
          return;
        } else {
          loading.present();
          if (data.action === 'load') {
            this.authService.getActiveUSer().getIdToken().then(
              (token: string) => {
                this.shoppingistService.fetchShoppingList(token).subscribe(
                  (ingredients: Ingredient[]) => {
                    loading.dismiss();
                    if (!ingredients) {
                      const alert = this.alertCtrl.create({
                        title: 'Lista inexistente!',
                        subTitle: 'Não há lista a ser carregada.',
                        buttons: ['Ok']
                      });
                      alert.present();
                    } else {
                      const toast = this.toastCtrl.create({
                        message: 'Lista carregada com sucesso!',
                        duration: 3000
                      });
                      toast.present();
                      this.ingredients = ingredients;
                    }
                  },
                  () => {
                    loading.dismiss();
                    this.handleError('load');
                  }
                );
              }
            );
          } else if (data.action === 'save') {
            this.authService.getActiveUSer().getIdToken().then(
              (token: string) => {
                this.shoppingistService.storeShoppingList(token).subscribe(
                  () => {
                    loading.dismiss();
                    const toast = this.toastCtrl.create({
                      message: 'Lista salva com sucesso!',
                      duration: 3000
                    });
                    toast.present();
                  },
                  () => {
                    loading.dismiss();
                    this.handleError('save');
                  }
                );
              }
            );
          }
        }
      }
    );
  }

  handleError(option: string) {
    const alert = this.alertCtrl.create({
      title: 'Erro!',
      subTitle: option === 'load' ? 'Não foi possível carregar a lista.' : 'Não foi possível salvar a lista.',
      buttons: ['Ok']
    });
    alert.present();
  }

}