# @acme/cjs-dual-exports

This package exports both CJS and ESM formats. The `exports` field in `package.json` contains:

- `module` - This points to real ESM format, which is used by bundlers to enable tree-shaking
- `import` - This is faux ESM format that wraps CJS, and used when loaded via `import` or `import()`
- `default` - This CJS format, and used when loaded via `require()`

The reason that `import` and `default` both point to CJS is to prevent situations where both `import` and `require` are used in the same runtime. By pointing to the same CJS module, potential shared state in the package will work, otherwise you may load two instances of the same package (leading to bugs).

See the [shared state example](../../examples-misc/shared-state) for more details.
