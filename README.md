# Thirtiflux

Spotify Web Player using [Spotify Web API](https://developer.spotify.com/web-api/). Similar to [thirtify](https://github.com/possan/webapi-player-example) but based on react + flux. It uses [react-starter](https://github.com/webpack/react-starter) as a template for react and webpack.

## TODO

* User login
* Follow / Unfollow
* Save / Unsave
* Playlist management
* Queue
* Browse
* Server prerendering

## Installation

Just clone this repo and change the `origin` git remote.

``` text
npm install
```

## Development server

``` text
# start the webpack-dev-server
npm run dev-server
# wait for the first compilation is successful

# in another terminal/console
# start the node.js server in development mode
npm run start-dev

# open this url in your browser
http://localhost:8080/
```

The configuration is `webpack-dev-server.config.js`.

It automatically recompiles and refreshes the page when files are changed.

Also check the [webpack-dev-server documentation](http://webpack.github.io/docs/webpack-dev-server.html).


## Hot Module Replacement development server

``` text
# start the webpack-dev-server in HMR mode
npm run hot-dev-server
# wait for the first compilation is successful

# in another terminal/console
# start the node.js server in development mode
npm run start-dev

# open this url in your browser
http://localhost:8080/
```

The configuration is `webpack-hot-dev-server.config.js`.

It automatically recompiles when files are changed. When a hot-replacement-enabled file is changed (i. e. stylesheets or React components) the module is hot-replaced. If Hot Replacement is not possible the page is refreshed.

Hot Module Replacement has a performance impact on compilation.


## Production compilation and server

``` text
# build the client bundle and the prerendering bundle
npm run build

# start the node.js server in production mode
npm run start

# open this url in your browser
http://localhost:80/
```

The configuration is `webpack-production.config.js`.

The server is at `lib/server.js`

The production setting builds two configurations: one for the client (`build/public`) and one for the serverside prerendering (`build/prerender`).


## Legacy static assets

Asserts in `public` are also served.


## Build visualization

After a production build you may want to visualize your modules and chunks tree.

Use the [analyse tool](http://webpack.github.io/analyse/) with the file at `build/stats.json`.


## Loaders and file types

Many file types are preconfigured, but not every loader is installed. If you get an error like `Cannot find module "xxx-loader"`, you'll need to install the loader with `npm install xxx-loader --save` and restart the compilation.


## Common changes to the configuration

### Add more entry points

(for a multi page app)

1. Add an entry point to `make-webpack-config.js` (`var entry`).
2. Add a new top-level react component in `app` (`xxxRoutes.js`, `xxxStoreDescriptions.js`, `xxxStores.js`).
3. (Optional) Enable `commonsChunk` in `webpack-production.config.js` and add `<script src="COMMONS_URL"></script>` to `app/prerender.html`.
4. Modify the server code to require, serve and prerender the other entry point.
5. Restart compilation.

### Switch devtool to SourceMaps

Change `devtool` property in `webpack-dev-server.config.js` and `webpack-hot-dev-server.config.js` to `"source-map"` (better module names) or `"eval-source-map"` (faster compilation).

SourceMaps have a performance impact on compilation.

### Enable SourceMaps in production

1. Uncomment the `devtool` line in `webpack-production.config.js`.
2. Make sure that the folder `build\public\debugging` is access controlled, i. e. by password.

SourceMaps have a performance impact on compilation.

SourceMaps contains your unminimized source code, so you need to restrict access to `build\public\debugging`.

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
