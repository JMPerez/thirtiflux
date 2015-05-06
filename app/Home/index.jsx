var React = require("react");
var Link = require("react-router").Link;

module.exports = React.createClass({
	render: function() {
		return <div>
			<h2>This is a demo of React + Spotify Web API</h2>
      <Link to="artist" params={{artistId: "6mfK6Q2tzLMEchAr0e9Uzu"}}>Pereza</Link>
		</div>;
	}
});
