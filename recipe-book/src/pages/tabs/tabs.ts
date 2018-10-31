import { Component, ViewChild, OnInit } from '@angular/core';

import { Tabs, NavParams } from 'ionic-angular';

import { ShoppingListPage } from '../shopping-list/shopping-list';
import { RecipesPage } from '../recipes/recipes';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'

})
export class TabsPage implements OnInit {
  shoppingListPage = ShoppingListPage;
  recipesPage = RecipesPage;
  selectedTab: number;
  @ViewChild('tabs') tabs: Tabs;

  constructor(private navParams: NavParams) { }

  ngOnInit() {
    this.selectedTab = this.navParams.get('option');
  }

  ionViewWillEnter() {
    this.tabs.select(this.selectedTab);
  }
}
