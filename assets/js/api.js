var map;
var service;
var infowindow;



//check if geolocation is available
if (navigator.geolocation) { 
    navigator.geolocation.getCurrentPosition(function(position){
      //Retrieve position properties
      initMap(position);
      //Retrieve lat & long
    });   
}


function initMap(position) {
    console.log(position.coords);
//   var sydney = new google.maps.LatLng(-33.867, 151.195);
    
var sydney = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(
      document.getElementById('map'), {center: sydney, zoom: 15});

  var request = {
    query: 'Starbucks',
    fields: ['name', 'geometry'],
  };

  var service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  });
}



function createMarker(place){
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
        //Change marker icon
        // icon:'';
    });
}
