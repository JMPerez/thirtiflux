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
var FollowButton = require('./follow-button');

module.exports = React.createClass({
  render: function() {
      return (
        <header className="header header-image header-artist">
          <div className="media artist">
            <div className="media-img">
              <img src={this.props.artist.images ? this.props.artist.images[2].url : ''} alt={this.props.artist.name} width="130" height="130" />
            </div>
            <div className="bd">
              <div className="header-label">
                Artist
              </div>
              <div className="media-title">
                <h1 className="h-title">{this.props.artist.name}</h1>
              </div>
              <div className="media-actions">
                <button className="button button-primary button-play">Play</button>
                <FollowButton />
              </div>
            </div>
          </div>
          <div>{this.props.artist.followers ? this.props.artist.followers.total : '-'} followers</div>
        </header>
        );
  }
});