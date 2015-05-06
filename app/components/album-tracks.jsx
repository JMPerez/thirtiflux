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
var PlaybackActions = require('../actions/PlaybackActions');
var PlaybackStore = require('../stores/PlaybackStore');

var spotifyWebApi = new Spotify();

function getPlaybackState() {
  return PlaybackStore.getNowPlaying();
}

module.exports = React.createClass({
  getInitialState: function() {
    return {
      data: null,
      playback: getPlaybackState()
    };
  },
  componentDidMount: function() {
    spotifyWebApi.getAlbumTracks(this.props.id).then(function(data) {
      this.setState({data: data});
    }.bind(this));
    PlaybackStore.addChangeListener(this._onPlaybackChange);
  },
  componentWillReceiveProps: function() {
    this.componentDidMount();
  },
  componentWillUnmount: function() {
    PlaybackStore.removeChangeListener(this._onPlaybackChange);
  },
  handleClick: function(e) {
    console.log('clicked', e);
    PlaybackActions.playTrack(e);
  },
  _onPlaybackChange: function(params) {
    if (this.isMounted()) {
      this.setState({
        data: this.state.data,
        playback: getPlaybackState()
      });
    }
  },
  render: function() {

    function twodigit(n) {
      if (n < 10) {
        return '0' + n;
      } else {
        return n;
      }
    }

    function format(input) {
      if (input) {
        var secs = Math.round((0 + input) / 1000);
        var mins = Math.floor(secs / 60);
        secs -= mins * 60;
        var hours = Math.floor(mins / 60);
        mins -= hours * 60;
        if (hours > 0) {
          return hours + ':' + twodigit(mins) + ':' + twodigit(secs);
        }
        else {
          return mins + ':' + twodigit(secs);
        }
      } else {
        return '';
      }
    }

    if (this.state.data !== null) {
      var self = this;
      return (
        <div>
          <div className="section-divider">
            <h2>Album tracks</h2>
          </div>

          <table>
          <thead>
            <tr>
              <th>#</th>
              <th></th>
              <th>SONG</th>
            </tr>
          </thead>
          <tbody>{this.state.data.items.map(function(item, i) {

              var isPlaying = self.state.playback.track &&
                self.state.playback.track.id === item.id &&
                self.state.playback.playing;

              return (
                <tr onClick={self.handleClick.bind(self, item)} key={item.id}>
                  <td className="tl-cell tl-cell-pos">
                    <button className="button button-play" onClick={this.handleClick}>{isPlaying ? '||' : '▶'}</button>
                    <span className="tl-number-wrap">{i+1}</span>
                  </td>
                  <td className="tl-cell"><button>Save</button></td>
                  <td className="tl-cell">{item.name}</td>
                  <td className="tl-cell">{format(item.duration_ms)}</td>
                </tr>
              );
            })}
          </tbody></table>
        </div>)
    } else {
      return <div>Loading album tracks...</div>;
    }
  }
});