# Shared state example

Run `nx run shared-state-example:start` to see that the state is shared between both the modules loaded via `require` and `import`.

This works because the [`@acme/cjs-dual-exports`](../../packages/cjs-dual-exports) package is configured to point both `import` and `default` to the same CJS module (with an ESM wrapper).

If you replace the exports field in `package.json` with the following, you'll see that the `import` and `default` fields point to different modules, and the shared state will not work.

```json
{
  "exports": {
    ".": {
      "import": "./index.esm.mjs",
      "default": "./index.cjs.js"
    },
    "./package.json": "./package.json"
  }
}
```

Now run `nx run shared-state-example:start` and you will see the state become out of sync.
