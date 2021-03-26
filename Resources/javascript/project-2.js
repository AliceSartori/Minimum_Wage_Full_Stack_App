  const logo = document.querySelectorAll("#logo path");
  // console.log(logo);
  for(let i = 0; i<logo.length; i++){
    console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
  }

  // var nums = [1, 2, 3, 4, 5];
  // $(document).ready(function(){
  //   $.easing.easeOutCubic = function (x, t, b, c, d) {
  //     return c*((t=t/d-1)*t*t + 1) + b;
  //   }    
  //   nums.forEach(function(num){
  //     $(".tl-item" + num).mouseenter(function(){
  //       nums.forEach(function(num){
  //         $(this).find('#timeline'+ num).stop(true, true).fadeIn(100, 'easeOutCubic');
  //       })
  //     });
  
  //     nums.forEach(function(num){
  //       $(".tl-item" + num).mouseleave(function(){
  //         nums.forEach(function(num){
  //           $(this).find('#timeline'+ num).stop(true, true).fadeIn(100, 'easeOutCubic');
  //         })
  //       });
  //     })
  //   });

var nums = [1, 2, 3, 4, 5];
$(document).ready(function(){
  $.easing.easeOutCubic = function (x, t, b, c, d) {
    return c*((t=t/d-1)*t*t + 1) + b;
  }
  
  for(i=0; i<=nums.length; i++){
    $(".tl-item" + nums[i]).mouseenter(function(){
      for(j=0; j <= nums.length; j++){
        $(this).find('#timeline'+ nums[j]).stop(true, true).fadeIn(100, 'easeOutCubic');
      }
    });
  }

   for(i=0; i<=nums.length; i++){
    $(".tl-item" + nums[i]).mouseleave(function(){
      for(j=0; j <= nums.length; j++){
        $(this).find('#timeline'+ nums[j]).stop(true, true).fadeOut(1000, 'easeOutCubic');
      }
    });
  }
});


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
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("../minwage.csv", function(data) {

    // List of groups (here I have one group per column)
    var allGroup = ["valueA", "valueB", "valueC"]

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
      .domain([0,10])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain( [0,20])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Initialize line with group a
    var line = svg
      .append('g')
      .append("path")
        .datum(data)
        .attr("d", d3.line()
          .x(function(d) { return x(+d.time) })
          .y(function(d) { return y(+d.valueA) })
        )
        .attr("stroke", function(d){ return myColor("valueA") })
        .style("stroke-width", 4)
        .style("fill", "none")

    // A function that update the chart
    function update(selectedGroup) {

      // Create new data with the selection?
      var dataFilter = data.map(function(d){return {time: d.time, value:d[selectedGroup]} })

      // Give these new data to update line
      line
          .datum(dataFilter)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(+d.time) })
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


// function showDiv(id) {
//   var div = document.getElementById(id);

//   if (div.style.display == "none") {
//           div.style.display = "flex";
//       } else {
//           div.style.display = "none";
//       }
//   }

// $(document).ready(function(){
//   $(".tl-item1").click(function(){
//     $("#timeline1").toggle();      
//   });
//   $(".tl-item2").click(function(){
//     $("#timeline2").toggle();      
//   });
// });