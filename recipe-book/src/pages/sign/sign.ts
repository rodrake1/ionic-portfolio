import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavParams, LoadingController, AlertController } from 'ionic-angular';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-sign',
  templateUrl: 'sign.html',
})
export class SignPage implements OnInit {
  pageOption: string;
  password = '';
  passwordConfirmation = '';

  constructor(
    private navParams: NavParams,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.pageOption = this.navParams.get('option');
  }

  onSignup(form: NgForm) {
    const loading = this.loadingCtrl.create({ content: 'Verificando...' });
    loading.present();
    this.authService.singup(form.value.email, form.value.password)
      .then(() => {
        loading.dismiss();
      })
      .catch(() => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Cadastro Cancelado',
          message: 'Este email já foi cadastrado.',
          buttons: ['Ok']
        });
        alert.present();
        form.reset();
      });
  }

  onSignin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Verificando...'
    });
    loading.present();
    this.authService.singin(form.value.email, form.value.password)
      .then(() => {
        loading.dismiss()
      })
      .catch(() => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Login Cancelado',
          message: 'Email ou senha inválidos.',
          buttons: ['Ok']
        });
        alert.present();
        form.reset();
      });
  }

  checkPassword() {
    return this.password === this.passwordConfirmation;
  }

}
