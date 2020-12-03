
  mapboxgl.accessToken = mapToken;
  console.log(campstring);
  var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: campstring.geometry.coordinates, // starting position [lng, lat]
  zoom: 10 // starting zoom
  });

  map.addControl(new mapboxgl.NavigationControl());

  var marker = new mapboxgl.Marker()
  .setLngLat(campstring.geometry.coordinates)
  .addTo(map); // add the marker to the map