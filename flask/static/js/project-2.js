  const logo = document.querySelectorAll("#logo path");
  // console.log(logo);
  for(let i = 0; i<logo.length; i++){
    console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
  };

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


$(document).on("click", ".test li", ClickAlerter); 

function ClickAlerter(event) {
    alert("Hi!"); 
}

// $(document).ready(function(){
$(document).on('click','.test li', function(){
  alert($(this).text());
});
// });

// $(document).ready(function(){
//   $(".test").on('click','.active', 'li',function(event){
//     console.log("I Worked");
//     // alert($(this).text());      
//   });
// });



 


// (function(){
//   var width = 1000,
//   height = 1000;

//   var svg = d3.select(".vert-container")
//   .append("svg")
//   .attr("height", height)
//   .attr("width", width)
//   .append("g")
//   .attr("tranform","translate(0, 0)");

//   var radiusScale = d3.scaleSqrt().domain([0, 15]).range([10, 80]);

//   //the simulation is a collection of forces
//   //about where we want our circles to go
//   //and how we want our circles to interact
//   //STEP ONE: get them to the middle
//   //STEP TWO: don't have them collide!!!
//   var simulation = d3.forceSimulation()
//   .force("x", d3.forceX(width / 2).strength(0.05))
//   .force("y", d3.forceY(height / 2).strength(0.05))
//   .force("collide", d3.forceCollide(function(d){
//     return radiusScale(d.State_Minimum_Wage) + 5;
//   }))

//   d3.queue()
//   .defer(d3.csv, "./static/js/minwage_code.csv")
//   .await(ready)

//   function ready(error, datapoints){

//     var circles = svg.selectAll(".State")
//     .data(datapoints)
//     .enter().append("circle")
//     .attr("class", "State")
//     .attr("r", function(d){
//       return radiusScale(d.State_Minimum_Wage)
//     })
//     .attr("fill", "red")
//     .on("click", function(d){
//       console.log(d)
//     })

//     simulation.nodes(datapoints)
//     .on("tick", ticked)

//     function ticked(){
//       circles.attr("cx", function(d){
//         return d.x
//       })
//       .attr("cy", function(d){
//         return d.y
//       })
//     }
//   }

// })


// const width = 100;
// const height = 100;

// let svg = d3
//     .select("body")
//     .append("svg")
//     .attr("height", height)
//     .attr("width", width)

//     d3.csv("./static/js/minwage_code.csv").then((data)=>{
//       console.log(data)
//       let sectors = Array.from(new Set(data.map((d) => d.State)));
//       let xCoords = sectors.map((d, i) => 150 + i * 150);
//       let xScale = d3.scaleOrdinal().domain(sectors).range(xCoords);
  
//       let yScale = d3
//         .scaleLinear()
//         .domain(d3.extent(data.map((d) => +d["Federal_Minimum_Wage"])))
//         .range([height - 50, 50]);
  
//       let color = d3.scaleOrdinal().domain(sectors).range(d3.schemePaired);
  
//       let marketcapDomain = d3.extent(data.map((d) => d["State_Minimum_Wage"]));
//       marketcapDomain = marketcapDomain.map((d) => Math.sqrt(d));
//       let size = d3.scaleLinear().domain(marketcapDomain).range([5, 30]);
  
//       svg
//         .selectAll(".circ")
//         .data(data)
//         .enter()
//         .append("circle")
//         .attr("class", "circ")
//         .attr("stroke", "black")
//         .attr("fill", (d) => color(d.State))
//         .attr("r", (d) => size(Math.sqrt(d["State_Minimum_Wage"])))
//         .attr("cx", (d) => xScale(d.State))
//         .attr("cy", (d) => yScale(d.Federal_Minimum_Wage));
  
//       let simulation = d3
//         .forceSimulation(data)
//         .force(
//           "x",
//           d3
//             .forceX((d) => {
//               return xScale(d.State);
//             })
//             .strength(0.2)
//         )
//         .force(
//           "y",
//           d3
//             .forceY(function (d) {
//               return yScale(d.Federal_Minimum_Wage);
//             })
//             .strength(1)
//         )
//         .force(
//           "collide",
//           d3.forceCollide((d) => {
//             return size(Math.sqrt(d[""]));
//           })
//         )
//         .alphaDecay(0)
//         .alpha(0.3)
//         .on("tick", tick);
  
//       function tick() {
//         d3.selectAll(".circ")
//           .attr("cx", (d) => {
//             return d.x;
//           })
//           .attr("cy", (d) => d.y);
//       }
  
//       let init_decay = setTimeout(function () {
//         console.log("start alpha decay");
//         simulation.alphaDecay(0.1);
//       }, 1000);

//     });


// // set the dimensions and margins of the graph
// var margin = {top: 10, right: 100, bottom: 30, left: 30},
//     width = 460 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// var svg = d3.select("#my_dataviz")
// .append("svg")
// .attr("width", width + margin.left + margin.right)
// .attr("height", height + margin.top + margin.bottom)
// .append("g")
// .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// //Read the data
// d3.csv("C:\Users\bxprd\Data Analytics Bootcamp\Git_Repos\data-analysis-project-2\Data\minwage_code.csv", function(data) {

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
  //   })
  // });

  
// $(document).ready(function(){
//   for(i=0; i<=nums.length; i++){
//     $(".tl-item" + nums[i]).on("click",function(){
//       for(j=0; j <= nums.length; j++){
//       $(this).find("#year1970").toggle()
//       }
//     })
//   }
// })

 
// $('.openmodal').on("click", function (e) {
//   $('#modalnew').modal('show');
// });
//   $('#modalnew').on('show.bs.modal', 
//   function (e) {

//       // Button that triggered the modal
//       var li = $(e.relatedTarget)

//       // Extract info from data attributes 
//       var recipient = li.data('whatever')
        
//       // Updating the modal content using 
//       // jQuery query selectors
//       var modal = $(this)

//       modal.find('.modal-title')
//           .text('New message to ' + recipient)
            
//       modal.find('.modal-body p')
//           .text('Welcome to ' + recipient)
//   })
// });


// // Get the modal
// var modal = document.getElementById("exampleModal");

// // Get the button that opens the modal
// var btn = document.getElementById("year1970");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }