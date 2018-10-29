export class SettingsService {
  toggleStatus: boolean = false;

  setToggleStatus(checked: boolean) {
    this.toggleStatus = checked;
  }

  getToggleStatus() {
    return this.toggleStatus;
  }

}