import { Component, OnInit } from '@angular/core';

import { ViewController, NavParams, AlertController } from 'ionic-angular';

import { QuoteData } from '../../data/quote-data.interface';

@Component({
  selector: 'page-single-quote',
  templateUrl: 'single-quote.html',
})

export class SingleQuotePage implements OnInit {
  quoteData: QuoteData;

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private alertCtrl: AlertController
  ) { }
  
  ngOnInit() {
    this.quoteData = this.navParams.data;
  }

  onClose(remove = false) {
    if (remove) {
      const alert = this.alertCtrl.create({
        title: 'Remover das Favoritas',
        message: 'Gostaria de remover esta frase das Favoritas?',
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
          },
          {
            text: 'Sim',
            handler: () => {
              this.viewCtrl.dismiss(remove)
            }
          }
        ]
      });
      alert.present();
    } else {
      this.viewCtrl.dismiss();
    }
  }

}