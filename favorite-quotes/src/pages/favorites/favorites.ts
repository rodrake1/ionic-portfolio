import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ModalController } from 'ionic-angular';

import { QuotesService } from '../../services/quotes';
import { SingleQuotePage } from '../single-quote/single-quote';
import { QuoteData } from '../../data/quote-data.interface';
import { SettingsService } from '../../services/settings';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})

export class FavoritesPage {
  subscription: Subscription
  quoteData: QuoteData[];

  constructor(
    private quotesServices: QuotesService,
    private modalCtrl: ModalController,
    private settingsService: SettingsService
  ) { }

  ionViewWillEnter() {
    this.subscription = this.quotesServices.favoritesChanged.subscribe(
      (quoteData: QuoteData[]) => {
        this.quoteData = quoteData;
      }
    );
    this.quoteData = this.quotesServices.getFavoriteQuotes();
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }

  onViewQuote(quoteData: QuoteData) {
    const modal = this.modalCtrl.create(SingleQuotePage, quoteData);
    modal.present();
    modal.onDidDismiss(
      (remove: boolean) => {
        if (remove) {
          this.quotesServices.removeQuoteFromFavorites(quoteData);
        }
      }
    );
  }

  onRemoveQuoteFromFavorites(quoteData: QuoteData) {
    this.quotesServices.removeQuoteFromFavorites(quoteData);
  }

  isToggleChecked() {
    return this.settingsService.getToggleStatus();
  }

}
