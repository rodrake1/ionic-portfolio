import { Component, ViewChild } from '@angular/core';
import firebase from 'firebase';

import { Platform, NavController, MenuController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SignPage } from '../pages/sign/sign';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage = TabsPage;
  signPage = SignPage;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private authService: AuthService,
    private loadingCtrl: LoadingController
  ) {
    firebase.initializeApp({
      apiKey: "AIzaSyBpelhC_ptautuP-XxxEd_fI8hP4T6diIU",
      authDomain: "ionic-recipe-book-65c93.firebaseapp.com"
    });
    const loading = this.loadingCtrl.create({content: 'Iniciando...'});
    loading.present();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        loading.dismiss();
        this.isAuthenticated = true;
        this.nav.setRoot(this.tabsPage, { option: 0 });
      } else {
        loading.dismiss();
        this.isAuthenticated = false;
        this.nav.setRoot(this.signPage, { option: 'Entrar' });
      }
    });
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any, option: any) {
    this.nav.setRoot(page, { option: option });
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
  }

}

