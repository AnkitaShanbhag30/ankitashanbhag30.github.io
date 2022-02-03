const issApi = 'http://api.open-notify.org/iss-now.json';
mapboxgl.accessToken = 'pk.eyJ1IjoiYW5raXRhc2hhbmJoYWciLCJhIjoiY2t5Yjc2eDN1MGNubDJwczBweWVkYXQxZCJ9.KxkL-J8P8WrHbBokN-KU3Q';
var location;
var marker;
var map;
var popup;
fetch(issApi)
    .then(res => res.json())
    .then(data => [parseFloat(data.iss_position.longitude, 10), parseFloat(data.iss_position.latitude, 10)])
    .then(function(location) {
      map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: location,
        zoom: 5,
      });
      var el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = 'url(satellite-icon.svg)';
      el.style.width = '50px';
      el.style.height = '50px';
      el.style.backgroundSize = '100%';
      marker = new mapboxgl.Marker(el)
       .setLngLat(location)
       .addTo(map);
      el.addEventListener('mouseover', function () {
        map.getCanvas().style.cursor = 'pointer';
        var coordinates = marker.getLngLat();
        popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        }).setLngLat(coordinates).setHTML(coordinates).addTo(map);
      });

        el.addEventListener('mouseout', function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
    }
).catch(err => console.error(err));
  
function move() {
  setTimeout(() =>{
  fetch(issApi)
      .then(res => res.json())
      .then(data => [parseFloat(data.iss_position.longitude, 10), parseFloat(data.iss_position.latitude, 10)])
      .then(function(location) {
        map.flyTo({center:location});
        marker.setLngLat(location);
        popup.setLngLat(location);
        popup.setHTML(location);
        move();
      }
  ).catch(err => console.error(err));
  }, 500);
}
  
  if (typeof module !== 'undefined') {
    module.exports = { move };
  }
  