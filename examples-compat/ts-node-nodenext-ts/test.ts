import cjsOnly, { getState as cjsOnlyNamed } from '@acme/cjs-only';
import cjsEsModule, { getState as cjsEsModuleNamed } from '@acme/cjs-esmodule';
import cjsDualExports, {
  getState as cjsDualExportsNamed,
} from '@acme/cjs-dual-exports';

console.log('## ts-node (file=test.ts, module=nodenext)');
console.log(
  `@acme/cjs-only: DEFAULT=${
    typeof cjsOnly === 'function' ? '👍' : '👎'
  }, NAMED=${typeof cjsOnlyNamed === 'function' ? '👍' : '👎'}`,
);
console.log(
  `@acme/cjs-esmodule: DEFAULT=${
    typeof cjsEsModule === 'function' ? '👍' : '👎'
  }, NAMED=${typeof cjsEsModuleNamed === 'function' ? '👍' : '👎'}`,
);
console.log(
  `@acme/cjs-dual-exports: DEFAULT=${
    typeof cjsDualExports === 'function' ? '👍' : '👎'
  }, NAMED=${typeof cjsDualExportsNamed === 'function' ? '👍' : '👎'}`,
);
