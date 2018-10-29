import { Component, ViewChild } from '@angular/core';

import { Tabs, NavParams } from 'ionic-angular';

import { FavoritesPage } from '../favorites/favorites';
import { LibraryPage } from '../library/library';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-tabs',
  template: `
    <ion-tabs class="tabs-item-hide" #myTabs>
      <ion-tab [root]="favoritesPage" tabTitle="Favoritas" tabIcon="md-heart"></ion-tab>
      <ion-tab [root]="libraryPage" tabTitle="Biblioteca" tabIcon="md-book"></ion-tab>
      <ion-tab [tab-hidden]="true" [root]="settingsPage" tabTitle="Configurações" tabIcon="settings"></ion-tab>
    </ion-tabs>
  `
})

export class TabsPage {
  favoritesPage = FavoritesPage;
  libraryPage = LibraryPage;
  settingsPage = SettingsPage;
  selectedTab: number;
  @ViewChild('myTabs') tabRef: Tabs;

  constructor(private navParams: NavParams) {
    this.selectedTab = this.navParams.get('tabIndex');
  }

  ionViewWillEnter() {
    this.tabRef.select(this.selectedTab);
  }

}