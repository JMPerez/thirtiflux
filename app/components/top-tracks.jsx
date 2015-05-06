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
      playback: getPlaybackState(),
      showMoreThan5: false
    };
  },
  componentDidMount: function() {
    if (this.props.id) {
      spotifyWebApi.getArtistTopTracks(this.props.id, 'ES').then(function(data) {
        this.setState({
          data: data,
          playback: this.state.playback
        });
      }.bind(this));
    } else {
      this.setState({
        data: null,
        playback: this.state.playback
      });
    }
    PlaybackStore.addChangeListener(this._onPlaybackChange);
  },
  componentWillReceiveProps: function() {
    this.componentDidMount();
  },
  handleClick: function(e) {
    console.log('clicked', e);
    PlaybackActions.playTrack(e);
  },
  show5MoreClick: function() {
    this.setState({showMoreThan5: true});
  },
  _onPlaybackChange: function(params) {
    if (this.isMounted()) {
      this.setState({
        data: this.state.data,
        playback: getPlaybackState()
      });
    }
  },
  componentWillUnmount: function() {
    PlaybackStore.removeChangeListener(this._onPlaybackChange);
  },
  render: function() {
      var self = this;

      var show5MoreButton = this.state.showMoreThan5 ? {} :
      (<button className="button" onClick={this.show5MoreClick}>Show 5 more</button>);

      var body = (<div>Loading top tracks...</div>);
      if (this.state.data !== null) {
        body = (<div><table><tbody>{this.state.data.tracks.map(function(item, i) {

              var isPlaying = self.state.playback.track &&
                self.state.playback.track.id === item.id &&
                self.state.playback.playing;

              var rowStyle = i < 5 || self.state.showMoreThan5 ? {} : {display: 'none'};
              return (
                <tr onClick={self.handleClick.bind(self, item)} key={item.id} style={rowStyle}>
                  <td className="tl-cell"><img src={item.album.images[2].url} width="40" height="40" /></td>
                  <td className="tl-cell tl-cell-pos">
                    <button className="button button-play" onClick={this.handleClick}>{isPlaying ? '||' : '▶'}</button>
                    <span className="tl-number-wrap">{i+1}</span>
                  </td>
                  <td className="tl-cell">{item.name}</td>
                  <td className="tl-cell"><button>Save</button></td>
                </tr>
              );
            })}
          </tbody></table>{show5MoreButton}</div>);
      }
      return (
        <div>
          <div className="section-divider">
            <h2>Top tracks</h2>
          </div>
            {body}
        </div>);
  }
});

// see http://jsfiddle.net/HWzJ6/ for server-rendering