var fedMinWage = [1.3, 1.3, 1.6, 1.6, 1.6, 1.6, 2.2, 2.2, 2.2, 2.9, 3.1, 3.35, 3.35, 3.35, 3.35, 3.35, 3.35, 3.35, 3.35, 3.35, 3.35, 3.8, 4.25, 4.25, 4.25, 4.25, 4.25, 4.75, 5.15, 5.15, 5.15, 5.15, 5.15, 5.15, 5.15, 5.15, 5.15, 5.15, 5.85, 6.55, 7.25, 7.25, 7.25, 7.25, 7.25, 7.25, 7.25, 7.25, 7.25, 7.25, 7.25];

var margin = {top: 40, right: 40, bottom: 135, left: 40},
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;


    // .attr("width", svgWidth)
    // .attr("height", svgHeight);
var svg = d3.select("#bar")
    .append("svg")
	.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("./static/csv/MinWageByState.csv", function(error, data){

	// filter year
	// var data = data.filter(function(d){return d.Year == '1970';});
	// Get every column value
	var elements = Object.keys(data[0])
		.filter(function(d){
			return ((d != "year") & (d != "state"));
		});
	var selection = elements[0];

	var y = d3.scale.linear()
			.domain([0, d3.max(data, function(d){
				return +d[selection];
			})])
			.range([height, 0]);

	var x = d3.scale.ordinal()
			.domain(data.map(function(d){ return d.state;}))
			.rangeBands([0, width]);


	var xAxis = d3.svg.axis()
		.scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
	    .orient("left");

	svg.append("g")
    	.attr("class", "x axis")
    	.attr("transform", "translate(0," + height + ")")
    	.call(xAxis)
    	.selectAll("text")
    	.style("font-size", "8px")
      	.style("text-anchor", "end")
      	.attr("dx", "-.8em")
      	.attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );


 	svg.append("g")
    	.attr("class", "y axis")
    	.call(yAxis);

	svg.selectAll("rectangle")
		.data(data)
		.enter()
		.append("rect")
		.attr("class","rectangle")
		.attr("width", width/data.length)
		.attr("height", function(d){
			return height - y(+d[selection]);
		})
		.attr("x", function(d, i){
			return (width / data.length) * i ;
		})
		.attr("y", function(d){
			return y(+d[selection]);
		})
		.append("title")
		.text(function(d){
			return d.state + " : " + d[selection];
        });

    svg.append('text')
        .attr('x', -300)
        .attr('y', -28)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('State Minimum Wage ($)');

    svg.append('text')
        .attr('x', 420)
        .attr('y', 600)
        .attr('text-anchor', 'middle')
		.text('US States and Territories');

	var selector = d3.select("#drop")
    	.append("select")
    	.attr("id","dropdown")
    	.on("change", function(d){
        	selection = document.getElementById("dropdown");

        	y.domain([0, d3.max(data, function(d){
				return +d[selection.value];})]);

        	yAxis.scale(y);

        	d3.selectAll(".rectangle")
           		.transition()
	            .attr("height", function(d){
					return height - y(+d[selection.value]);
				})
				.attr("x", function(d, i){
					return (width / data.length) * i ;
				})
				.attr("y", function(d){
					return y(+d[selection.value]);
				})
           		.ease("linear")
           		.select("title")
           		.text(function(d){
           			return d.state + " : " + d[selection.value];
           		});

           	d3.selectAll("g.y.axis")
           		.transition()
           		.call(yAxis);

         });

		 selector.selectAll("option")
		 .data(elements)
		 .enter().append("option")
		 .attr("value", function(d){
			 return d;
		})
		
		.text(function(d){
			return d;
		})
	});

// d3.csv("./static/csv/FedMinWageByYear.csv", function(error, fedData) {
// 	if (error) throw error;
// 	svg.append("g")
// 	.attr("transform", "translate(0, "+ y(fedData)+")")
// 	.append("line")
// 	.attr("x2", width)
// 	.style("stroke", "#2ecc71")
// 	.style("stroke-width", "5px");
// });

// .on('mouseenter', function (s, i) {
//     d3.select(this)
//         .transition()
//         .duration(300)
//         .attr('opacity', 0.6)
//         .attr('x', (a) => xScale(a.language) - 5)
//         .attr('width', xScale.bandwidth() + 10)

//     svg.append('line')
//         .attr('x1', 0)
//         .attr('y1', y)
//         .attr('x2', width)
//         .attr('y2', y)
//         .attr('stroke', 'red')

//  .on('mouseleave', function () {
	// 	d3.selectAll('.value')
	// 		.attr('opacity', 1)

	//  d3.select(this)
	// 		.transition()
	// 		.duration(300)
	// 		.attr('opacity', 1)
	// 		.attr('x', (a) => xScale(a.language))
	// 		.attr('width', xScale.bandwidth())

	//  chart.selectAll('#limit').remove()
	//  chart.selectAll('.divergence').remove()
	// })
// })

// svg.append('g')
//       .attr('class', 'grid')
//       .call(makeYLines()
//         .tickSize(-width, 0, 0)
//         .tickFormat('')
//       )
