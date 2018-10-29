import { Component, OnInit } from '@angular/core';

import { NavParams, ViewController, AlertController } from 'ionic-angular';

import { Place } from '../../models/place.model';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage implements OnInit {
  place: Place;
  index: number;

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private placesService: PlacesService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.place = this.navParams.get('place');
    this.index = this.navParams.get('index');
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

  onRemove() {
    const alert = this.alertCtrl.create({
      title: 'Remover ' + this.place.title,
      subTitle: 'Tem certeza que deseja remover este lugar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Remover',
          handler: () => {
            this.placesService.removePlace(this.index);
            this.onClose();
          }
        }
      ]
    });
    alert.present();
  }
}
