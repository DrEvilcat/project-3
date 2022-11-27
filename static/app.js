console.log("Running Map");
let uncertaintyMap = L.map("uncertainty_map", {
    center: [-23.7, 132.8],
    zoom: 4
  });
let positionsMap = L.map("positions_map", {
  center: [-23.7, 132.8],
  zoom: 4
})
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(uncertaintyMap);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(positionsMap);
  
  let url = "/api/v1.0/var";
  let init = true;
  let uncertainties = [];
  let heatArray = [];
  let positionsArray = [];
  let markers = L.markerClusterGroup();
  let jsonResult;
  
  d3.json(url).then(function(response) {
    jsonResult = response;
    //Initialise Dropdown
    let dropdown = d3.select("#selDataset");
    if(init) {
        let dropdownText = '<option value="All">All</option>';
        let distinctStates = [...new Set(Object.values(response.region))]; 
        for(let j = 0; j < distinctStates.length; j++){
            dropdownText +=  '<option value="' + distinctStates[j] + '">' + distinctStates[j] + '</option>';
        }
        console.log(dropdownText);
        dropdown.html(dropdownText);
    }



    console.log(response);
    console.log(response.lat.length);
    for(let i = 0; i < Object.keys(response.lat).length; i++) {
      uncertainties.push(response.station_difference[i]);
      heatArray.push([response.lat[i],response.lon[i],response.station_difference[i]]);
      positionsArray.push([response.lat[i],response.lon[i],1]);

      markers.addLayer(L.marker([response.lat[i], response.lon[i]])
        .bindPopup("Mean Variation: " + response.station_difference[i]));

    }

    

    console.log(heatArray);
    console.log(positionsArray);
    maxDiff = Math.max.apply(null,uncertainties);
    /*
    let heat = L.heatLayer(heatArray, {
      radius: 40,
      max: maxDiff,
      gradient: {0.1: 'green', 1: 'red'}
    }).addTo(uncertaintyMap); */
    uncertaintyMap.addLayer(markers);

    let pos = L.heatLayer(positionsArray, {
      radius: 40,
      max: 1
    }).addTo(positionsMap);
    
    //Histogram
    var trace = {
      x: uncertainties,
      type: 'histogram'
    };

    var layout = {title: 'Mean Difference From Observed Temp',
  xaxis:{title: "Mean Difference (Degrees Celcius"},
  yaxis:{title: "Count Of Stations"}}
    Plotly.newPlot('histogram',[trace],layout)
  });



  
function optionChanged(state){
  jsonResult = jsonResult;


  let uncertainties = [];
  for(let i = 0; i < Object.keys(jsonResult.lat).length; i++) {
    if(jsonResult.region[i] == state || state == "All"){
      uncertainties.push(jsonResult.station_difference[i]);

    }

  }

      //Histogram
      var trace = {
        x: uncertainties,
        type: 'histogram'
      };
  
      var layout = {title: 'Mean Difference From Observed Temp',
    xaxis:{title: "Mean Difference (Degrees Celcius"},
    yaxis:{title: "Count Of Stations"}}
      Plotly.newPlot('histogram',[trace],layout)



}
