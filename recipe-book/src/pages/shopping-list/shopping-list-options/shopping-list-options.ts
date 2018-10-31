import { Component } from "@angular/core";

import { ViewController } from "ionic-angular";

@Component({
  selector: 'page-shopping-list-options',
  template: `
    <ion-grid text-center>
      <ion-row>
        <ion-col>
          <h5>Gerenciar dados</h5>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <button ion-button block outline (click)="onAction('load')">Carregar Lista</button>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <button ion-button block outline (click)="onAction('save')">Salvar Lista</button>
        </ion-col>
      </ion-row>
    </ion-grid>
  `
})

export class ShoppingListOptionsPage {
  constructor(private viewCtrl: ViewController) { }

  onAction(action: string) {
    this.viewCtrl.dismiss({ action: action });
  }
}