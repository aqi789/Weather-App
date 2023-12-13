var inputVal = document.querySelector('#cityinput');
var submitBtn = document.querySelector('#submitBtn');
var outputSection = document.querySelector('#outputSection');
var city = document.querySelector('#cityoutput');
var description = document.querySelector('#description');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');
var errorMessage = document.querySelector('#error-message'); 
var apik = "8182b1454ea6b9a3360ff42374c1a711";

function convertion(val) {
  return (val - 273).toFixed(2);
}

submitBtn.addEventListener('click', function () {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputVal.value}&appid=${apik}`)
    .then(res => res.json())
    .then(data => {
      if (data['weather'] && data['weather'].length > 0) {
        var nameVal = data['name'];
        var descrip = data['weather'][0]['description'];
        var temperature = data['main']['temp'];
        var windSpeed = data['wind']['speed'];
        
        city.innerHTML = `Weather of <span>${nameVal}<span>`;
        temp.innerHTML = `Temperature: <span>${convertion(temperature)} C</span>`;
        description.innerHTML = `Sky Conditions: <span>${descrip}<span>`;
        wind.innerHTML = `Wind Speed: <span>${windSpeed} km/h<span>`;
        outputSection.style.maxHeight = '1000px';
        errorMessage.textContent = '';
      } else {
        throw new Error('Invalid response format from the API');
      }
    })
    .catch(err => {
        console.error(err); 
    
        if (err.status === 404) {
            errorMessage.textContent = 'City not found. Please check the city name and try again.';
        } else {
            errorMessage.textContent = 'An error occurred. Please try again later.';
        }
    
        outputSection.style.maxHeight = '0';
    });
});
