import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { RecipesPage } from '../pages/recipes/recipes';
import { NewRecipePage } from '../pages/new-recipe/new-recipe';
import { RecipePage } from '../pages/recipe/recipe';
import { TabsPage } from '../pages/tabs/tabs';
import { ShoppingListService } from '../services/shopping-list.service';
import { RecipesService } from '../services/recipes.service';
import { SignPage } from '../pages/sign/sign';
import { AuthService } from '../services/auth.service';
import { ShoppingListOptionsPage } from '../pages/shopping-list/shopping-list-options/shopping-list-options';
import { RecipesOptionsPage } from '../pages/recipes/recipes-options/recipes-options';

@NgModule({
  declarations: [
    MyApp,
    ShoppingListPage,
    RecipesPage,
    NewRecipePage,
    RecipePage,
    TabsPage,
    SignPage,
    ShoppingListOptionsPage,
    RecipesOptionsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Voltar'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShoppingListPage,
    RecipesPage,
    NewRecipePage,
    RecipePage,
    TabsPage,
    SignPage,
    ShoppingListOptionsPage,
    RecipesOptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ShoppingListService,
    RecipesService,
    AuthService
  ]
})
export class AppModule { }
