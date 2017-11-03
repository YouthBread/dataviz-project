function Heat_Map(year){
    const width = court_width;
    const height = width/50*47;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    shot_xScale.range([margin.left, innerWidth])
               .nice();

    shot_yScale.range([margin.top, innerHeight])
               .nice();


    d3.csv('data/kobe.csv', data => {
            //filtering the unreasonable shot
            var data = data.filter(d=>d.loc_y < 400)
            var temp_data = d3.nest()
                      .key(function(d) { return d.season; })
                      .entries(data);
            var target = (year.getFullYear()).toString()+'-'+(year.getFullYear()+1).toString().substring(2, 4)

            temp_data = temp_data.filter(d=>d.key==target);

            var shot = temp_data[0].values;

            shot = d3.contourDensity()
                     .x(function(d) { return shot_xScale(d.loc_x); })
                     .y(function(d) { return shot_yScale(d.loc_y); })
                     .size([innerWidth, innerHeight])
                     .bandwidth(30)
                     (shot)

            var heatmap = heat_g.selectAll('path').data(shot)

            heatmap.exit().remove();

            heatmap
                .attr('fill', 'none')
                .attr('stroke', '#000')
                .attr('stroke-width', 0)
                .attr('stroke-linejoin', 'round')
                .enter().append('path')
                .merge(heatmap)
                  .attr('fill', function(d) { return color(d.value); })
                  .transition(t)
                  .attr('d', d3.geoPath());



            // var shot_contour = heat_g.selectAll('.heat_map').data(d3.contourDensity()
            //                                                         .x(function(d) { return shot_xScale(d.loc_x); })
            //                                                         .y(function(d) { return shot_yScale(d.loc_y); })
            //                                                         .size([innerWidth, innerHeight])
            //                                                         .bandwidth(10)
            //                                                         (shot))
            // console.log(shot_contour)
            // shot_contour.exit().remove();

            // heat_g
            //    .enter().append('path')
            //    .merge(shot_contour)
            //      .attr('class','heat_map')
            //      .attr('fill', 'none')
            //      .attr('stroke', '#000')
            //      .attr('stroke-width', 0.5)
            //      .attr('stroke-linejoin', 'round')
            //      .attr('fill', function(d) { return color(d.value); })
            //      .attr('d', d3.geoPath());


          });


}
