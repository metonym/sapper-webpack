# sapper-template

> Custom Sapper webpack template based on the default [Sapper](https://github.com/sveltejs/sapper) template deployable to GitHub Pages.

This template uses a fork of sapper (@metonym/sapper) that removes the service worker and exports the static build to `public`.

Furthermore, this template executes a post-build script to support deployment to GitHub Pages.

At a minimum, deployments to GitHub Pages require modifying the `base href`. Using PostHTML, the base href is re-written to the name of the project while other script/link paths are made to be relative.

[View this project on GitHub Pages](https://metonym.github.io/sapper-webpack/).

## Getting started

Clone the repo and install its dependencies.

```bash
cd sapper-webpack
yarn
```

## Available scripts

### `yarn develop`

Runs the project in development mode. Watches `src` for changes.

### `yarn build`

Exports the sapper app to the `public` folder.
