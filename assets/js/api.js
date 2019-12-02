const MapsSpec = {
  key: "AIzaSyDTUYF2-gvm3-YyMhkJ1iSkhs-Ir4ciCAI",
  baseUri: "https://maps.googleapis.com/maps/api",
  getImportUri: () =>
    `${MapsSpec.baseUri}/js?key=${MapsSpec.key}&libraries=places&callback=initMap`,
  geolocation: null,
  map: null
};

var service;
var infowindow;

/*
 * Attempt to get user geolocation & set MapsApi.geolocation
 */
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    MapsSpec.geolocation = position;
    initMap();
  });
}

function initMap() {
  if (MapsSpec.geolocation === null) return;
  console.log(MapsSpec.geolocation.coords);
  //const sydney = new google.maps.LatLng(-33.867, 151.195);

  var userLocation = new google.maps.LatLng(
    MapsSpec.geolocation.coords.latitude,
    MapsSpec.geolocation.coords.longitude
  );
  infowindow = new google.maps.InfoWindow();

  MapsSpec.map = new google.maps.Map(document.getElementById("map"), {
    center: userLocation,
    zoom: 15
  });

  var request = {
    query: "Starbucks",
    fields: ["name", "geometry"]
  };

  var service = new google.maps.places.PlacesService(MapsSpec.map);

  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      MapsSpec.map.setCenter(results[0].geometry.location);
    }
  });
}

function createMarker(place) {
  ``;
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: MapsSpec.map,
    position: place.geometry.location
    //Change marker icon
    // icon:'';
  });
}
