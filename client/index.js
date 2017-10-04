const mapboxgl = require('mapbox-gl');
const buildMarker = require('./marker.js');

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3Vhbmd6IiwiYSI6ImNqOGMydThyZzA1bDAzM2xidW9pN3hwN2IifQ.6okZaaQq2-Ie5H43EZRuIQ';//"YOUR API TOKEN HERE";

const map = new mapboxgl.Map({
  container: 'map',
  center: [-74.009, 40.705], // FullStack coordinates
  zoom: 12, // starting zoom
  style: 'mapbox://styles/mapbox/streets-v10' // mapbox has lots of different map styles available.
});

const marker = buildMarker('activities', [-74.009, 40.705]);
marker.addTo(map);

document.addEventListener('DOMContentLoaded', () => {
  //debugger;
  var hotelSelection = document.getElementById('hotels-choices');
  var activitySelection = document.getElementById('activities-choices');
  var restaurantSelection = document.getElementById('restaurants-choices');

  fetch('/api/attractions')
    .then(result => result.json())
    .then(data => {
      data.Hotel.forEach(element => {
        var option = document.createElement('option');
        option.text = element.name;
        option.value = element.place.location;

        hotelSelection.appendChild(option);
      }, this);

      data.Activity.forEach(element => {
        var option = document.createElement('option');
        option.text = element.name;
        option.value = element.place.location;
        activitySelection.appendChild(option);
      }, this);

      data.Restaurant.forEach(element => {
        var option = document.createElement('option');
        option.text = element.name;
        option.value = element;
        restaurantSelection.appendChild(option);
      }, this);


      console.log('----fetch request------', data.length);
    })
.catch(console.error);

    let hotelButton = document.getElementById('hotels-add');

    hotelButton.onclick = () => {
      let hotelValue = hotelSelection.value.split(',');
      const hotelMarker = buildMarker('hotels', [hotelValue[0], hotelValue[1]]);
      hotelMarker.addTo(map);

    };

    let restaurantButton = document.getElementById('restaurants-add');

    restaurantButton.onclick = () => {
      let restaurantLoc = restaurantSelection.value.place.location.split(',');
      const restaurantMarker = buildMarker('restaurants', [restaurantLoc[0], restaurantLoc[1]]);
      console.log(restaurantSelection.value)
      restaurantMarker.addTo(map);
    };

    let activityButton = document.getElementById('activities-add');

    activityButton.onclick = () => {
      let activityValue = activitySelection.value.split(',');
      const activityMarker = buildMarker('activities', [activityValue[0], activityValue[1]]);
      activityMarker.addTo(map);
    };


});
//hotels-choices restaurants-choices activities-choices
