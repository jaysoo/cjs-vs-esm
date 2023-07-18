// This is how transpilers/bundlers compile ESM to CJS. When used in other bundlers, the `__esModule` property
// will be used to ignore synthesized default exports. Instead, the `exports.default` is used when importing in ESM.
Object.defineProperty(exports, '__esModule', { value: true });
// Normally Node would read `module.exports` as the default.
exports.default = function defaultFn() {};

let state = 1;
exports.getState = function getState() {
  return state;
};
exports.setState = function getState(s) {
  state = s;
};
