var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var PlaybackActions = {
  playTrack: function(track) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.PLAY_TRACK,
      track: track,
      mp3: track.preview_url
    });
  }
};

module.exports = PlaybackActions;
