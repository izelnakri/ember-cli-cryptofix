require('babel-register')({
  presets: ['env']
});

import resolve from 'rollup-plugin-node-resolve';
import { camelize } from 'ember-cli-string-utils';

export default [
  generateBrowserifyShim('bip39')
];

function generateBrowserifyShim(moduleName) {
  return {
    input: `tmp/${moduleName}.js`,
    output: {
      file: `vendor/shims/cryptofix/${moduleName}.js`,
      format: 'iife',
      name:  `_${camelize(moduleName)}`,
      banner: `(function() {
    function vendorModule() {
      'use strict';

      return {
        'default': (function(){ `,
      footer: `})(),
            __esModule: true,
      };
    }

    define('cryptofix/${moduleName}', [], vendorModule);
    })();`
    },
    plugins: [
      resolve({ jsnext: true })
    ]
  };
}
