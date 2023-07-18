export default function defaultFn() {}
let state = 1;
export function getState() {
  return state;
}
export function setState(s) {
  state = s;
}
