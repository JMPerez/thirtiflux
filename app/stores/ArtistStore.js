var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

/**
 * Follow an artist
 * @param {string} artistId The id of the artist to follow
 */
function follow(artistId) {
    // call the web api
}

/**
 * Unfollow an artist
 * @param {string} id
 */
function unfollow(artistId) {
  // call the web api
}

var ArtistStore = assign({}, EventEmitter.prototype, {
  
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
      case AppConstants.ARTIST_FOLLOW:
        text = action.text.trim();
        if (text !== '') {
          create(text);
          ArtistStore.emitChange();
        }
        break;

      case AppConstants.ARTIST_UNFOLLOW:
        destroy(action.id);
        ArtistStore.emitChange();
        break;

      // add more cases for other actionTypes, like TODO_UPDATE, etc.
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = TodoStore;