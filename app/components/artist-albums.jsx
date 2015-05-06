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
      spotifyWebApi.getArtistAlbums(this.props.id, {country: 'SE'}).then(function(data) {
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
            <h2>Albums</h2>
          </div>
          <ul className="artist-albums">{this.state.data.items.map(function(item, i) {
            return (
              <li key={item.id}>
                <div>
                  <Link to="album" params={{albumId: item.id}}><img className="artist-albums-cover" src={item.images.length ? item.images[1].url : ''}  width="200" height="200" /></Link>
                </div>
                <div className="info">
                  <Link to="album" params={{albumId: item.id}}>{item.name}</Link>
                </div>
              </li>
            );
          })}</ul>
        </div>)
    } else {
      return <div>Loading albums...</div>;
    }
  }
});