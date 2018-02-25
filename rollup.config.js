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
  generateModuleShim('bip39'),
  generateModuleShim('scryptsy'),
  generateModuleShim('forge'),
  generateModuleShim('ethereumjs-wallet')
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