const MapsApi = {
  key: "AIzaSyDTUYF2-gvm3-YyMhkJ1iSkhs-Ir4ciCAI",
  baseUri: "https://maps.googleapis.com/maps/api",
  getImportUri: () =>
    `${MapsApi.baseUri}/js?key=${MapsApi.key}&libraries=places&callback=initMap`,
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
    MapsApi.geolocation = position;
    initMap()
  });
}

function initMap() {
  console.log(MapsApi.geolocation.coords);
  //   var sydney = new google.maps.LatLng(-33.867, 151.195);

  var userLocation = new google.maps.LatLng(
    MapsApi.geolocation.coords.latitude,
    MapsApi.geolocation.coords.longitude
  );
  infowindow = new google.maps.InfoWindow();

  MapsApi.map = new google.maps.Map(document.getElementById("map"), {
    center: userLocation,
    zoom: 15
  });

  var request = {
    query: "Starbucks",
    fields: ["name", "geometry"]
  };

  var service = new google.maps.places.PlacesService(MapsApi.map);

  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      MapsApi.map.setCenter(results[0].geometry.location);
    }
  });
}

function createMarker(place) {
  ``;
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: MapsApi.map,
    position: place.geometry.location
    //Change marker icon
    // icon:'';
  });
}
