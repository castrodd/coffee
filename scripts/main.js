(function(window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;
  var remoteDB = new RemoteDataStore(SERVER_URL);
  var localDB = new DataStore();
  var myTruck = new Truck('Falcon', remoteDB);
  window.myTruck = myTruck;
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR);

  formHandler.addSubmitHandler(function(data) {
    return myTruck.createOrder.call(myTruck, data).then(function () {
      checkList.addRow.call(checkList, data);
    },
    function () {
      alert('Server unavailable. Please try again later.');
    });
  });

  formHandler.addInputHandler(Validation.isCompanyEmail);

  $('#emailInput').blur(function() {
    $("#emailInput").addClass('error');
    remoteDB.get($('#emailInput')[0]['value'])
    .done(function(data) {
      if (!data) {
        $("#emailInput").removeClass('error');
        console.log("Email available.");
      } else {
        console.log("Email in db.");
        $(":submit").click(function(e){
          alert('Email has a pending order.');
          e.preventDefault();
        });
      }
    });
  });

  myTruck.printOrders(checkList.addRow.bind(checkList));

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

// Validate email address server-side
// $(document).ready(function() {
//   $("#emailInput").addClass('error');
//
//   $('#emailInput').change(function() {
//     remoteDB.get(myTruck.checkUser($('#emailInput')[0]['value']))
//     .done(function(data) {
//       if (!data.responseJSON) {
//         $('#emailInput').removeClass('error');
//       }
//     });
//   });
// });
