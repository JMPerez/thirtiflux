/**
 *  Artist
 *
 *  <Artist>
 *    <ArtistHeader/>
 *    <ArtistBody/>
 *  </Artist>
 *  
 */
var React = require("react");
var Link = require("react-router").Link;
var Router = require('react-router');

module.exports = React.createClass({
  render: function() {
      return (
        <div className="album-header">
          <div className="media album">
            <div className="media-img">
              <img src={this.props.album.images[0].url} />
            </div>
            <div className="bd">
              <div className="header-label">
                Album
              </div>
              <div className="media-title">
                {this.props.album.name} by <Link to="artist" params={{artistId: this.props.album.artists[0].id}}>{this.props.album.artists[0].name}</Link>
              </div>
            </div>
          </div>
          <button>Play</button>
        </div>
        );
  }
});