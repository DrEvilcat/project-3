console.log("Running Map");
let myMap = L.map("uncertainty_map", {
    center: [1, 1],
    zoom: 1
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  let url = "/api/v1.0/stationdata";

  
  d3.json(url).then(function(response) {
    console.log("D3");
    console.log(response);
  });
