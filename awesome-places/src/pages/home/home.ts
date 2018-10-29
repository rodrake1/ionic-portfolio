import { Component, OnInit } from '@angular/core';

import { AddPlacePage } from '../add-place/add-place';
import { Place } from '../../models/place.model';
import { PlacesService } from '../../services/places.service';
import { ModalController } from 'ionic-angular';
import { PlacePage } from '../place/place';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  addPlacePage = AddPlacePage;
  places: Place[] = [];

  constructor(
    private placesService: PlacesService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.placesService.fecthPlaces()
      .then(
        (places: Place[]) => this.places = places
      );
  }

  ionViewWillEnter() {
    this.places = this.placesService.loadPlaces();
  }

  onOpenPlace(selectedPlace: Place, placeIndex: number) {
    const modal = this.modalCtrl.create(PlacePage, {place: selectedPlace, index: placeIndex});
    modal.present();
    modal.onWillDismiss(
      () => this.places = this.placesService.loadPlaces()
    );
  }

}
