import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { NavParams, AlertController, ToastController, ViewController } from 'ionic-angular';

import { RecipesService } from '../../services/recipes.service';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'page-new-recipe',
  templateUrl: 'new-recipe.html',
})

export class NewRecipePage implements OnInit {
  mode: string = 'Nova';
  selectOptions = ['Fácil', 'Intermediária', 'Difícil'];
  recipeForm: FormGroup;

  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private recipesService: RecipesService,
    private viewCtrl: ViewController
  ) { }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  setIngredientControls(ingredients: Ingredient[]) {
    const controlsArray = [];
    ingredients.forEach(
      (ingredient) => {
        controlsArray.push(
          new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, Validators.required)
          })
        );
      }
    );
    return controlsArray;
  }

  initializeForm() {
    let title = null;
    let description = null;
    let difficulty = 'Fácil';
    let ingredients = [];
    if (this.mode === 'Editar') {
      const selectedRecipe = this.navParams.get('selectedRecipe');
      title = selectedRecipe.title;
      description = selectedRecipe.description;
      difficulty = selectedRecipe.difficulty;
      ingredients = this.setIngredientControls(selectedRecipe.ingredients);
    }
    this.recipeForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      description: new FormControl(description, Validators.required),
      difficulty: new FormControl(difficulty, Validators.required),
      ingredients: new FormArray(ingredients, Validators.required)
    });
  }

  onAddRecipe() {
    if (this.mode === 'Editar') {
      const recipeIndex = this.navParams.get('recipeIndex');
      this.recipesService.updateRecipe(this.recipeForm.value, recipeIndex);
    } else {
      this.recipesService.addRecipe(this.recipeForm.value);
    }
    this.viewCtrl.dismiss();
  }

  onAddNewIngredient() {
    const alert = this.alertCtrl.create({
      title: 'Adicionar ingrediente',
      inputs: [
        {
          type: 'text',
          name: 'name',
          placeholder: 'Nome'
        }, {
          type: 'number',
          name: 'amount',
          placeholder: 'Quantidade'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Adicionar',
          handler: data => {
            if (data.name.trim() === '' || data.amount.trim() === '' || data.name === null || data.amount === null || isNaN(data.amount)) {
              const toast = this.toastCtrl.create({
                message: 'Favor utilizar valores válidos',
                showCloseButton: true,
                closeButtonText: 'X'
              });
              toast.present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(
              new FormGroup({
                'name': new FormControl(data.name, Validators.required),
                'amount': new FormControl(data.amount, Validators.required)
              })
            );
            this.recipeForm.controls.ingredients.markAsDirty();
          }
        }
      ]
    });
    alert.present();
  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    this.recipeForm.controls.ingredients.markAsDirty();
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

  getIngredientControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

}
