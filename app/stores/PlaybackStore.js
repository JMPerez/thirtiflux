var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var track = null;

var audio = new Audio(null);


var PlaybackStore = assign({}, EventEmitter.prototype, {
  
  getNowPlaying: function() {
    return {
      track: track,
      position: audio !== null ? audio.currentTime : null,
      playing: !(audio.paused)
    };
  },
  
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var text;

    switch(action.actionType) {
      case AppConstants.PLAY_TRACK:
        track = action.track;

        //todo: move this to a playback component
        audio.src = track.preview_url;
        audio.play();
        PlaybackStore.emitChange();
        break;

      // add more cases for other actionTypes, like TODO_UPDATE, etc.
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

audio.addEventListener('timeupdate', function() {
  PlaybackStore.emitChange();
});


module.exports = PlaybackStore;