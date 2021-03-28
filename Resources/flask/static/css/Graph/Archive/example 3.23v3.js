// Set the margins
var margin = {top: 60, right: 100, bottom: 20, left: 80},
  width = 850 - margin.left - margin.right,
  height = 370 - margin.top - margin.bottom;



// Set the ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);


// Define the line  
var valueLine = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.Minwage); })

// Create the svg canvas in the "graph" div
var svg = d3.select("#graph")
        .append("svg")
        .style("width", width + margin.left + margin.right + "px")
        .style("height", height + margin.top + margin.bottom + "px")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "svg");

// Import the CSV data
d3.csv("../Data/minwage_forgraph.csv", function(error, data) {
  if (error) throw error;
  
   // Format the data
  data.forEach(function(d) {
      d.Year = +d.Year;
      d.Minwage = +d.Minwage;
      d.State = d.State;
      //d.Year = formatYear(parseYear(+d.Year));
  });


  var nest = d3.nest()
	  .key(function(d){
	    return d.State;
	  })
	//   .key(function(d){
	//   	return d.Year;
	//   })
	  .entries(data)

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.Year; }));
  y.domain([0, d3.max(data, function(d) { return d.Minwage; })]);
  
  // Set up the x axis
  var xaxis = svg.append("g")
       .attr("transform", "translate(0," + height + ")")
       .attr("class", "x axis")
       .call(d3.axisBottom(x)
          .ticks(5)
          .tickSize(0, 0)
          //.tickFormat(d3.timeFormat("%B"))
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
        .text("Min Wage")
        .attr("class", "y axis label");

  // Create a dropdown
    var StateMenu = d3.select("#StateDropdown")

    StateMenu
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
 	var initialGraph = function(State){

 		// Filter the data to include only State of interest
 		var selectState = nest.filter(function(d){
                return d.key == State;
              })

	    var selectStateGroups = svg.selectAll(".StateGroups")
		    .data(selectState, function(d){
		      return d ? d.key : this.key;
		    })
		    .enter()
		    .append("g")
		    .attr("class", "StateGroups")

		var initialPath = selectStateGroups.selectAll(".line")
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
 	initialGraph("New York")


 	// Update the data
 	var updateGraph = function(State){

 		// Filter the data to include only State of interest
 		var selectState = nest.filter(function(d){
                return d.key == State;
              })

 		// Select all of the grouped elements and update the data
	    var selectStateGroups = svg.selectAll(".StateGroups")
		    .data(selectState)

		    // Select all the lines and transition to new positions
            selectStateGroups.selectAll("path.line")
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
 	StateMenu.on('change', function(){

 		// Find which State was selected from the dropdown
 		var selectedState = d3.select(this)
            .select("select")
            .property("value")

        // Run update function with the selected State
        updateGraph(selectedState)


    });


  
})