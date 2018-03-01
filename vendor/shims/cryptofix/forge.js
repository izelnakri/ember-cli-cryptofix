(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': window.forge,
      __esModule: true,
    };
  }

  define('cryptofix/forge', [], vendorModule);
})();
