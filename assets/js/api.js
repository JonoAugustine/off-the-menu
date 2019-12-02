var map;
var latitude;
var longitude;

    if (navigator.geolocation) { 
    navigator.geolocation.getCurrentPosition(function(position){
      //Retrieve position properties
      latitude = parseInt(position.coords.latitude);
      latitude = parseInt(position.coords.longitude);
      console.log(latitude);
      console.log(longitude);
      longitude = parseInt(position.coords.longitude);
      //Retrieve lat & long
      console.log(position);
      });   
  }

function initMap() {

  // Create the map.
  var pyrmont = {lat: latitude, lng: longitude};
  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15
  });

  // Create the places service.
  var service = new google.maps.places.PlacesService(map);
  var getNextPage = null;
  var moreButton = document.getElementById('more');
  moreButton.onclick = function() {
    moreButton.disabled = true;
    if (getNextPage) getNextPage();
  };

  // Perform a nearby search.
  service.nearbySearch(
      {location: pyrmont, radius: 500, type: ['restaurant']},
      function(results, status, pagination) {
        if (status !== 'OK') return;

        createMarkers(results);
        moreButton.disabled = !pagination.hasNextPage;
        getNextPage = pagination.hasNextPage && function() {
          pagination.nextPage();
        };
      });
}

function createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();
  var placesList = document.getElementById('places');

  for (var i = 0, place; place = places[i]; i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });

    var li = document.createElement('li');
    li.textContent = place.name;
    placesList.appendChild(li);

    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);
}













// // // $(document).ready(function(){


// //   //check if geolocation is available
//   if (navigator.geolocation) { 
//     navigator.geolocation.getCurrentPosition(function(position){
//       //Retrieve position properties
//       initMap(position);
//       //Retrieve lat & long
//       console.log(position);
//       });   
//   }

//   function initMap(position) {
//     var userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: userLocation,
//         zoom: 15
//       });
//     var marker = new google.maps.Marker({
//         position: userLocation,
//     });
    
//     // To add the marker to the map, call setMap();
//     marker.setMap(map)
//   }

