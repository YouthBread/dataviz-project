function add_shot(year){
    const width = court_width;
    const height = width/50*47;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    shot_xScale.range([margin.left, innerWidth])
               .nice();

    shot_yScale.range([margin.top, innerHeight])
               .nice();



    d3.csv('data/kobe.csv', data => {
            var select_type=d3.select('.btn.btn-secondary.active').text().replace(/^\s+|\s+$/g, '');
            if (select_type=='All shots') {var data = data}
            else if (select_type=='Made') {var data = data.filter(d=>d.shot_made_flag == 1)}
            else {var data = data.filter(d=>d.shot_made_flag == 0)}
            //filtering the unreasonable shot
            data = data.filter(d=>d.loc_y < 400)
            var temp_data = d3.nest()
                      .key(function(d) { return d.season; })
                      .key(function(d) { return d.shot_made_flag; })
                      .entries(data);
            var target = (year.getFullYear()).toString()+'-'+(year.getFullYear()+1).toString().substring(2, 4)

            temp_data = temp_data.filter(d=>d.key==target);


            if (select_type=='All shots') {
              var made = temp_data[0].values[0];
              var miss = temp_data[0].values[1];
            } else if (select_type=='Made') {
              var made = temp_data[0].values[0];
              var miss = {'values':[]};
            } else {
              var miss = temp_data[0].values[0];
              var made = {'values':[]};
            }


            var circles_made = court.selectAll('.circle_made').data(made.values)
            circles_made.exit().remove();

            circles_made
              .enter().append('circle')
              .merge(circles_made)
                .attr('class','circle_made')
                .transition(t)
                .attr('cx', d => shot_xScale(d.loc_x))
                .attr('cy', d => shot_yScale(d.loc_y))
                .attr('fill', 'green')
                .attr('fill-opacity', 0.2)
                .attr('r', 2);

            var circles_miss = court.selectAll('.circle_miss').data(miss.values)
            circles_miss.exit().remove();


            circles_miss
              .enter().append('path')
              .merge(circles_miss)
                .attr('class','circle_miss')
                .transition(t)
                .attr('transform',function(d,i) { return 'translate('+shot_xScale(d.loc_x)+','+shot_yScale(d.loc_y)+')';})
                .attr('d', d3.symbol().type(d3.symbols[1]).size(30))
                .attr('fill-opacity', 0.2)
                .attr('fill','red');
          });
}
