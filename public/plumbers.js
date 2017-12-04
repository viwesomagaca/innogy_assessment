document.getElementById("reg").addEventListener("click", function() {
  //register a new Plumber
// var selected = [];
  var addName = document.querySelector(".plumberName");
  var addCellNumber = document.querySelector(".cellNumber");
  var weekdays = document.querySelector(".days:checked");
  var dailyslots = document.querySelector(".slot:checked");
  var display = document.querySelector(".output");

  // for(var i =0; i < weekdays.length; i++){
  //   selected.push(weekdays[i])
  // }
  // console.log(selected);


  var register = ({
    name: addName.value,
    cellNo: addCellNumber.value,
    slots: dailyslots.value,
    days: weekdays.value,
  });

  console.log(register)

  addName.value = "";
  addCellNumber.value = "";

  var message = "Plumber has been Added"


  $.ajax({
    url: "http://localhost:3007/api/plumbers",
    type: "POST",
    async: "true",
    dataType: "application/json",
    data: register,

    sucess: function(data) {
      display.innerHTML = message;
      alert("Plumber has been Registered!");
    }
  });
});


document.getElementById("find").addEventListener("click", function() {
var availablePlumbers = document.getElementById('plumberBook').innerHTML;
var template = Handlebars.compile(availablePlumbers);
var display = document.getElementById("display");
$.ajax({
  url: "http://localhost:3007/api/plumbers",
  type: "GET"
}).then(function(data) {
  console.log(data);
  var searched = template({
    plumbs:data
  });
  console.log(searched);
  display.innerHTML = searched;
})
})
