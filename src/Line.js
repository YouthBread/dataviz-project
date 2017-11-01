function Stat_Line(col, postion){
      const margin = { left: 60, right: 60, top: 20, bottom: 20 };

      const width = 600;
      const height = 400;

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

      var temp_g = d3.select("#"+postion).append('svg');
      temp_g.attr('width', width)
            .attr('height', height);
      const xAxisG = temp_g.append('g')
          .attr('transform', `translate(${0}, ${innerHeight})`);
      const yAxisG = temp_g.append('g')
          .attr('transform', `translate(${margin.left}, ${0})`);

      xAxisG.append('text')
          .attr('class', 'axis-label')
          .attr('x', innerWidth / 2 + 580)
          .attr('y', 40)
          .text('Year');

      yAxisG.append('text')
          .attr('class', 'axis-label')
          .attr('x', -innerHeight / 2)
          .attr('y', -35)
          .attr('transform', `rotate(-90)`)
          .style('text-anchor', 'middle')
          .text(col);


      var line = d3.line()
              .x(function(d) {return xScale(parseTime(d.Season.split('-')[0]))})
              .y(function(d) {return yScale(d[col])});


      d3.csv('data/stat.csv', data => {

        xScale
          .domain(d3.extent(data, d=>parseTime(d.Season.split('-')[0])))
          .range([margin.left, innerWidth])
          .nice();

        yScale
          .domain(d3.extent(data, d=>+d[col]))
          .range([innerHeight, margin.top])
          .nice();


        temp_g.append('path')
           .attr("fill", "none")
           .attr('stroke', 'steelblue')
           .attr("stroke-linejoin", "round")
           .attr("stroke-linecap", "round")
           .attr("stroke-width", 2)
           .attr("d", line(data));



        temp_g.selectAll('circle').data(data)
          .enter().append('circle')
            .attr('cx', d => xScale(parseTime(d.Season.split('-')[0])))
            .attr('cy', d => yScale(d[col]))
            .attr('fill', 'blue')
            .attr('fill-opacity', 0.6)
            .attr('r', 3)


        xAxisG.call(xAxis);
        yAxisG.call(yAxis);
      });

}
