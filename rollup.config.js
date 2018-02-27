require('babel-register')({
  presets: ['env']
});

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import json from 'rollup-plugin-json';

const NPM_PATH = './node_modules';

export default [
  generateModuleShim('scryptsy'),
  generateModuleShim('forge'),
  {
    input: `tmp/bip39.js`,
    output: {
      file: `vendor/shims/cryptofix/bip39.js`,
      format: 'iife',
      name: '_bip39',
      banner: `(function() {
    function vendorModule() {
      'use strict';

      return {
        'default': (function(){ `,
      footer: `})(),
            __esModule: true,
      };
    }

    define('cryptofix/bip39', [], vendorModule);
    })();`
    },
    plugins: [
      resolve({ jsnext: true })
    ]
  },
  {
    input: `tmp/ethereumjs-wallet.js`,
    output: {
      file: `vendor/shims/cryptofix/ethereumjs-wallet.js`,
      format: 'iife',
      name: '_ethereumjswallet',
      banner: `(function() {
    function vendorModule() {
      'use strict';

      return {
        'default': (function(){ `,
      footer: `})(),
            __esModule: true,
      };
    }

    define('cryptofix/ethereumjs-wallet', [], vendorModule);
    })();`
    },
    plugins: [
      resolve({ jsnext: true })
    ]
  }
];

function generateModuleShim(moduleName) {
  return {
    input: `${NPM_PATH}/cryptofix/${moduleName}.js`,
    output: {
      file: `vendor/shims/cryptofix/${moduleName}.js`,
      format: 'iife',
      name: '_' + moduleName,
      banner: `(function() {
    function vendorModule() {
      'use strict';

      return {
        'default': (function(){`,
      footer: `
          return ${'_' + moduleName};
        })(),
            __esModule: true,
          };
        }

        define('cryptofix/${moduleName}', [], vendorModule);
        })();`
    },
    plugins: [
      resolve({ jsnext: true }),
      commonjs({ include: ['node_modules/**', `${require.resolve('cryptofix')}/../../node_modules/**`] }),
      globals(),
      builtins(),
      json({ include: ['node_modules/**', `${require.resolve('cryptofix')}/../../node_modules/**`] })
    ]
  };
}
