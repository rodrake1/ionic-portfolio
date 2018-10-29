import { Injectable } from "@angular/core";

import { Storage } from "@ionic/storage";

import { File } from "@ionic-native/file";

import { ToastController } from "ionic-angular";

import { Place } from "../models/place.model";

@Injectable()
export class PlacesService {
  private places: Place[] = [];

  constructor(
    private storage: Storage,
    private file: File,
    private toastCtrl: ToastController
  ) { }

  addPlace(place: Place) {
    this.places.push(place);
    this.storage.set('places', this.places)
      .then()
      .catch(
        () => {
          this.places.splice(this.places.indexOf(place), 1);
        }
      );
  }

  loadPlaces() {
    return this.places.slice();
  }

  fecthPlaces() {
    return this.storage.get('places')
      .then(
        (places: Place[]) => {
          this.places = places !== null ? places : [];
          return this.places.slice();
        }
      )
  }

  removePlace(index: number) {
    const place = this.places[index];
    this.places.splice(index, 1);
    this.storage.set('places', this.places)
      .then(
        () => {
          this.removeImage(place);
        }
      )
  }

  private removeImage(place: Place) {
    const currentImageName = place.imagePath.replace(/^.*[\\\/]/, '');
    this.file.removeFile(this.file.dataDirectory, currentImageName)
      .then(
        () => {
          const toast = this.toastCtrl.create({
            message: 'Lugar removido com sucesso.',
            duration: 3000
          });
          toast.present();
        }
      )
      .catch(
        () => {
          const toast = this.toastCtrl.create({
            message: 'Não foi possível remover o lugar.',
            duration: 3000
          });
          toast.present();
          this.addPlace(place);
        }
      );
  }
}