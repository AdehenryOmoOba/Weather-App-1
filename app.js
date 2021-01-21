window.addEventListener("load", () => {
  let lat;
  let long;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegrees = document.querySelector(".temperature-degrees");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".degree-section");
  let temperatureValue = document.querySelector("span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      //   console.log(position);
      lat = position.coords.latitude;
      long = position.coords.longitude;
      const apiURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=931eea13890382105ce88fbe8b88e09e`;

      fetch(apiURL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //   console.log(data);
          const { temp } = data.main;
          const { description } = data.weather[0];
          temperatureDegrees.textContent = Math.floor(temp);
          temperatureDescription.textContent = description;
          locationTimezone.textContent = data.sys.country;
          // Formula for celcius
          let celcius = temp - 273;

          // Change temperature to celcius/Fahrenheit
          temperatureSection.addEventListener("click", () => {
            if (temperatureValue.innerText === "°F") {
              temperatureValue.innerText = "°C";
              temperatureDegrees.innerText = Math.round(celcius);
            } else {
              temperatureValue.innerText = "°F";
              temperatureDegrees.innerText = Math.round(temp);
            }
          });
        });
    });
  } else {
    h1.textContent = "Geolocation Is Not Available In Your Location";
  }
});
