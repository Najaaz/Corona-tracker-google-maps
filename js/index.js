var map;
var markers = [];
var infoWindow;
var found =[];

function initMap() {
    var SL = {lat: 6.927079, lng: 80.7718};
    map = new google.maps.Map(document.getElementById('map'), {
        center: SL,
        zoom: 3.5,
    });
    infoWindow = new google.maps.InfoWindow();
    
    var input = document.getElementById("country-code");
    input.addEventListener("keyup", function(event){
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("myBtn").click();
        }
    });

    showMarkers()
    setContent(statistics)
    setContentListener()
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

    setContent(found)
    setContentListener()
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

function setContent(statistic){
    var content = ''
    statistic.forEach(function(country){
        content += `
        <div class="info">
            <div class="info-list">
                <div class="info-title">
                    <div class="info-title-name">${country.country}</div>
                </div>
                <div class="info-stats">
                    <div class="info-confirmed">
                        <i class="fas fa-virus"></i>
                        ${country.totalConfirmed}
                    </div>
                    <div class="info-recovered">
                        <i class="fas fa-thumbs-up"></i>
                        ${country.totalRecovered}
                    </div>
                    <div class="info-death">
                        <i class="fas fa-skull"></i>
                        ${country.totalDeaths}
                    </div>
                </div>
            </div>
        </div>`

        document.querySelector(".country-container-list").innerHTML = content
    })
}

function searchCountry(){
    found = []
    var search_items = document.querySelector("#country-code").value 
    var search_item = search_items.toUpperCase()
    if (search_item){
        statistics.forEach(function(country){
            var country_name = country.country
            var country_uppper_name = country_name.toUpperCase()
            if (search_item == country_uppper_name){
                found.push(country)
            }
        })
    }else{
        setContent(statistics)
        alert("PLEASE INPUT A ZIPCODE")
    }

    if (found){
        setContent(found)
        console.log(found)
    }else{
        console.log("NOT FOUND")
    }
}

function setContentListener(){
    infoWindow.close()
    var selectedContent = document.querySelectorAll(".info")
    console.log(selectedContent)
    selectedContent.forEach(function(elem,index){
        elem.addEventListener("click" , function(){
            google.maps.event.trigger(markers[index] , "click")
        })
    })
}

