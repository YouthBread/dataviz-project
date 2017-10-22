function Slider () {
    const width = chartDiv.clientWidth/4;
    const height = width/50*47;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    var slider_axis = court.append('g');
    var slider_rect = court.append('g');

    slider_axis.attr("width", innerWidth)
          .attr("height", innerHeight)
          .attr('transform', `translate(0, ${innerHeight+20})`)

    slider_rect.attr("width", innerWidth)
          .attr("height", innerHeight)
          .attr('transform', `translate(0, ${innerHeight})`)

    var minDate = new Date('1997'),
        scale = d3.scaleTime()
            .domain([minDate, d3.timeYear.offset(minDate, 18)])
            .range([margin.left, innerWidth])
            .clamp(true),
        format = d3.timeFormat('%Y');

    updateHeader(minDate)
    add_shot(minDate)


    slider_axis
        .attr('class', 'axis')
        .call(d3.axisBottom(scale).ticks(d3.timeYear.every(3)));

    slider_rect
        .attr("class", "slider")
        .call(d3.drag().on('drag', dragged));

    var rectWidth = 8;
    var rect = slider_rect.append("rect")
                     .attr("x", margin.left)
                     .attr("y", 0)
                     .attr("width", rectWidth)
                     .attr("height", 20);


    function updateHeader(date) {
        d3.select('#header').text(format(date)+'-'+(date.getFullYear()+1).toString()+' season');
    }


    function dragged(d) {
        const parseTime = d3.timeParse("%Y");
        var prev = d3.select('#header').text().split('-')[0]
        var x = Math.min(Math.max(d3.event.x, margin.left), innerWidth);
                value = scale.invert(x);

        d3.select('.slider').attr('transform', 'translate(' + x + ',' + innerHeight + ')');
        updateHeader(value);
        if (value.getFullYear() != parseTime(prev).getFullYear()) add_shot(value);
    }
}

