const cjsOnly = require('@acme/cjs-only');
const cjsEsModule = require('@acme/cjs-esmodule');
const cjsDualExports = require('@acme/cjs-dual-exports');

console.log('## node (file=test.js)');
console.log(
  `@acme/cjs-only: DEFAULT=${
    typeof cjsOnly === 'function' ? '👍' : '👎'
  }, NAMED=${typeof cjsOnly?.getState === 'function' ? '👍' : '👎'}`,
);
console.log(
  `@acme/cjs-esmodule: DEFAULT=${
    typeof cjsEsModule === 'function' ? '👍' : '👎'
  }, NAMED=${typeof cjsEsModule?.getState === 'function' ? '👍' : '👎'}`,
);
console.log(
  `@acme/cjs-dual-exports: DEFAULT=${
    typeof cjsDualExports === 'function' ? '👍' : '👎'
  }, NAMED=${typeof cjsDualExports?.getState === 'function' ? '👍' : '👎'}`,
);
