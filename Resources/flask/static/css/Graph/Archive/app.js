
// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("#graph")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Configure a parseTime function which will return a new Date object from a string
//var parseTime = d3.timeParse("%Y");


// Import the CSV data
d3.csv("../Data/minwage.csv", function(error, data) {
  if (error) throw error;
  
   // Format the data
  data.forEach(function(d) {
      d.Year = +d.Year;
      d.State = d.State;
      d.Effective.Minimum.Wage = +d.Effective.Minimum.Wage;
  });

  var nest = d3.nest()
	  .key(function(d){
	    return d.State;
	  })
	  .key(function(d){
	  	return d.Year;
	  })
	  .entries(data)

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.Year; }));
  y.domain([0, d3.max(data, function(d) { return d.Effective.Minimum.Wage; })]);
  
  // Set up the x axis
  var xaxis = svg.append("g")
       .attr("transform", "translate(0," + chartHeight + ")")
       .call(d3.axisBottom(x)
          .tickSize(0, 0)
          .tickSizeInner(0)
          .tickPadding(10));

  // Add the Y Axis
   var yaxis = svg.append("g")
       .attr("class", "y axis")
       .call(d3.axisLeft(y)
          .ticks(5)
          .tickSizeInner(0)
          .tickPadding(6)
          .tickSize(0, 0));
  
  // Add a label to the y axis
  svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 60)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Minimum Wage")
        .attr("class", "y axis label");

  // Create a dropdown
    var fruitMenu = d3.select("#fruitDropdown")

    fruitMenu
		.append("select")
		.selectAll("option")
        .data(nest)
        .enter()
        .append("option")
        .attr("value", function(d){
            return d.key;
        })
        .text(function(d){
            return d.key;
        })


 
 	// Function to create the initial graph
 	var initialGraph = function(fruit){

 		// Filter the data to include only fruit of interest
 		var selectFruit = nest.filter(function(d){
                return d.key == fruit;
              })

	    var selectFruitGroups = svg.selectAll(".fruitGroups")
		    .data(selectFruit, function(d){
		      return d ? d.key : this.key;
		    })
		    .enter()
		    .append("g")
		    .attr("class", "fruitGroups")

		var initialPath = selectFruitGroups.selectAll(".line")
			.data(function(d) { return d.values; })
			.enter()
			.append("path")

		initialPath
			.attr("d", function(d){
				return valueLine(d.values)
			})
			.attr("class", "line")

 	}

 	// Create initial graph
 	initialGraph("strawberry")


 	// Update the data
 	var updateGraph = function(fruit){

 		// Filter the data to include only fruit of interest
 		var selectFruit = nest.filter(function(d){
                return d.key == fruit;
              })

 		// Select all of the grouped elements and update the data
	    var selectFruitGroups = svg.selectAll(".fruitGroups")
		    .data(selectFruit)

		    // Select all the lines and transition to new positions
            selectFruitGroups.selectAll("path.line")
               .data(function(d){
                  return (d.values);
                })
                .transition()
                  .duration(1000)
                  .attr("d", function(d){
                    return valueLine(d.values)
                  })


 	}


 	// Run update function when dropdown selection changes
 	fruitMenu.on('change', function(){

 		// Find which fruit was selected from the dropdown
 		var selectedFruit = d3.select(this)
            .select("select")
            .property("value")

        // Run update function with the selected fruit
        updateGraph(selectedFruit)


    });


  
})