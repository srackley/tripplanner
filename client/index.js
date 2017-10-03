const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker.js");

mapboxgl.accessToken = "pk.eyJ1IjoiZ3Vhbmd6IiwiYSI6ImNqOGMydThyZzA1bDAzM2xidW9pN3hwN2IifQ.6okZaaQq2-Ie5H43EZRuIQ"//"YOUR API TOKEN HERE";

const map = new mapboxgl.Map({
  container: "map",
  center: [-74.009, 40.705], // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
});

const marker = buildMarker("activities", [-74.009, 40.705]);
marker.addTo(map);
