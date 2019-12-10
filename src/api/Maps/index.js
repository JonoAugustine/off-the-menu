const GoogleMapsApi = {
  infoWindow: new google.maps.InfoWindow(),
  defaultCenter: new google.maps.LatLng(39.3259, -76.6216),
  map: null,
  markers: [],
  service: null,
  selectionUpdateHooks: [],
  init: function() {
    this.map = new google.maps.Map(document.getElementById("map"), {
      center: this.defaultCenter,
      zoom: 15
    });

    this.service = new google.maps.places.PlacesService(this.map);

    google.maps.event.addListener(this.map, "click", function(event) {
      this.map.setCenter(event.latLng);
      this.clearResults();

      let request = {
        location: event.latLng,
        radius: 4828.03,
        types: ["restaurant", "cafe", "food"]
      };

      this.service.nearbySearch(request, (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          results.forEach(r => this.markers.push(this.createMarker(r)));
        }
      });
    });
  },
  addSelectionHook: function(hook) {
    this.selectionUpdateHooks.push(hook);
  },
  createMarker: function(place) {
    const marker = new google.maps.Marker({
      map: this.map,
      icon: "http://maps.google.com/mapfiles/kml/pal2/icon32.png",
      position: place.geometry.location
    });
    marker.addListener("click", () => {
      infowindow.open(map, marker);
      infowindow.setContent(place.name);
      user.store = place.name;
      selectionUpdateHooks.forEach(f => f());
    });
    return marker;
  },
  clearResults: function() {
    for (var m in markers) this.markers[m].setMap(null);
    this.markers = [];
  },
  loadGeoLocation: function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("You Are Here");
          infoWindow.open(this.map);
          this.map.setCenter(pos);
        },
        function() {
          handleLocationError(true, infoWindow, this.map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, this.map.getCenter());
    }
  }
};

export { GoogleMapsApi };
