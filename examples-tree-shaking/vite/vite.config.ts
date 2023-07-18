import { resolve } from 'path';

export default {
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      formats: ['es'],
      fileName: 'mylib',
    },
    commonjsOptions: {
      include: [/packages/],
    },
  },
};
