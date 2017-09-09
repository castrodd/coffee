(function(window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var CheckList = App.CheckList;
  var myTruck = new Truck('Falcon', new DataStore());
  window.myTruck = myTruck;
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR);

  formHandler.addSubmitHandler(function(data) {
    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });
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

// Allow slider and Special Options to reset
button.addEventListener('click', function() {
  slider.setValue(5);
  $('.special-options').css('display', 'none');
})


// Check for Special Users
$( "#emailInput" ).change(function() {
  console.log($('#emailInput')[0]['value']);
  if (myTruck.checkUser($('#emailInput')[0]['value'])) {
    $('.special-options').css('display', 'block');
  }
});
