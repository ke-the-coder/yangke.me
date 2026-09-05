# yangke.me
## Personal CV website rebuild using npm and vite

```
npm install

npm run dev      # dev server on http://localhost:9000

npm run build    # build into docs/

npm run preview  # serve the built docs/ locally
```

The build output is committed to `docs/`, which GitHub Pages serves directly from
the default branch. Rebuild before committing so `docs/` stays in sync with `src/`.

Assets are emitted with relative paths, so `docs/index.html` also works when
opened straight off disk without a server.
