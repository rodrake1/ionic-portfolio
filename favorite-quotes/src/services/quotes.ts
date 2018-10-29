import { Subject } from 'rxjs/Subject';

import { QuoteData } from '../data/quote-data.interface';
import { Quote } from '../data/quote.interface';

export class QuotesService {
  favoritesChanged = new Subject<QuoteData[]>();
  private favoriteQuotes: QuoteData[] = [];

  addQuoteToFavorites(quoteData: QuoteData) {
    this.favoriteQuotes.push(quoteData);
  }

  removeQuoteFromFavorites(quoteData: QuoteData) {
    const position = this.favoriteQuotes.indexOf(quoteData);
    this.favoriteQuotes.splice(position !== -1 ? position : null, 1);
    this.favoritesChanged.next(this.favoriteQuotes.slice());
  }

  getFavoriteQuotes() {
    return this.favoriteQuotes.slice();
  }

  isQuoteFavorite(quote: Quote) {
    return this.favoriteQuotes.find(element => {
        return quote.id === element.quote.id;
      }
    );
  }

}