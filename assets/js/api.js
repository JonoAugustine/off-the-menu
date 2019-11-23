function initMap(){
    //Map options
    var options = {
        zoom :8,
        center:{lat: 42.3601, lng:-71.0589}
        }
    var map = new google.maps.Map(document.getElementById('map'),options);
    
    //Add marker
    var marker = new google.maps.Marker({
    position:{lat: 42.4668, lng:-70.9495},
    map:map,
    //Change marker icon
    //icon:''
    });

    var infoWindow = new google.maps.infoWindow({
    content:'<h1>Lynn MA</h1>'
    });

    marker.addListener('click',function(){
        infoWindow.open(map,marker);
    });
}