var map;
var markers = [];
var infoWindow;

function initMap() {
    var SL = {lat: 6.927079, lng: 80.7718};
    map = new google.maps.Map(document.getElementById('map'), {
        center: SL,
        zoom: 4,
    });
    infoWindow = new google.maps.InfoWindow();
    showMarkers()
}


function createMarker(latlng, name, death , countryCode) {
    var html = `${name} <br> Death: ${death}`;
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        label:countryCode,
    });
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
    markers.push(marker);
  
}

function showMarkers(){
    statistics.forEach(function(country){
        var latlng = new google.maps.LatLng(
            country.lat,
            country.lng,)

        var name = country.country
        var death = country.totalDeaths
        var countryCode = country.countryCode
        createMarker(latlng , name , death , countryCode)
    })
}

function setContent(){
    var content = ''
    statistics.forEach(function(country){
        content += `
        <div class="info-list">
            <div class="info-title">
                <div class="info-title-name">Sri Lanka</div>
            </div>
            <div class="info-stats">
                <div class="info-confirmed">
                    <i class="fas fa-virus"></i>
                    120,455
                </div>
                <div class="info-recovered">
                    <i class="fas fa-thumbs-up"></i>
                    255,455
                </div>
                <div class="info-death">
                    <i class="fas fa-skull"></i>
                    1,247
                </div>
            </div>
        </div>`

    })
}

