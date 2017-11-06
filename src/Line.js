//Fixed plot
function Shot_Stat_Line(col, position){
      const margin = { left: 80, right: 60, top: 20, bottom: 20 };

      const width = 750;
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

      var temp_g = d3.select("#"+position);
      temp_g.attr("width", width)
            .attr("height", height);
      const xAxisG = d3.select("#"+position).select("#x_axis")
          .attr("transform", `translate(${0}, ${innerHeight})`);
      const yAxisG = d3.select("#"+position).select("#y_axis")
          .attr("transform", `translate(${margin.left}, ${0})`);

      xAxisG.select("#x_label")
          .attr("x", innerWidth / 2)
          .attr("y", 40)
          .text("Year");

      yAxisG.select("#y_label")
          .attr("x", -innerHeight / 2)
          .attr("y", -60)
          .attr("transform", `rotate(-90)`)
          .style("text-anchor", "middle")
          .text(col);



      var line = d3.line()
              .curve(d3.curveMonotoneX)
              .x(function(d) {return xScale(parseTime(d.Season.split("-")[0]))})
              .y(function(d) {return yScale(d[col])});


      d3.csv("data/stat.csv", data => {

        xScale
          .domain(d3.extent(data, d=>parseTime(d.Season.split("-")[0])))
          .range([margin.left, innerWidth])
          .nice();

        yScale
          .domain(d3.extent(data, d=>+d[col]))
          .range([innerHeight, margin.top])
          .nice();


        temp_g.append("path")
           .attr("fill", "none")
           .attr("stroke", "steelblue")
           .attr("stroke-linejoin", "round")
           .attr("stroke-linecap", "round")
           .attr("stroke-width", 2)
           .attr("d", line(data));



        temp_g.selectAll("circle").data(data)
          .enter().append("circle")
            .attr("cx", d => xScale(parseTime(d.Season.split("-")[0])))
            .attr("cy", d => yScale(d[col]))
            .attr("fill", "blue")
            .attr("fill-opacity", 0.6)
            .attr("r", 3)
            .attr("data-toggle", "tooltip")
            .attr("data-placement", "top")
            .attr("title", d => d[col])

        xAxisG.call(xAxis);
        yAxisG.call(yAxis);
      });
}

//Plot with general update
function Shot_Accu_Line(year,position){
      var format = d3.timeFormat("%Y");

      var target_season = format(year)+"-"+(year.getFullYear()+1).toString().substring(2, 4);
      const margin = { left: 80, right: 60, top: 20, bottom: 20 };

      const width = 750;
      const height = 400;

      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const parseTime = d3.timeParse("%Y%m%d");
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

      var temp_g = d3.select("#"+position);
      temp_g.attr("width", width)
            .attr("height", height);
      const xAxisG = d3.select("#"+position).select("#x_axis")
          .attr("transform", `translate(${0}, ${innerHeight})`);
      const yAxisG = d3.select("#"+position).select("#y_axis")
          .attr("transform", `translate(${margin.left}, ${0})`);

      xAxisG.select("#x_label")
          .attr("x", innerWidth / 2)
          .attr("y", 40)
          .text("Year");

      yAxisG.select("#y_label")
          .attr("x", -innerHeight / 2)
          .attr("y", -60)
          .attr("transform", `rotate(-90)`)
          .style("text-anchor", "middle")
          .text("Accuracy");



      d3.csv("data/kobe.csv", data => {
          var temp_data = data.filter(d=>d.season == target_season)

           temp_data = d3.nest()
                      .key(function(d) { return d.game_date; })
                      .key(function(d) { return d.shot_made_flag})
                      .rollup(function(leaves) { return leaves.length; })
                      .entries(temp_data);
          var made = 0;
          var miss = 0;

          for (i = 0; i < temp_data.length; i++) {
            if (temp_data[i].values[0]) {
              if (temp_data[i].values[0].key == "1") {
                made = temp_data[i].values[0].value
              } else {
                miss = temp_data[i].values[0].value
              }
            }

            if (temp_data[i].values[1]) {
              if (temp_data[i].values[1].key == "1") {
                made = temp_data[i].values[1].value
              } else {
                miss = temp_data[i].values[1].value
              }
            }
            temp_data[i].values = made/(miss+made)

          }
          var line = d3.line()
                  .curve(d3.curveMonotoneX)
                  .x(function(d) {return xScale(parseTime(d.key))})
                  .y(function(d) {return yScale(d.values)});

          xScale
            .domain(d3.extent(temp_data, d=>parseTime(d.key)))
            .range([margin.left, innerWidth])
            .nice();

          var height = d3.extent(temp_data, d=>+d.values);
          yScale
            .domain(d3.extent(temp_data, d=>+d.values))
            .range([innerHeight, margin.top])
            .nice();

          var path_made = temp_g.selectAll("#line_path").data([temp_data])
          path_made.exit().transition(t).remove();

          path_made
             .enter().append("path")
             .merge(path_made)
             .transition(t)
             .attr("id", "line_path")
             .attr("fill", "none")
             .attr("stroke", "steelblue")
             .attr("stroke-linejoin", "round")
             .attr("stroke-linecap", "round")
             .attr("stroke-width", 2)
             .attr("d", line(temp_data));


          var circles_made = temp_g.selectAll("#line_circle").data(temp_data)
          circles_made.exit().transition(t).remove();


          circles_made
            .enter().append("circle")
            .merge(circles_made)
             .attr("id", "line_circle")
             .attr("fill", "blue")
             .attr("fill-opacity", 0.6)
             .attr("r", 3)
             .attr("data-toggle", "tooltip")
             .attr("data-placement", "top")
             .attr("title", d => d.values.toPrecision(3))
             .transition(t)
             .attr("cx", d => xScale(parseTime(d.key)))
             .attr("cy", d => yScale(d.values))


          xAxisG.call(xAxis);
          yAxisG.call(yAxis);


          d3.csv("data/complete_injury.csv", data => {

              var temp_data = data.filter(d=>d.season == target_season)
              var injury = temp_g.selectAll("#injury_line").data(temp_data)
              injury.exit().transition(t).remove();

              injury.enter().merge(injury).append("line")
                   .attr("id", "injury_line")
                   .style("stroke", "red")
                   .style("stroke-linecap", "round")
                   .style("stroke-width", 1.5)
                   .attr("x1", d => xScale(parseTime(d.game_date)))
                   .attr("y1", yScale(height[0]))
                   .attr("x2", d => xScale(parseTime(d.game_date)))
                   .attr("y2", yScale(height[1]))
                   .attr("data-toggle", "tooltip")
                   .attr("data-placement", "top")
                   .attr("title", d => d.Notes);
                    });
      });

}


//Plot with general update
function Shot_Score_Line(year,position){
      var format = d3.timeFormat("%Y");

      var target_season = format(year)+"-"+(year.getFullYear()+1).toString().substring(2, 4);

      const margin = { left: 80, right: 60, top: 20, bottom: 20 };

      const width = 750;
      const height = 400;

      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const parseTime = d3.timeParse("%Y%m%d");
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

      var temp_g = d3.select("#"+position);
      temp_g.attr("width", width)
            .attr("height", height);
      const xAxisG = d3.select("#"+position).select("#x_axis")
          .attr("transform", `translate(${0}, ${innerHeight})`);
      const yAxisG = d3.select("#"+position).select("#y_axis")
          .attr("transform", `translate(${margin.left}, ${0})`);

      xAxisG.select("#x_label")
          .attr("x", innerWidth / 2)
          .attr("y", 40)
          .text("Year");

      yAxisG.select("#y_label")
          .attr("x", -innerHeight / 2)
          .attr("y", -60)
          .attr("transform", `rotate(-90)`)
          .style("text-anchor", "middle")
          .text("Score");

      var t = d3.transition()
            .duration(750);


      d3.csv("data/kobe.csv", data => {
          var temp_data = data.filter(d=>d.season == target_season)

           temp_data = d3.nest()
                      .key(function(d) { return d.game_date; })
                      .rollup(function(leaves) { return d3.sum(leaves, function(d) {return d.score;})} )
                      .entries(temp_data);



          var line = d3.line()
                  .curve(d3.curveMonotoneX)
                  .x(function(d) {return xScale(parseTime(d.key))})
                  .y(function(d) {return yScale(d.value)});

          xScale
            .domain(d3.extent(temp_data, d=>parseTime(d.key)))
            .range([margin.left, innerWidth])
            .nice();

          var height = d3.extent(temp_data, d=>+d.value);

          yScale
            .domain(d3.extent(temp_data, d=>+d.value))
            .range([innerHeight, margin.top])
            .nice();

          var path_made = temp_g.selectAll("#line_path").data([temp_data])
          path_made.exit().transition(t).remove();

          path_made
             .enter().append("path")
             .merge(path_made)
             .transition(t)
             .attr("id", "line_path")
             .attr("fill", "none")
             .attr("stroke", "steelblue")
             .attr("stroke-linejoin", "round")
             .attr("stroke-linecap", "round")
             .attr("stroke-width", 2)
             .attr("d", line(temp_data));

          var circles_made = temp_g.selectAll("#line_circle").data(temp_data)
          circles_made.exit().transition(t).remove();


          circles_made
            .enter().append("circle")
            .merge(circles_made)
              .attr("id", "line_circle")
              .attr("fill", "blue")
              .attr("fill-opacity", 0.6)
              .attr("r", 3)
              .attr("data-toggle", "tooltip")
              .attr("data-placement", "top")
              .attr("title", d => d.value)
              .transition(t)
              .attr("cx", d => xScale(parseTime(d.key)))
              .attr("cy", d => yScale(d.value));


          d3.csv("data/complete_injury.csv", data => {

              var temp_data = data.filter(d=>d.season == target_season)
              var injury = temp_g.selectAll("#injury_line").data(temp_data)
              injury.exit().transition(t).remove();

              injury.enter().merge(injury).append("line")
                   .attr("id", "injury_line")
                   .style("stroke", "red")
                   .style("stroke-linecap", "round")
                   .style("stroke-width", 1.5)
                   .attr("x1", d => xScale(parseTime(d.game_date)))
                   .attr("y1", yScale(height[0]))
                   .attr("x2", d => xScale(parseTime(d.game_date)))
                   .attr("y2", yScale(height[1]))
                   .attr("data-toggle", "tooltip")
                   .attr("data-placement", "top")
                   .attr("title", d => d.Notes)

                  })


          xAxisG.call(xAxis);
          yAxisG.call(yAxis);



      });

};




