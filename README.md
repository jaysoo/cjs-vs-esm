# Node CJS vs ESM

This repo provides some tests and examples to show different ways to package for Node. It's a playground for me to test out different scenarios.

## Recommendations

These are the recommendations as I've gathered so far, after discussing with different OSS maintainers and trying out a few things locally.

- Use `exports` field for all new project. Existing projects should consider adding it in a major release (it will be a breaking change).
- For formats (CJS vs ESM), if you are unsure just stick with CJS.
  - Node ESM (and `ts-node-esm`) can allows imports of CJS modules with synthetic exports.
  - Tree-shaking will not work, but your package may not care anyway (e.g. it's for Node only, or there are no parts to tree-shake).
  - CJS will not go anywhere, so you are safe to keep using it.
- You can use ESM-only if you are sure that none of your users will need to load from `require`.
  - Avoid dual formats if you can, since it is easy to mess up.
- Dual formats (both CJS and ESM) is useful for front-end projects (e.g. React lib), but needs to be crafted very carefully.
  - Can you easily mess up shared library state if `imports` and `default`/`require` point to different modules. To solve this, faux-ESM is used to point both `import` and `default`/`require` fields to the CJS module (with ESM wrappers).
  - Tree-shaking means true ESM format is needed for bundlers.

Additional considerations needed for cross-platform support with Deno, WASM, bun, etc. (I've not investigated these yet). Also, there is no push to remove CJS support from Node (it's very costly with no added benefits in Node), so unless something drastic changes, CJS is here to stay.

## Examples

These are examples to show different `package.json` formats and how they affect consumers.

### Compat examples

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

### Shared state example

This example (in `examples-misc/shared-state`) shows shared state can be problematic if `exports` is not configured correctly.

```shell
nx run shared-state-example:start
```

See the [README](./examples-misc/shared-state/README.md) for more details.

### Tree-shaking example (Vite)

This example (in `examples-tree-shaking/vite`) shows how tree-shaking works by pointing `module` to the real ESM module inside `package.json`.

```shell
nx run tree-shaking-example:build

# Show the file and see that unused exports are excluded
cat examples-tree-shaking/vite/dist/mylib.mjs
```

If the faux-ESM export is used (i.e. the on for `import` to ensure shared state), then tree-shaking will not work since bundlers do not support tree-shaking CJS at this time.
