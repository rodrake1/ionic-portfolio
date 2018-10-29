import { Component } from '@angular/core';

import { Toggle } from 'ionic-angular';
import { SettingsService } from '../../services/settings';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})

export class SettingsPage {
  constructor(private settingsService: SettingsService) { }

  onToggle(toggle: Toggle) {
    this.settingsService.setToggleStatus(toggle.checked);
  }

  checkToggleStatus() {
    return this.settingsService.getToggleStatus();
  }

}
