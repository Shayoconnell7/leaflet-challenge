
// var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=1994-12-01&endtime=2014-12-01";
var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-07-01&endtime=" +
  "2020-07-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

d3.json(queryUrl, function(data) {
//   createFeatures(data.features);
  console.log(data);

  L.geoJson(data,{
      pointToLayer: function(feature, latlng){
          return L.circleMarker(latlng);
      },
    //   style: styleInfo,
      onEachFeature: function(feature, layer){
          layer.bindPopup(
              "Magnitude: "
              + feature.properties.mag
              + "<br>Depth: "
              + feature.geometry.coordinates[2]
              +"<br>Location "
              +feature.properties.place
          );
      }
  }).addTo(myMap)
});

// function styleInfo(feature) {
//     return {
//       opacity: 1,
//       fillOpacity: 1,
//       fillColor: getColor(feature.geometry.coordinates[2]),
//       color: "#000000",
//       radius: getRadius(feature.properties.mag),
//       stroke: true,
//       weight: 0.5
//     };
//   };


// function createFeatures(earthquakeData) {

//   function onEachFeature(feature, circle) {
//     var circle = L.circleMarker([feature.geometry.coordinates[0],feature.geometry.coordinates[1]],{
//         color: 'red',
//         fillColor: '#f03',
//         fillOpacity: 0.5,
//         radius: feature.properties.mag*3,
//     });
//     circle.bindPopup("<h3>" + feature.properties.place +
//       "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");

//   };
//   var earthquakes = L.geoJSON(earthquakeData, {
//     onEachFeature: onEachFeature
//   });
  

//   createMap(earthquakes);
// }

function createMap(earthquakes) {


   

//     // # first cut the continuous variable into bins
//     // # these bins are now factors
//     magnitudes <- cut(last$BeatHome, 
//                         c(2.5,5.4,6.0,6.9,7.9,100), include.lowest = T,
//                         labels = c('<2.5', '2.5-5.4', '5.5-6.0', '6.0-6.9', '7-7.9','8+'))

// // # then assign a palette to this using colorFactor
// // # in this case it goes from red for the smaller values to yellow and green
// // # standard stoplight for bad, good, and best
//     magCol <- colorFactor(palette = 'RdYlGn', magnitudes)


//     m1 <- leaflet() %>%
//         addTiles() %>%
//         addProviderTiles(providers$OpenStreetMap, group = 'Open SM')  %>%
//         addProviderTiles(providers$Stamen.Toner, group = 'Toner')  %>%
//         addProviderTiles(providers$Esri.NatGeoWorldMap, group = 'NG World') %>%
//         setView(lng = -72, lat = 41, zoom = 8) %>%

//       addCircleMarkers(data = Jun, lat = ~Lat, lng = ~Lon,
//                        color = ~beatCol(BeatHomeLvl), popup = Jun$Popup,
//                        radius = ~sqrt(BeatHome*50), group = 'Home - Jun') %>%


//                        addLegend('bottomright', pal = magCol, values = magnitudes,
//                        title = 'Earthquake Magnitudes',
//                        opacity = 1)

  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });


  var baseMaps = {
    "Street Map": streetmap
  };

  var overlayMaps = {
    Earthquakes: earthquakes
  };

  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

//   Create a layer control
//   Pass in our baseMaps and overlayMaps
//   Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
