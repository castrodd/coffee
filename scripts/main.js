(function(window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var myTruck = new Truck('Falcon', new DataStore());
  window.myTruck = myTruck;
  var formHandler = new FormHandler(FORM_SELECTOR);

  formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
  console.log(formHandler);
}) (window);

// Allow range bar to slide and reset
var button = document.querySelector('.reset');
var slider = new Slider('#strengthLevel', {
formatter: function(value) {
  if (value <= 3) {
    $('.slider-selection').css('background', "rgb(126, 252, 153) none repeat scroll 0% 0% / auto padding-box border-box");
  } else if (value >= 7) {
    $('.slider-selection').css('background', "rgb(255, 89, 89) none repeat scroll 0% 0% / auto padding-box border-box");
  } else {
    $('.slider-selection').css('background', "rgb(248, 255, 147) none repeat scroll 0% 0% / auto padding-box border-box");
  }
  return value;
}
});

// Allow slider to change color
button.addEventListener('click', function() {
  slider.setValue(5);
})

// Achievement modal
