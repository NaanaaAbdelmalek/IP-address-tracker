// Variables declaration

const link_requested = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_vSnkFkVlFtyJwRZor8IauXyDuun0p';
const ip_input = document.getElementById("ip-input");
const search_button = document.getElementById("search-button");
let marker;


// render_data() will manipulate the DOM and set the fetched values to the information boards

function render_data(data){

  const boards = document.getElementsByClassName("board-part");

  boards[0].children[1].innerText = data.ip;
  boards[1].children[1].innerText = data.location.city;
  boards[1].children[2].innerText = data.location.postalCode;
  boards[2].children[1].innerText = "UTC" + " " + data.location.timezone; 
  boards[3].children[1].innerText = data.isp;

}

/*
 Fetching the data and rendering it using render_data()
 creating the map and set it's view by passing the fetched information
*/
fetch (link_requested)
  .then((response) => {
    if (response.ok){
      return response.json()
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then(data =>{

    ip_input.value = data.ip;
    render_data(data);

    const zoom = 3; 
    const map = L.map('map', {
      minZoom: zoom,
      maxZoom: 17, 
      zoomControl: false
    }).setView([data.location.lat, data.location.lng], zoom);

    L.control.zoom({
       position: 'bottomright' 
      }).addTo(map);

    marker = L.marker([data.location.lat, data.location.lng], {icon: L.icon({
      iconUrl:'images/icon-location.svg',
      iconSize: [38, 50] // size of the icon
    })}).addTo(map);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map);  
  
  })


/* 

Event Listner for the search button that will take the ip written in the input and fetch data related to this ip,
and after fetching data it will render it using render_data() and update the map marker

 */

search_button.addEventListener("click", function (){

  requested_link = link_requested + "&ipAddress=" + ip_input.value;

  fetch(requested_link)
  .then((response) => {
    if (response.ok){
    return response.json()
    } else {
    throw new Error("NETWORK RESPONSE ERROR");
  }})
  .then(data => {
    
    render_data(data);
    var newLatLng = new L.LatLng(data.location.lat, data.location.lng);
    marker = marker.setLatLng(newLatLng);

  });

})
