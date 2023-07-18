import {
  getState as getState2,
  setState as setState2,
} from '@acme/cjs-dual-exports';
import { getState as getState1, setState as setState1 } from './foo.cjs';

console.log('>>> set state (1) to 2');
setState1(2);
console.log('>>> set state (2) to 10');
setState2(10);
console.log('>>> read state (1)', getState1());
console.log('>>> read state (2)', getState2());
console.log(
  '>>> state matched between CSJ and ESM?',
  getState1() === getState2() ? '👍' : '👎',
);
