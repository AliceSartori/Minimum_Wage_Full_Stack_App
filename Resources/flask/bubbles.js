// // set the dimensions and margins of the graph
// var margin = {top: 10, right: 100, bottom: 30, left: 30},
//     width = 460 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// var svg = d3.select("#chart")
// .append("svg")
// .attr("width", width + margin.left + margin.right)
// .attr("height", height + margin.top + margin.bottom)
// .append("g")
// .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// //Read the data
// d3.csv("minwage_code.csv", function(data) {

//     // List of groups (here I have one group per column)
//     var allGroup = ["valueA", "valueB", "valueC"]

//     // add the options to the button
//     d3.select("#selectButton")
//       .selectAll('myOptions')
//      	.data(allGroup)
//       .enter()
//     	.append('option')
//       .text(function (d) { return d; }) // text showed in the menu
//       .attr("value", function (d) { return d; }) // corresponding value returned by the button

//     // A color scale: one color for each group
//     var myColor = d3.scaleOrdinal()
//       .domain(allGroup)
//       .range(d3.schemeSet2);

//     // Add X axis --> it is a date format
//     var x = d3.scaleLinear()
//       .domain([0,10])
//       .range([ 0, width ]);
//     svg.append("g")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x));

//     // Add Y axis
//     var y = d3.scaleLinear()
//       .domain( [0,20])
//       .range([ height, 0 ]);
//     svg.append("g")
//       .call(d3.axisLeft(y));

//     // Initialize line with group a
//     var line = svg
//       .append('g')
//       .append("path")
//         .datum(data)
//         .attr("d", d3.line()
//           .x(function(d) { return x(+d.time) })
//           .y(function(d) { return y(+d.valueA) })
//         )
//         .attr("stroke", function(d){ return myColor("valueA") })
//         .style("stroke-width", 4)
//         .style("fill", "none")

//     // A function that update the chart
//     function update(selectedGroup) {

//       // Create new data with the selection?
//       var dataFilter = data.map(function(d){return {time: d.time, value:d[selectedGroup]} })

//       // Give these new data to update line
//       line
//           .datum(dataFilter)
//           .transition()
//           .duration(1000)
//           .attr("d", d3.line()
//             .x(function(d) { return x(+d.time) })
//             .y(function(d) { return y(+d.value) })
//           )
//           .attr("stroke", function(d){ return myColor(selectedGroup) })
//     }

//     // When the button is changed, run the updateChart function
//     d3.select("#selectButton").on("change", function(d) {
//         // recover the option that has been chosen
//         var selectedOption = d3.select(this).property("value")
//         // run the updateChart function with this selected option
//         update(selectedOption)
//     })

// })



// set the dimensions and margins of the graph
var margin = {top: 10, right: 20, bottom: 30, left: 50},
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
//Read the data
d3.csv('minwage_code.csv', function(error, data) {
  console.log(data);

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  // var unique = data.filter(onlyUnique);
  // console.log(unique);

  var stateMap = {};
  data.forEach(function(d){
    var state = d.State;
    // state.filter(onlyUnique);
    //console.log(state);
    stateMap[state]=[];
    var singleState = stateMap[state].push(state);
    //console.log(singleState);
  });


  var allGroup = (Object.keys(data[0]));
  let statelist = allGroup.splice(0,1);
  console.log(statelist);
  console.log(allGroup);

         // add the options to the button
         d3.select("#selectButton")
         .selectAll('myOptions')
            .data(allGroup)
         .enter()
           .append('option')
         .text(function (d) { return d; }) // text showed in the menu
         .attr("value", function (d) { return d; }) // corresponding value returned by the button
   
       // A color scale: one color for each group
       var myColor = d3.scaleOrdinal()
         .domain(allGroup)
         .range(d3.schemeSet2);

  // Add X axis
  var x = d3.scaleLinear()
    .domain([1970, 2020])
    .range([ 0, width ]);
    
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 15])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  //Add a scale for bubble size
  var z = d3.scaleLinear()
    .domain([200000, 1310000000])
    .range([ 1, 40]);

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.Year); } )
      .attr("cy", function (d) { return y(d.State_Minimum_Wage); } )
      // .attr("r", function (d) { return z(d.pop); } )
      .style("fill", "#69b3a2")
      .style("opacity", "0.7")
      .attr("stroke", "black")
    })

    function update(selectedGroup) {
    
      // Create new data with the selection?
      var dataFilter = data.map(function(d){return {Year: d.Year, value:d[selectedGroup]} })

      // Give these new data to update line
      line
          .datum(dataFilter)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(+d.Year) })
            .y(function(d) { return y(+d.value) })
          )
          .attr("stroke", function(d){ return myColor(selectedGroup) })
    }

    // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)
    })


// // set the dimensions and margins of the graph
// var margin = {top: 40, right: 150, bottom: 60, left: 30},
//     width = 1000 - margin.left - margin.right,
//     height = 1020 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// var svg = d3.select("#my_dataviz")
// .append("svg")
// .attr("width", width + margin.left + margin.right)
// .attr("height", height + margin.top + margin.bottom)
// .append("g")
// .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// //Read the data
// d3.csv("minwage_code.csv", function(data) {

//   // ---------------------------//
//   //       AXIS  AND SCALE      //
//   // ---------------------------//

//   // Add X axis
//   var x = d3.scaleLinear()
//     .domain([0, 45000])
//     .range([ 0, width ]);
    
//     svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x).ticks(3));

//   // Add X axis label:
//   svg.append("text")
//       .attr("text-anchor", "end")
//       .attr("x", width)
//       .attr("y", height+50 )
//       .text("Gdp per Capita");

//   // Add Y axis
//   var y = d3.scaleLinear()
//     .domain([35, 90])
//     .range([ height, 0]);
//   svg.append("g")
//     .call(d3.axisLeft(y));

//   // Add Y axis label:
//   svg.append("text")
//       .attr("text-anchor", "end")
//       .attr("x", 0)
//       .attr("y", -20 )
//       .text("State Minimum Wage")
//       .attr("text-anchor", "start")

//   // Add a scale for bubble size
//   var z = d3.scaleSqrt()
//     .domain([200000, 1310000000])
//     .range([ 2, 30]);

//   // Add a scale for bubble color
//   var myColor = d3.scaleOrdinal()
//     .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
//     .range(d3.schemeSet1);


//   // ---------------------------//
//   //      TOOLTIP               //
//   // ---------------------------//

//   // -1- Create a tooltip div that is hidden by default:
//   var tooltip = d3.select("#my_dataviz")
//     .append("div")
//       .style("opacity", 0)
//       .attr("class", "tooltip")
//       .style("background-color", "black")
//       .style("border-radius", "5px")
//       .style("padding", "10px")
//       .style("color", "white")

//   // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
//   var showTooltip = function(d) {
//     tooltip
//       .transition()
//       .duration(200)
//     tooltip
//       .style("opacity", 1)
//       .html("Country: " + d.country)
//       .style("left", (d3.mouse(this)[0]+30) + "px")
//       .style("top", (d3.mouse(this)[1]+30) + "px")
//   }
//   var moveTooltip = function(d) {
//     tooltip
//       .style("left", (d3.mouse(this)[0]+30) + "px")
//       .style("top", (d3.mouse(this)[1]+30) + "px")
//   }
//   var hideTooltip = function(d) {
//     tooltip
//       .transition()
//       .duration(200)
//       .style("opacity", 0)
//   }


//   // ---------------------------//
//   //       HIGHLIGHT GROUP      //
//   // ---------------------------//

//   // What to do when one group is hovered
//   var highlight = function(d){
//     // reduce opacity of all groups
//     d3.selectAll(".bubbles").style("opacity", .05)
//     // expect the one that is hovered
//     d3.selectAll("."+d).style("opacity", 1)
//   }

//   // And when it is not hovered anymore
//   var noHighlight = function(d){
//     d3.selectAll(".bubbles").style("opacity", 1)
//   }


//   // ---------------------------//
//   //       CIRCLES              //
//   // ---------------------------//

//   // Add dots
//   svg.append('g')
//     .selectAll("dot")
//     .data(data)
//     .enter()
//     .append("circle")
//       .attr("class", function(d) { return "bubbles " + d.State })
//       .attr("cx", function (d) { return x(d.Year); } )
//       .attr("cy", function (d) { return y(d.State_Minimum_Wage); } )
//       .attr("r", function (d) { return z(d.Federal_Minimum_Wage); } )
//       .style("fill", function (d) { return myColor(d.State); } )
//     // -3- Trigger the functions for hover
//     .on("mouseover", showTooltip )
//     .on("mousemove", moveTooltip )
//     .on("mouseleave", hideTooltip )



//     // ---------------------------//
//     //       LEGEND              //
//     // ---------------------------//

//     // Add legend: circles
//     var valuesToShow = [10000000, 100000000, 1000000000]
//     var xCircle = 390
//     var xLabel = 440
//     svg
//       .selectAll("legend")
//       .data(valuesToShow)
//       .enter()
//       .append("circle")
//         .attr("cx", xCircle)
//         .attr("cy", function(d){ return height - 100 - z(d) } )
//         .attr("r", function(d){ return z(d) })
//         .style("fill", "none")
//         .attr("stroke", "black")

//     // Add legend: segments
//     svg
//       .selectAll("legend")
//       .data(valuesToShow)
//       .enter()
//       .append("line")
//         .attr('x1', function(d){ return xCircle + z(d) } )
//         .attr('x2', xLabel)
//         .attr('y1', function(d){ return height - 100 - z(d) } )
//         .attr('y2', function(d){ return height - 100 - z(d) } )
//         .attr('stroke', 'black')
//         .style('stroke-dasharray', ('2,2'))

//     // Add legend: labels
//     svg
//       .selectAll("legend")
//       .data(valuesToShow)
//       .enter()
//       .append("text")
//         .attr('x', xLabel)
//         .attr('y', function(d){ return height - 100 - z(d) } )
//         .text( function(d){ return d/1000000 } )
//         .style("font-size", 10)
//         .attr('alignment-baseline', 'middle')

//     // Legend title
//     svg.append("text")
//       .attr('x', xCircle)
//       .attr("y", height - 100 +30)
//       .text("Population (M)")
//       .attr("text-anchor", "middle")

//     // Add one dot in the legend for each name.
//     var size = 20
//     var allgroups = ["Asia", "Europe", "Americas", "Africa", "Oceania"]
//     svg.selectAll("myrect")
//       .data(allgroups)
//       .enter()
//       .append("circle")
//         .attr("cx", 390)
//         .attr("cy", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
//         .attr("r", 7)
//         .style("fill", function(d){ return myColor(d)})
//         .on("mouseover", highlight)
//         .on("mouseleave", noHighlight)

//     // Add labels beside legend dots
//     svg.selectAll("mylabels")
//       .data(allgroups)
//       .enter()
//       .append("text")
//         .attr("x", 390 + size*.8)
//         .attr("y", function(d,i){ return i * (size + 5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
//         .style("fill", function(d){ return myColor(d)})
//         .text(function(d){ return d})
//         .attr("text-anchor", "left")
//         .style("alignment-baseline", "middle")
//         .on("mouseover", highlight)
//         .on("mouseleave", noHighlight)
//   });





// (function(){
//     var width = 1000,
//     height = 1000;
  
//     var svg = d3.select("#chart")
//     .append("svg")
//     .attr("height", height)
//     .attr("width", width)
//     .append("g")
//     .attr("tranform","translate(0, 0)");
  
//     var radiusScale = d3.scaleSqrt().domain([0, 15]).range([10, 80]);
  
//     //the simulation is a collection of forces
//     //about where we want our circles to go
//     //and how we want our circles to interact
//     //STEP ONE: get them to the middle
//     //STEP TWO: don't have them collide!!!
//     var simulation = d3.forceSimulation()
//     .force("x", d3.forceX(width / 2).strength(0.05))
//     .force("y", d3.forceY(height / 2).strength(0.05))
//     .force("collide", d3.forceCollide(function(d){
//       return radiusScale(d.State_Minimum_Wage) + 5;
//     }))
  
//     d3.queue()
//     .defer(d3.csv, "minwage_code.csv")
//     .await(ready)
  
//     function ready(error, datapoints){
  
//       var circles = svg.selectAll(".State_code")
//       .data(datapoints).enter()
//       .append("circle")
//       .attr("class", "State_code")
//       .attr("r", function(d){
//         return radiusScale(d.State_Minimum_Wage)
//       })
//       .attr("fill", "red")
//       .on("click", function(d){
//         console.log(d)
//       })
  
//       simulation.nodes(datapoints)
//       .on("tick", ticked)
  
//       function ticked(){
//         circles.attr("cx", function(d){
//           return d.x
//         })
//         .attr("cy", function(d){
//           return d.y
//         })
//       }
//     }
  
//   })();