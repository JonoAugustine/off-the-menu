var map;
initMap();

function initMap(){
    // Map options
    var center = new google.maps.LatLng(37.422,-122.084058);
    map = new google.maps.Map(document.getElementById('map'),{
        center: center,
        zoom:8
   });
   //Googles request to find places
   var request = {
       location: center,
       //In meters ~5 miles
       radius:8047,
       //Category
       types: ['cafe']
   };

   var service = new google.maps.places.PlacesService(map);

   service.nearbySearch(request, callback);
}


//Retrieve and append to array of results
function callback(results,status){
    if(status == google.maps.places.PlacesServicesStatus.OK){
        for(var i = 0; i < results.length; i++){
            createMarker(results[i]);
        }
    }
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
    //Some stuff I'm trying to figure out:

    // var infoWindow = new google.maps.infoWindow({
    // content:'<h1>Lynn MA</h1>'
    // });

    // marker.addListener('click',function(){
    //     infoWindow.open(map,marker);
    // });

//check if geolocation is available
if (navigator.geolocation) { 
    navigator.geolocation.getCurrentPosition(function(position){
      //Retrieve position properties
      console.log(position);
    });   
}