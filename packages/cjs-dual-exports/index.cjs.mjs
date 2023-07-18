export { getState, setState } from './index.cjs.js';

// For Node ESM (.mjs, .mts files), the default export will synthesized by Node e.g. (default === module.exports, not module.exports.default).
// Thus `export { default } from './index.cjs.js` will not work unless index.js uses `exports = function defaultFn() {};`.
// By renaming default as _default and re-exporting it from the `.mjs` file, we can make it work for both Node ESM and CJS.
export { default } from './index.cjs.default.js';
