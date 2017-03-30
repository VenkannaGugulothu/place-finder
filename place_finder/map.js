var map;
var infoWindow;
var service;


function initialize() {
  
  console.log(' I am initializing with type:'+type+" address :"+address+", latitude :"+latitude+", longitude"+longitude);
  
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: new google.maps.LatLng(latitude, longitude),
    zoom: 16,          
  });

  infoWindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);

  google.maps.event.addListener(map, 'idle', performSearch);

}

function performSearch() {
  var request = {
    bounds: map.getBounds(),
    types: [type] 
  };
  service.radarSearch(request, callback);
}


function callback(results, status) {
  if (status != google.maps.places.PlacesServiceStatus.OK) {
    alert(status);
    return;
  }

  for (var i = 0, result; result = results[i]; i++) {
      createMarker(result);
  }

}

function createMarker(place) {

  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, 'click', function() {
    service.getDetails(place, function(result, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        alert(status);
        return;
      }
      infoWindow.setContent(result.name);
      infoWindow.open(map, marker);
    });
  });

}
