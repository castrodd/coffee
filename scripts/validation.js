(function (window) {
  'use strict';
  var App = window.App || {};
  var RemoteDataStore = App.RemoteDataStore

  var Validation = {
    isCompanyEmail: function(email) {
      return /.+@coffee\.org$/.test(email);
    }
  }

  App.Validation = Validation;
  window.App = App;
})(window);
