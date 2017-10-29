function Stat_Line(){
      const width = 480;
      const height = width/50*47;

      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const parseTime = d3.timeParse("%Y");
      const xScale = d3.scaleTime();
      const yScale = d3.scaleLinear();

      const xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(5)
        .tickPadding(10)
        .tickSize(5);

      const yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(10)
        .tickPadding(15)
        .tickSize(5);


      const xAxisG = line_chart.append('g')
          .attr('transform', `translate(${0}, ${innerHeight})`);
      const yAxisG = line_chart.append('g')
          .attr('transform', `translate(${margin.left+20}, ${0})`);
      xAxisG.append('text')
          .attr('class', 'axis-label')
          .attr('x', innerWidth / 2)
          .attr('y', 50)
          .text('Year');

      yAxisG.append('text')
          .attr('class', 'axis-label')
          .attr('x', margin.left)
          .attr('y', -60)
          .attr('transform', `rotate(-90)`)
          .style('text-anchor', 'middle')
          .text('Global Sales');


      var line = d3.line()
              .x(function(d) {console.log(d.Season.split('-')[0],xScale(parseTime(d.Season.split('-')[0]))); return xScale(parseTime(d.Season.split('-')[0]))})
              .y(function(d) {console.log(d.PTS, yScale(d.PTS)); return yScale(d.PTS);});


      d3.csv('data/stat.csv', data => {

        xScale
          .domain(d3.extent(data, d=>parseTime(d.Season.split('-')[0])))
          .range([margin.left+20, innerWidth])
          .nice();

        yScale
          .domain([5,40])
          .range([innerHeight, margin.top])
          .nice();


        line_chart.append('path')
           .attr("fill", "none")
           .attr('stroke', 'steelblue')
           .attr("stroke-linejoin", "round")
           .attr("stroke-linecap", "round")
           .attr("stroke-width", 5)
           .attr("d", line(data));



        // line_chart.append('path')
        //    .datum(temp_data['PTS'])
        //    .attr("fill", "none")
        //    .attr("stroke-linejoin", "round")
        //    .attr("stroke-linecap", "round")
        //    .attr("stroke-width", 5)
        //    .attr("d", line);


        // for (i=0;i<temp_data.length;i++){
        //   var pn = temp_data[i].key;
        //   for (j=0; j<temp_data[i].values.length;j++){
        //      line_chart.append('circle')
        //       .datum(temp_data[i].values[j])
        //         .attr('cx', d => xScale(parseTime(d.key)))
        //         .attr('cy', d => yScale(d.value))
        //         .attr('pn', pn)
        //         .attr('fill', '#0074D9')
        //         .attr('fill-opacity', 0.6)
        //         .attr('r', 3.5)
        //   }
        // }


        xAxisG.call(xAxis);
        yAxisG.call(yAxis);
      });

}
