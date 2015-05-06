var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var ArtistActions = {
  follow: function(artistId) {
    // optimistic: see https://news.ycombinator.com/item?id=7721381
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ARTIST_FOLLOW,
      artistid: artistid
    });
  },

  unfollow: function(artistId) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ARTIST_UNFOLLOW,
      artistid: artistid
    });
  },
};

module.exports = ArtistActions;
