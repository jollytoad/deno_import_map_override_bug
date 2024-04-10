Demonstration of inconsistent `deno.importMap` behaviour in VSCode.

As reported here: https://github.com/denoland/vscode_deno/issues/1106

The `deno.json` contains an import map as such:

```json
"imports": {
  "@std/assert/fail": "jsr:/@std/assert@^0.221.0/fail"
}
```

but an alternative import map `alt_import_map.ts` remaps this:

```json
{
  "imports": {
    "@std/assert/fail": "./alt_fail.ts"
  }
}
```

when the `deno.importMap` vscode setting points to the alternative map, we
experience inconsistent behaviour within vscode.

The language server sees only the import map from `deno.json` and not the
alternative as set in `deno.importMap`.

Within `main_test.ts`, if you follow the `fail` function reference you'll always
end up in the original jsr module referenced in the `deno.json` import map,
rather than the `alt_fail.ts` module from the alternative import map.

But when you run the test suite from within vscode it uses that alternative, and
you see something like...

```
Executing task: deno test --allow-all --no-check --import-map ./alt_import_map.json main_test.ts
```

I'd expect `deno.importMap` to override the import map for the LSP too.
