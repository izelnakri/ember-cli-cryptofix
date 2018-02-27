'use strict';

module.exports = {
  name: 'ember-cli-cryptofix',
  included(app) {
    this.app = this._findHost();
    this.addonENV = this.app.project.config(this.app.env)['ember-cli-cryptofix'] || {};

    this._super.included.apply(this, arguments);

    if (this.addonENV.enabled) {
      app.import('vendor/shims/cryptofix/forge.js');
      app.import('vendor/shims/cryptofix/bip39.js');
      app.import('vendor/shims/cryptofix/ethereumjs-wallet.js');
      app.import('vendor/shims/cryptofix/scryptsy.js');
    }
  }
};
