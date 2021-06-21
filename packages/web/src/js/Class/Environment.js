export default class Environment {
  constructor(origin) {
    // Constants
    this.originDev = 'http://localhost:8080';
    // this.originSever = 'http://localhost:5000';
    this.originSever = 'http://brother.bet';

    // Variables
    this.origin = origin;
    this.developerMode = this.setDeveloperMode();
    this.newOrigin = this.setOrigin();
  }

  setDeveloperMode() {
    if (this.origin === this.originDev) return true;
    return false;
  }

  setOrigin() {
    if (this.origin === this.originDev) return this.originSever;
    return this.origin;
  }
}
