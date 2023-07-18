# Node CJS vs ESM

This repo provides some tests and examples to show different ways to package for Node. It's a playground for me to test out different scenarios.

## Compat examples

This examples (in `examples-compat`) show different package formats and how they are loaded when used in different context (Node CJS, Node ESM, ts-node, etc.).

```shell
nx run-many -t=check --verbose
```

The examples use `import` and `require` from a variety of Node/ts-node and CJS/ESM scenarios. The goal is that default export should match what the library exports, but due to synthetic exports and the package's `exports` field, this is not always correct. The only format that works is to provide dual format, where CJS is provided with an ESM wrapper that re-maps default and named exports.

```json
{
  "name": "@acme/cjs-dual-exports",
  "version": "1.0.0",
  "main": "index.cjs.js",
  "exports": {
    ".": {
      "module": "./index.esm.mjs",
      "import": "./index.cjs.mjs",
      "default": "./index.cjs.js"
    },
    "./package.json": "./package.json"
  }
}
```

Note that inside [`index.cjs.mjs`](./packages/cjs-dual-exports/index.cjs.mjs) we have to re-export the default `_default`

The reason there is a different `module` section is for bundlers. We'll cover this in the next section.

## Shared state example

This example (in `examples-misc/shared-state`) shows shared state can be problematic if `exports` is not configured correctly.

```shell
nx run shared-state-example:start
```

See the [README](./examples-misc/shared-state/README.md) for more details.

## Tree-shaking example (Vite)

This example (in `examples-tree-shaking/vite`) shows how tree-shaking works by pointing `module` to the real ESM module inside `package.json`.

```shell
nx run tree-shaking-example:build

# Show the file and see that unused exports are excluded
cat examples-tree-shaking/vite/dist/mylib.mjs
```

If the faux-ESM export is used (i.e. the on for `import` to ensure shared state), then tree-shaking will not work since bundlers do not support tree-shaking CJS at this time.
