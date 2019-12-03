var map;
var infowindow = new google.maps.InfoWindow();

var request;
var service;
var markers = [];

function initialize() {
  var center = new google.maps.LatLng(39.3259, -76.6216);
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 15
  });

  service = new google.maps.places.PlacesService(map);

  google.maps.event.addListener(map, "click", function(event) {
    map.setCenter(event.latLng);
    clearResults(markers);

    var request = {
      location: event.latLng,
      radius: 4828.03,
      types: ["restaurant", "cafe", "food"]
    };
    service.nearbySearch(request, callback);
  });
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      markers.push(createMarker(results[i]));
    }
  }
}

let onStoreNameUpdate = name => {};

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    icon: "http://maps.google.com/mapfiles/kml/pal2/icon32.png",
    position: place.geometry.location
  });
  console.log(place);
  console.log(
    "marker " +
      markers.length +
      " name=" +
      place.name +
      " coordinates=" +
      place.geometry.location.toUrlValue(6) +
      ", latitude=" +
      place.geometry.location.lat() +
      ", longitude=" +
      place.geometry.location.lng()
  );
  marker.addListener("click", function() {
    infowindow.open(map, marker);
    infowindow.setContent(place.name);
    user.store = place.name;
    onStoreNameUpdate(place.name);
  });
  return marker;
}

function clearResults(markers) {
  for (var m in markers) {
    markers[m].setMap(null);
  }
  markers = [];
}

// GET POSITION
infoWindow = new google.maps.InfoWindow();

// Try HTML5 geolocation.
function loadGeoLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent("You Are Here");
        infoWindow.open(map);
        map.setCenter(pos);
      },
      function() {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

//google.maps.event.addDomListener(window, "load", initialize);

//   //check if geolocation is available
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(function(position){
//     //Retrieve position properties
//     initMap(position);
//     //Retrieve lat & long
//     console.log(position);
//     });
// }

// var map;
// var service;
// var infowindow;

// function initMap(position) {
//   var userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

//   map = new google.maps.Map(document.getElementById('map'), {
//       center: userLocation,
//       zoom: 15
//     });
//   var marker = new google.maps.Marker({
//     position: userLocation,
//     map: map,
//   });
//   var request = {
//     position: location,
//     radius: '5000',
//     type: ['Starbucks']
//   };

//   service = new google.maps.places.PlacesService(map);
//   service.nearbySearch(request, callback);
// }

// function callback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       var place = results[i];
//       createMarker(results[i]);
//     }
//   }
// }
