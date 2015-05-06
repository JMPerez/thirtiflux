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
var Spotify = require('../spotify');

var spotifyWebApi = new Spotify();

module.exports = React.createClass({
  getInitialState: function() {
    return {data: null};
  },
  componentDidMount: function() {
    if (this.props.id) {
      spotifyWebApi.getArtistRelatedArtists(this.props.id).then(function(data) {
        this.setState({data: data});
      }.bind(this));
    }
  },
  componentWillReceiveProps: function() {
    this.componentDidMount();
  },
  render: function() {
    if (this.state.data !== null) {
      return (
        <div>
          <div className="section-divider">
            <h2>Related artists</h2>
          </div>
          <ul className="related-artists">{this.state.data.artists.map(function(item, i) {
            return (
              <li key={item.id}>
                <div>
                  <Link to="artist" params={{artistId: item.id}}><img className="artist-avatar" src={item.images.length ? item.images[1].url : ''}  width="200" height="200" /></Link>
                </div>
                <div className="info">
                  <Link to="artist" params={{artistId: item.id}}>{item.name}</Link>
                </div>
              </li>
            );
          })}</ul>
        </div>)
    } else {
      return <div>Loading top tracks...</div>;
    }
  }
});