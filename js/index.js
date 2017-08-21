// declare variables and grab elements from html
// take zipcode from user and show the requested data

const $body = $("body");
const $zipCodeContainer = $(".zipCodeContainer");
const $input = $(".numInput");
const $button = $(".btn");
const $resultContainer = $(".resultContainer");
const $location = $(".location");
const $currentTemp = $(".currentTemp");
const $description = $(".description");
const $tempMin = $("#min");
const $tempMax = $("#max");
let cityOrZip = "";

$body.click(function(e) {
  e.preventDefault();
  // taking user input value and showing the results...
  if ($input.val().length > 1) {
    // removing and giving new classes so the input form get smaller goes up.....
    $zipCodeContainer
      .removeClass("zipCodeContainer")
      .addClass("newzipCodeContainer");
    $input.removeClass("numInput").addClass("newNumInput");
    $button.removeClass("btn").addClass("newBtn");

    // showing the results after 1s.....
    setTimeout(function() {
      $resultContainer.css({
        display: "flex"
      });
    }, 1000);

    //Condition to check the city or zipcode
    if (isNaN($input.val())) {
      cityOrZip = "q=";
      getAPI(cityOrZip, $input.val());
    } else {
      cityOrZip = "zip=";
      getAPI(cityOrZip, $input.val());
    }

    // Getting the jason value from zipcode API - https://openweathermap.org/
    function getAPI(cityOrZipCode, inputValue) {
      $.get(
        `http://api.openweathermap.org/data/2.5/weather?${cityOrZipCode +
          inputValue}&units=imperial&APPID=e366232d680aa61d2721833f06d4cd9e`,
        function(data) {
          $location.html(data.name);
          // Have the temperature turn blue if under 40, and red if above 90.
          let cond = (data.main.temp < 40)? $currentTemp.css("color","blue"):((data.main.temp > 90)? $currentTemp.css("color","red"):"");
          $currentTemp.html(Math.floor(data.main.temp));
          $description.html(data.weather[0].description);
          $tempMin.html(`Min: ${Math.floor(data.main.temp_min)}`);
          $tempMax.html(`Max: ${Math.floor(data.main.temp_max)}`);
          console.log(data.main.temp_max);
        }
      );

      // .done(function () {
      //     alert("second success");
      //   })
      //   .fail(function () {
      //     alert("error");
      //   })
      //   .always(function () {
      //     alert("finished");
      //   });
    }
  }
});
