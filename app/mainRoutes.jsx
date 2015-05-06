var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

// polyfill
if(!Object.assign)
	Object.assign = React.__spread;

// export routes
module.exports = (
	<Route name="app" path="/" handler={require("./Application")}>
    <Route name="artist" path="/artist/:artistId" handler={require("react-proxy!./Artist")} />
    <Route name="album" path="/album/:albumId" handler={require("./Album")} />
		<DefaultRoute name="home" handler={require("./Home")} />
	</Route>
);
