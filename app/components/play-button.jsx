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
var PlaybackActions = require('../actions/PlaybackActions');
var PlaybackStore = require('../stores/PlaybackStore');

function getPlaybackState() {
  return {
    data: PlaybackStore.getNowPlaying()
  };
}

module.exports = React.createClass({
  getInitialState: function() {
    return getPlaybackState();
  },
  _onChange: function(params) {
    this.setState(getPlaybackState());
  },
  componentDidMount: function() {
    PlaybackStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    PlaybackStore.removeChangeListener(this._onChange);
  },
  /*componentWillReceiveProps: function(nextProps) {
    this._onChange();
  },*/
  handleClick: function(e) {
    console.log('clicked', e);
    PlaybackActions.playTrack(e);
  },
  render: function() {
    var isPlaying = this.state.track &&
        this.state.track.id === this.props.id &&
        this.state.playing;
    return (
      <button onClick={this.handleClick}>{isPlaying ? 'Pause' : 'Play'}</button>
    );
  }
});