import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ModalController, LoadingController, ToastController, normalizeURL, NavController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File, Entry } from '@ionic-native/file';

import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location.model';
import { Place } from '../../models/place.model';
import { PlacesService } from '../../services/places.service';

// declare var cordova: any;

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  locationIsSet = false;
  imagePath: string;
  location: Location = {
    lat: -25.428575,
    lng: -49.266462
  };

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private camera: Camera,
    private placesService: PlacesService,
    private file: File
  ) { }

  onSubmit(form: NgForm) {
    const place = new Place(form.value.title, form.value.description, this.location, this.imagePath);
    this.placesService.addPlace(place);
    this.navCtrl.pop();
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, { location: this.location, locationIsSet: this.locationIsSet });
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    );
  }

  onLocate() {
    const loading = this.loadingCtrl.create({ content: 'Localizando...' });
    loading.present();
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          loading.dismiss();
          this.location = new Location(location.coords.latitude, location.coords.longitude);
          this.locationIsSet = true;
        }
      )
      .catch(
        () => {
          loading.dismiss();
          const toast = this.toastCtrl.create({
            message: 'Ocorreu um erro ao tentar definir sua localização.',
            duration: 3000
          })
          toast.present();
        }
      );
  }

  onTakePhoto(source: number) {
    this.camera.getPicture({ sourceType: source })
      .then(
        imageURI => {
          const currentImageName = imageURI.replace(/^.*[\\\/]/, '');
          const currentImagePath = imageURI.replace(/[^\/]*$/, '');
          this.file.moveFile(currentImagePath, currentImageName, this.file.dataDirectory, new Date().getTime() + '.jpg')
            .then(
              (image: Entry) => {
                this.imagePath = normalizeURL(image.nativeURL);
                this.camera.cleanup();
              }
            )
            .catch(
              () => {
                this.imagePath = '';
                this.camera.cleanup();
                const toast = this.toastCtrl.create({
                  message: 'Não foi possível salvar a imagem.',
                  duration: 3000
                });
                toast.present();
              }
            );
        }
      )
      .catch(
        () => {
          const toast = this.toastCtrl.create({
            message: 'Não foi possível tirar a foto.',
            duration: 3000
          });
          toast.present();
        }
      );
  }

}
