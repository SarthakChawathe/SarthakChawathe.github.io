# Sarthak Chawathe Portfolio

React portfolio built with Vite and deployed as a static site to GitHub Pages.

## Development

The project needs Node 18 or newer; `.nvmrc` pins Node 22. The easiest way to run it is with [Task](https://taskfile.dev), which picks the right Node through nvm for you:

```sh
brew install go-task   # once
task                   # list tasks
task dev               # install dependencies if needed, then start the dev server
task build             # production build into dist/
task preview           # build, then serve dist/ at http://127.0.0.1:4173
task clean             # remove dist/
```

Without Task, switch Node yourself first:

```sh
nvm use
npm ci
npm run dev
```

Vite serves the site at `http://127.0.0.1:5173`.

The app is a single page: `index.html` mounts React and `src/App.jsx` routes clean URLs such as `/projects` and `/projects/rag`. GitHub Pages has no rewrite rules, so the build also writes the app to `dist/404.html`; deep links load it and the router renders the right page. Old `.html` URLs redirect to their clean equivalents.

## Production build

```sh
npm run build
npm run preview
```

The production site is written to `dist/`. The GitHub Actions workflow deploys this directory to GitHub Pages when changes are pushed to `main`. Enable **GitHub Actions** as the Pages build and deployment source in repository settings.
