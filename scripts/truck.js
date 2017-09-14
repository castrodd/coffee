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
    return this.db.add(order.emailAddress, order);
  };

  Truck.prototype.deliverOrder = function(customerId) {
    if (customerId !== undefined) {
      console.log('Delivering order for ' + customerId);
      return this.db.remove(customerId);
    } else {
      console.log('Missing customer ID');
    }
  };

  Truck.prototype.printOrders = function(printFn) {
    return this.db.getAll().then(function(orders) {
      var customerIdArray = Object.keys(orders);

      console.log('Truck #' + this.truckId + ' has pending orders:');
      customerIdArray.forEach(function(id) {
        console.log(orders[id]);
        if (printFn) {
          printFn(orders[id]);
        }
      }.bind(this));
    }.bind(this));
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
