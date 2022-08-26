const mapOptions = {
    center: [43.73183624266496, 7.412347601691828],
    zoomControl: false,
    zoom: 17  
  }

const tileOptions = {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}

const markerIcon = L.icon({
  iconUrl:'images/icon-location.svg',
  iconSize:     [38, 50] // size of the icon
}) 


const map = L.map('map', mapOptions);
const marker = L.marker(mapOptions.center, {icon: markerIcon}).addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', tileOptions).addTo(map);