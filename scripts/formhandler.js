(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }

    this.$formElement = $(selector);
    if (this.$formElement === 0) {
      throw new Error("Could not find element with " + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function (fn) {
    console.log("Setting submit handler for form");
    this.$formElement.on('submit', function(event) {
      event.preventDefault();
      var data = {};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });
      console.log(data);
      fn(data);
      this.reset();
      this.elements[0].focus();

      // Achievement modal
      if (data['size'] === 'grandisimo' && data['strength'] === '10') {
        $('#achievement').modal('show');
        $('.yes').on('click', function() {
          myTruck.addUser(data['emailAddress']);
          console.log('Added Special User');
        });
      }
    })
  };

  FormHandler.prototype.addInputHandler =  function (fn) {
    console.log("Setting input handler for form");
    this.$formElement.on('input', '[name="emailAddress"]', function(event) {
      var emailAddress = event.target.value;
      var message = '';
      if (fn(emailAddress)) {
        event.target.setCustomValidity('');
      } else {
        message = emailAddress + ' is not an authorized email address.';
        event.target.setCustomValidity(message);
      }
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
}) (window);
