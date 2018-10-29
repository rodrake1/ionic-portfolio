import { Component, OnInit } from '@angular/core';

import { NavParams, AlertController } from 'ionic-angular';

import { Quote } from '../../data/quote.interface';
import { QuotesService } from '../../services/quotes';
import { QuoteData } from '../../data/quote-data.interface';

@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})

export class QuotesPage implements OnInit {
  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private quotesService: QuotesService
  ) { }

  quoteGroup: {
    category: string,
    quotes: Quote[],
    icon: string
  };

  ngOnInit() {
    this.quoteGroup = this.navParams.data;
  }

  isFavorite(quote: Quote) {
    return this.quotesService.isQuoteFavorite(quote);
  }

  onAddToFavorites(selectedQuote: Quote) {
    const alert = this.alertCtrl.create({
      title: 'Adicionar às Favoritas',
      message: 'Gostaria de adicionar esta frase às Favoritas?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: () => {
            const quoteData: QuoteData = {
              quote: selectedQuote,
              category: this.quoteGroup.category
            };
            this.quotesService.addQuoteToFavorites(quoteData);
          }
        }
      ]
    });
    alert.present();
  }

  onRemoveFromFavorites(selectedQuote) {
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
            const quoteData: QuoteData = {
              quote: selectedQuote,
              category: this.quoteGroup.category
            };
            this.quotesService.removeQuoteFromFavorites(quoteData);
          }
        }
      ]
    });
    alert.present();
  }

}

