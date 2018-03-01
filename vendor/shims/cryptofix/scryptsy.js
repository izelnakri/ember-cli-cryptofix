(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': window.Scrypt,
      __esModule: true,
    };
  }

  define('cryptofix/scryptsy', [], vendorModule);
})();
