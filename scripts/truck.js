(function(window) {
  'use strict';
  var App = window.App || {};

  function Truck(truckId, db) {
    this.truckId = truckId;
    this.db = db;
    this.users = {};
  }

  Truck.prototype.createOrder = function(order) {
    console.log('Adding order for ' + order.emailAddress);
    this.db.add(order.emailAddress, order);
  };

  Truck.prototype.deliverOrder = function(customerId) {
    if (customerId !== undefined) {
      console.log('Delivering order for ' + customerId);
      this.db.remove(customerId);
    } else {
      console.log('Missing customer ID');
    }
  };

  Truck.prototype.printOrders = function() {
    var customerIdArray = Object.keys(this.db.getAll());

    console.log('Truck #' + this.truckId + ' has pending orders:');
    customerIdArray.forEach(function(id) {
      console.log(this.db.get(id));
    }.bind(this))
  };

  Truck.prototype.addUser = function(email) {
    this.users[email] = true;
  };

  Truck.prototype.checkUser = function(email) {
    if (this.users[email]) {
      return true;
    }
    return false;
  };

  App.Truck = Truck;
  window.App = App;

})(window);
