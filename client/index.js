const mapboxgl = require('mapbox-gl');
const buildMarker = require('./marker.js');

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3Vhbmd6IiwiYSI6ImNqOGMydThyZzA1bDAzM2xidW9pN3hwN2IifQ.6okZaaQq2-Ie5H43EZRuIQ';//"YOUR API TOKEN HERE";

const map = new mapboxgl.Map({
  container: 'map',
  center: [-74.009, 40.705], // FullStack coordinates
  zoom: 12, // starting zoom
  style: 'mapbox://styles/mapbox/light-v9'
});





var attractionsObj = {
  hotels: [],
  activities: [],
  restaurants: []
};

const attractionTypes = ['hotels', 'restaurants', 'activities'];

document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/attractions')
    .then(res => res.json())
    .then(attractions => {
      attractionTypes.forEach((attractionType) => {
       attractionsObj = attractions;
        attractionsObj[attractionType].forEach(attraction => {
          const option = document.createElement('option');
          option.innerText = attraction.name;
          option.value = attraction.id;
          const select = document.getElementById(`${attractionType}-choices`);
          select.appendChild(option);
      });
    });
  })
  .catch(console.error);

  attractionTypes.forEach(attractionType => {
    const btn = document.getElementById(`${attractionType}-add`);
    btn.onclick = () => {
      const select = document.getElementById(`${attractionType}-choices`);
      const selected = select.value;
      const item = document.createElement('li');
      const attraction = attractionsObj[attractionType].find(el => el.id == selected);
      item.innerText = attraction.name;
      const list = document.getElementById(`${attractionType}-list`);
      list.appendChild(item);

      const marker = buildMarker(attractionType, attraction.place.location);
      marker.addTo(map);

      const remove = document.createElement('button');
      remove.innerText = 'x';

      remove.onclick = () => { item.remove(); };
      item.appendChild(remove);
      marker.remove();
    };
  });
      const activityMarker = buildMarker('activities', [activityValue[0], activityValue[1]]);
      activityMarker.addTo(map);
});
//hotels-choices restaurants-choices activities-choices
