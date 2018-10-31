import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";

@Component({
  selector: 'page-recipes-options',
  template: `
    <ion-grid text-center>
      <ion-row>
        <ion-col>
          <h5>Gerenciar dados</h5>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <button ion-button block outline (click)="onAction('load')">Carregar Receitas</button>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <button ion-button block outline (click)="onAction('save')">Salvar Receitas</button>
        </ion-col>
      </ion-row>
    </ion-grid>
  `
})

export class RecipesOptionsPage {
  constructor(private viewCtrl: ViewController) { }

  onAction(action: string) {
    this.viewCtrl.dismiss({ action: action });
  }

}