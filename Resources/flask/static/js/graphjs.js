

    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 100, bottom: 50, left: 60},
        width = 750 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    d3.csv("./static/csv/minwage_forgraph.csv", function(data) {
        console.log(data);
        // List of groups (here I have one group per column)
        var allGroup = Object.keys(data[1])//.splice(0,1);
        let statelist = allGroup.splice(0,2)

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

        // Add X axis --> it is a date format
        var x = d3.scaleLinear()
          .domain([1968,2020])
          .range([ 0, width ]);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x)
          .tickFormat(d3.format("d"))

        //   .ticks(5)
        //   .tickSizeInner(0)
        //   .tickPadding(6)
        //   .tickSize(0, 0)
        );

        svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .style("font-size", "20px")
    .attr("x", width/2)
    .attr("y", height*1.11)
    .text("Year");




        // Add Y axis
        var y = d3.scaleLinear()
          .domain( [0,15])
          .range([ height, 0 ]);
        svg.append("g")
          .call(d3.axisLeft(y));

        // text label for the y axis
        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size", "20px")
        .text("Effective Minimum Wage (2020 USD)");

        //Add Title
        svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text("Effective Minimum Wage Progression (by State)");

        // Initialize line with group a
        var line = svg
          .append('g')
          .append("path")
            .datum(data)
            .attr("d", d3.line()
              .x(function(d) { return x(+d.Year) })
              .y(function(d) { return y(+d.Alabama) })
            )
            .attr("stroke", function(d){ return myColor("Alabama") })
            .style("stroke-width", 4)
            .style("fill", "none")

        // A function that update the chart
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

    })
