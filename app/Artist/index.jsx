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
var TopTracks = require('../components/top-tracks');
var ArtistHeader = require('../components/artist-header');
var ArtistAlbums = require('../components/artist-albums');
var RelatedArtists = require('../components/related-artists');
var Spotify = require('../spotify');

var spotifyWebApi = new Spotify();

module.exports = React.createClass({
  mixins: [ Router.Navigation, Router.State ],

  getInitialState: function() {
    return {artist: null};
  },
  componentDidMount: function() {
    var id = this.getParams().artistId;
    
//    var promises = [];

//    var headerPromise = spotifyWebApi.getArtist(id);
//    var topTracksPromise = spotifyWebApi.getArtistTopTracks(this.props.id, 'ES');

    this.setState({artist: null});
    spotifyWebApi.getArtist(id).then(function(data) {
      this.setState({artist: data});
    }.bind(this));

/*    spotifyWebApi.getArtistTopTracks(this.props.id, 'ES').then(function(data) {
      this.setState({
        data: data,
        playback: this.state.playback
      });
    }.bind(this));*/

  },
  componentWillReceiveProps: function() {
    this.componentDidMount();
  },
  render: function() {
    if (this.state.artist) {
      return (
        <div>
          <ArtistHeader artist={this.state.artist} />
          <TopTracks id={this.state.artist.id} />
          <RelatedArtists id={this.state.artist.id} />
          <ArtistAlbums id={this.state.artist.id} />
        </div>);
    } else {
      return <div></div>
    }
  }
});