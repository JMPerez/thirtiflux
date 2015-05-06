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
var AlbumHeader = require('../components/album-header');
var AlbumTracks = require('../components/album-tracks');

var Spotify = require('../spotify');

var spotifyWebApi = new Spotify();

module.exports = React.createClass({
  mixins: [ Router.Navigation, Router.State ],

  getInitialState: function() {
    return {album: null};
  },
  componentDidMount: function() {
    var id = this.getParams().albumId;
    spotifyWebApi.getAlbum(id).then(function(data) {
      this.setState({album: data});
    }.bind(this));
  },
  componentWillReceiveProps: function() {
    this.componentDidMount();
  },
  render: function() {
    if (this.state.album) {
      return (
        <div>
          <AlbumHeader album={this.state.album} />
          <AlbumTracks id={this.state.album.id} />
        </div>);
    } else {
      return <div></div>
    }
  }
});