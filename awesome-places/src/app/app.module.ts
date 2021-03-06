import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AgmCoreModule } from '@agm/core';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';

import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PlacePage } from '../pages/place/place';
import { AddPlacePage } from '../pages/add-place/add-place';
import { SetLocationPage } from '../pages/set-location/set-location';
import { PlacesService } from '../services/places.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlacePage,
    AddPlacePage,
    SetLocationPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyATnCv-jdhlEq56bMAqLwusto97-gQP4RA'
    }),
    IonicModule.forRoot(MyApp, {
      backButtonText: ''
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlacePage,
    AddPlacePage,
    SetLocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    File,
    PlacesService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
