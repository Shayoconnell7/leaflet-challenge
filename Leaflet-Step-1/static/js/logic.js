var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-07-01&endtime=" +
  "2020-07-31&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";
d3.json(queryUrl, function(data) {
    createFeatures(data.features);
  console.log(data);
});
function createFeatures(earthquakeData) {
    function styleInfo(feature) {
        return {
        opacity: 1,
        fillOpacity: .5,
        fillColor: getColor(feature.properties.mag),
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
        };
    };
    function getColor(magnitude) {
        switch (true){
            case magnitude > 5:
                return "#bc0000";
            case magnitude > 4:
                return "#c6060e";
            case magnitude > 3:
                return "#ce131a";
            case magnitude > 2:
                return "#db2f2d";
            case magnitude > 1:
                return "#dd4035"; 
            default:
                return "#d26740";
        }
    };
        function getRadius(magnitude){
            return (magnitude*6)
        };
    var earthquakes = L.geoJson(earthquakeData,{
        pointToLayer: function(feature, latlng){
            return L.circleMarker(latlng);
      },
    style: styleInfo,
    onEachFeature: function(feature, layer){
        layer.bindPopup(
            "Magnitude: "
            + feature.properties.mag
            + "<br>Depth: "
            + feature.geometry.coordinates[2]
            +"<br>Location "
            + feature.properties.place
            +"<br>Time "
            + Date(feature.properties.time)
        );
      },
    });
    
  var overlayMaps = {
    Earthquakes: earthquakes
  };

var map = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

    var legend = L.control({position:'bottomright'});
    legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5],
        labels = ["<1", ">1", ">2", ">3", ">4", ">5" ];
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            'Magnitude <i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br><br>' : '+');
    }
    return div;
    };
    legend.addTo(map);
}

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
  




























// var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-07-01&endtime=" +
//   "2020-07-31&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// d3.json(queryUrl, function(data) {
//     createFeatures(data.features);
//   console.log(data);
// });



// function createFeatures(earthquakeData) {

    

//     function styleInfo(feature) {
//         return {
//         opacity: 1,
//         fillOpacity: .5,
//         fillColor: getColor(feature.properties.mag),
//         radius: getRadius(feature.properties.mag),
//         stroke: true,
//         weight: 0.5
//         };
//     };
//     function getColor(magnitude) {
//         switch (true){
//             case magnitude > 5:
//                 return "#bc0000";
//             case magnitude > 4:
//                 return "#c6060e";
//             case magnitude > 3:
//                 return "#ce131a";
//             case magnitude > 2:
//                 return "#db2f2d";
//             case magnitude > 1:
//                 return "#dd4035"; 
//             default:
//                 return "#d26740";
//         }
//     };
//         function getRadius(magnitude){
//             return (magnitude*6)
//         };

    
//     var earthquakes = L.geoJson(earthquakeData,{
//         pointToLayer: function(feature, latlng){
//             return L.circleMarker(latlng);
//       },
//     style: styleInfo,
//     onEachFeature: function(feature, layer){
//         layer.bindPopup(
//             "Magnitude: "
//             + feature.properties.mag
//             + "<br>Depth: "
//             + feature.geometry.coordinates[2]
//             +"<br>Location "
//             + feature.properties.place
//             +"<br>Time "
//             + Date(feature.properties.time)
//         );
//       },

//     });

// // createMap(earthquakes);

//     var legend = L.control({position:'bottomleft'});

//     legend.onAdd = function() {

//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = [0, 1, 2, 3, 4, 5, ],
//         labels = ["<1", ">1", ">2", ">3", ">4", ">5" ];

//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
//             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//     }

//     return div;
//     };

//     legend.addTo(map);
   

// }

// var map = L.map("map", {
//     center: [
//       37.09, -95.71
//     ],
//     zoom: 5,
//     layers: [streetmap, earthquakes]
//   });
// var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
//   });

// var baseMaps = {
//     "Street Map": streetmap
//   };

// var overlayMaps = {
//     Earthquakes: earthquakes
//   };



// L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(map);


