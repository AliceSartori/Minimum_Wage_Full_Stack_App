// Adding base layer

var State = new L.layerGroup();
var Federal  = new L.layerGroup();

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
})

// // Load in geojson data
// var geoData = "./static/data/" + year + ".geojson";
var geoData = "./static/data/minwage2try.geojson";
// var FederalchoroplethLayer ;
var myMap ;

var year = 1970;
var StatechoroplethLayer;
var FederalchoroplethLayer;
var list = [];
for (var i = 1970; i <= 2020; i++) {
  list.push(i);
}
//
var select = d3.select("#years");
var option = select.selectAll("option")
  .data(list)
  .enter()
  .append("option")
  .text(function(d) {
    return d;
  });
select.on("change", handleSubmit);
function handleSubmit() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // d3.select('.leaflet-control').html("");
    var id_select = select.node().value;
    // var geoData = "./static/data/" + id_select + ".geojson";
    testLayer.remove();
    myMap.removeLayer(StatechoroplethLayer)
    myMap.removeLayer(FederalchoroplethLayer)
    colormap(geoData, id_select);
  }


colormap(geoData, year );
// function colormap(geoData){


// = L.control({ position: "bottomright"});
var testLayer ;
function colormap(geoData, year){
  d3.json(geoData , function(response) {
    console.log(response);
        var layers = [];
        var baselayers = {}
        // for (var i = 1970; i <= 2020; i++) {
        StatechoroplethLayer = L.choropleth(response, {
            filter: function(feature, layer) {
              if(feature.properties.Year == year){
                return true;
              }
            },
            style :function style(feature) {
              return {
                  fillColor: getColor(feature.properties['State.Minimum.Wage']),
                  weight: 2,
                  opacity: 1,
                  color: 'white',
                  dashArray: '3',
                  fillOpacity: 0.7
              };
            },
            onEachFeature: function(feature, layer) {

              var value_string = " Year: "+ feature.properties.Year +" <hr>State: " + feature.properties.State + " <hr>"+
              "State Minimum Wage: $" + feature.properties['State.Minimum.Wage']+ "<hr>"+
              "State Average $ by Decade : $" + feature.properties['State_Average_by_Decade'] + "<hr>"+
              "State Median $ by Decade : $" + feature.properties['State_Median_by_Decade']

              layer.bindPopup(value_string);
            }
        })


        FederalchoroplethLayer = L.choropleth(response, {
          filter: function(feature, layer) {
            if(feature.properties.Year == year){
              return true;
            }
          },
          style :function style(feature) {
            return {
                fillColor: getColor(feature.properties['Federal.Minimum.Wage']),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
          },
          // Define what  property in the features to use
          // valueProperty: test_string ,
          // // Set color scale
          // scale: ["white", "red"],
          // // // Number of breaks in step range
          // steps: 5,
          // // q for quartile, e for equidistant, k for k-means
          // mode: "q",
          // style: {
          //   // Border color
          //   color: "#fff",
          //   weight: 1,
          //   fillOpacity: 0.7
          // },
        // Binding a pop-up to each layer
        onEachFeature: function(feature, layer) {

            var value_string = " Year: "+ feature.properties.Year +" <hr>State: " + feature.properties.State + " <hr>"+
            "Federal Minimum Wage: $" + feature.properties['Federal.Minimum.Wage']+ "<hr>"+
            "Federal Average $ by Decade : $" + feature.properties['Federal_Average_by_Decade'] + "<hr>"+
            "Federal Median $ by Decade : $" + feature.properties['Federal_Median_by_Decade']
            layer.bindPopup(value_string);
          // }
        }
      })
        // layers.push(StatechoroplethLayer)
      baselayers["state"] = StatechoroplethLayer;
      baselayers["federal"] = FederalchoroplethLayer;
      // }
      // createMap(layers , baselayers);
      // L.control.layers({}).addTo(myMap)
      testLayer = L.control.layers(baselayers, null, {collapsed: false}).addTo(myMap);
      StatechoroplethLayer.addTo(myMap)
  });
}

// function createMap(state_layers , base_layers){
//
// //layers
//
//   // var state_group = L.layerGroup(state_layers);
//   //
//   // state_baseMaps = {
//   //   "State": state_group,
//   // };
//   // //
//   // console.log(baseMaps)
//
//
//   L.control.layers(base_layers,{
//     // collapsed: false,
//   }).addTo(myMap)
//
//   // L.control.layers(overlaymaps,baseMaps,{
//   //   collapsed: false,
//   // }).addTo(myMap)
// }


myMap = L.map("map", {
  center: [50.5994, -101.6731],
  zoom:4,
  // layers: federal_layers.slice(0,1)
  // layers: [lightmap,base_layers['state']]
  layers:lightmap
  // layers: [lightmap, StatechoroplethLayer]
})



function getColor(d) {
    return d > 7 ? '#800026' :
           d > 6  ? '#BD0026' :
           d > 5  ? '#E31A1C' :
           d > 4  ? '#FC4E2A' :
           d > 3   ? '#FD8D3C' :
           d > 2   ? '#FEB24C' :
           d > 1   ? '#FED976' :
                      '#FFEDA0';
}



var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5, 6, 7],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};
legend.addTo(myMap);
