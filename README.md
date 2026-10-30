# Sarthak Chawathe Portfolio

React portfolio built with Vite and deployed as a static site to GitHub Pages.

## Development

Install dependencies and run the local development server:

```sh
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
