(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': window.EthereumjsWallet,
      __esModule: true,
    };
  }

  define('cryptofix/ethereumjs-wallet', [], vendorModule);
})();
