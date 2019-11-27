
$(document).ready(function(){



//   //check if geolocation is available
  if (navigator.geolocation) { 
    navigator.geolocation.getCurrentPosition(function(position){
      //Retrieve position properties
      initMap(position);
      //Retrieve lat & long
      console.log(position);
      });   
  }


  var map;
  var service;
  var infowindow;
  
  function initMap(position) {
    var userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  
    map = new google.maps.Map(document.getElementById('map'), {
        center: userLocation,
        zoom: 15
      });
    var marker = new google.maps.Marker({
      position: userLocation,
      map: map,
    });
    var request = {
      position: location,
      radius: '5000',
      type: ['Starbucks']
    };
  
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }
  
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        createMarker(results[i]);
      }
    }
  }

})