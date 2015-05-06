var React = require("react");
var StateFromStoreMixin = require("items-store/StateFromStoresMixin");
var RouteHandler = require("react-router").RouteHandler;
var Playback = require("../Playback");

require("./style.css");

var Application = React.createClass({
	mixins: [StateFromStoreMixin],
	statics: {
		getState: function(stores, params) {
			var transition = stores.Router.getItem("transition");
			return {
				loading: !!transition
			};
		},
	},
	render: function() {
		return <div className={this.state.loading ? "application loading" : "application"}>
			{this.state.loading ? <div style={{float: "right"}}>loading...</div> : null}
			<h1>Thirtiflux</h1>
      <Playback />
			<RouteHandler />
		</div>;
	}
});
module.exports = Application;
