
// set the dimensions and margins of the graph
var margin = {top: 10, right: 100, bottom: 30, left: 30},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Read the data
d3.csv("../Data/minwage_forgraph.csv").then(function(wagedata) {

    console.log(wagedata);




    wagedata.forEach(function(d) {
      wagedata.Year = +wagedata.Year;
      wagedata.State = wagedata.State;
      wagedata.Minwage = +wagedata.Minwage;
    });

    //var alabama = data.filter(function(d){ return data.State == "Alabama" })


    // List of groups (here I have one group per column)
    var allGroup = ["Alabama", "Alaska", "Arizona", "Arkansas"]

    // add the options to the button
    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(function (data) { return data; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeSet2);

// ---------------------------------------------------------------------
  // Configure a time scale with a range between 0 and the chartWidth
  // Set the domain for the xTimeScale function
  // d3.extent returns the an array containing the min and max values for the property specified
  var xTimeScale = d3.scaleLinear()
    .range([0, width])
    .domain(d3.extent(wagedata, data => data.Year))
    ;
    

  // Configure a linear scale with a range between the chartHeight and 0
  // Set the domain for the xLinearScale function
  var yLinearScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(wagedata, data => data.Minwage)]);

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xTimeScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Configure a drawLine function which will use our scales to plot the line's points
  var drawLine = d3
    .line()
    .x(data => xTimeScale(data.Year))
    .y(data => yLinearScale(data.Minwage));

  // Append an SVG path and plot its points using the line function
  chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line for milesData
    .attr("d", drawLine(wagedata))
    .classed("line", true);

  // Append an SVG group element to the SVG area, create the left axis inside of it
  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

  // Append an SVG group element to the SVG area, create the bottom axis inside of it
  // Translate the bottom axis to the bottom of the page
  chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", "translate(0, " + height + ")")
    .call(bottomAxis);

    



//     // Initialize line with group a
//     var line = svg
//       .append('g')
//       .append("path")
//         .datum(data)
//         .attr("d", d3.line()
//           .x(function(d) { return x(+d.Year) })
//           .y(function(d) { return y(+d.Effective.Minimum.Wage) })
//         )
//         .attr("stroke", function(d){ return myColor("Alabama") })
//         .style("stroke-width", 4)
//         .style("fill", "none")

//     // A function that update the chart
//     function update(selectedGroup) {

//       // Create new data with the selection?
//       var dataFilter = data.map(function(d){return {Year: d.Year, value:d[selectedGroup]} })

//       // Give these new data to update line
//       line
//           .datum(dataFilter)
//           .transition()
//           .duration(1000)
//           .attr("d", d3.line()
//             .x(function(d) { return x(+d.Year) })
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

})

