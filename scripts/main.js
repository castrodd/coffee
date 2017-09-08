(function(window) {
  'use strict';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var myTruck = new Truck('Falcon', new DataStore());
  window.myTruck = myTruck;

}) (window);

var button = document.querySelector('.reset');

var slider = new Slider('#strengthLevel', {
formatter: function(value) {
  return 'Current value: ' + value;
}
});

button.addEventListener('click', function() {
  slider.setValue(5);
})
