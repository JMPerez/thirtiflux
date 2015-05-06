/**
 *  Playback 
 */
var React = require("react");
var Link = require("react-router").Link;
var Router = require('react-router');
var PlaybackStore = require('../stores/PlaybackStore');

function getPlaybackState() {
  return {
    data: PlaybackStore.getNowPlaying()
  };
}

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

  play: function(e) {
    PlaybackActions.play(e);
  },

  pause: function(e) {
    PlaybackActions.pause(e);
  },

  render: function() {
    if (this.state.data.track === null) {
      return <div></div>
    } else {
      var playPause = this.state.data.playing ? <button>Pause</button> : <button>Play</button>;
      var innerProgressBarStyle = {right: ((30 - this.state.data.position) / 30 * 100) + '%'}
      return (

        <div className="player">
          Playing... {this.state.data.track.name}<br/>
          {playPause}

          <span id="elapsed">{this.state.data.position ? format(this.state.data.position * 1000) : ''}</span>
          <div id="progressbar" className="flex-1"><div className="progress-bar-wrapper handle">
            <div className="progress-bar">
              <div className="inner" style={innerProgressBarStyle}>
                <div className="handle"></div>
              </div>
            </div>
          </div>
          </div>
          <span id="remaining">0:30</span>
        </div>
        );
    }
  }
});

