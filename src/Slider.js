function Slider () {
    const parseTime = d3.timeParse("%Y");
    const width = court_width;
    const height = width/50*47;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;


    slider_axis.attr('transform', `translate(0, ${innerHeight+20})`)

    slider_rect.attr("width", innerWidth)
          .attr("height", innerHeight)
          .attr('transform', `translate(0, ${innerHeight})`)

    var minDate = new Date('1997'),
        scale = d3.scaleTime()
            .domain([minDate, d3.timeYear.offset(minDate, 19)])
            .range([margin.left, innerWidth])
            .clamp(true),
        format = d3.timeFormat('%Y');

    updateHeader(minDate);
    Heat_Map(minDate);
    add_shot(minDate);
    Stat_Table(minDate);
    // Injurty_Info(minDate);

    Shot_Stat_Line('PTS', 'line1');
    Shot_Accu_Line(minDate, 'line2');
    Shot_Score_Line(minDate, 'line3');

    slider_axis
        .attr('class', 'axis')
        .call(d3.axisBottom(scale).ticks(d3.timeYear.every(3)));

    slider_rect
        .attr("class", "slider")
        .call(d3.drag().on('drag', debounceD3Event(dragged,200)));

    var rectWidth = 8;
    rect_entity.attr("x", margin.left)
               .attr("y", 0)
               .attr("width", rectWidth)
               .attr("height", 20);


    function updateHeader(date) {
        var title_court = d3.select(".col-md-5").select('#caption');
        title_court.text(format(date)+'-'+(date.getFullYear()+1).toString()+' season shoting map')
                            .attr('x', margin.left)
                            .attr('y', margin.top);

        var title_line2 = d3.select("#line2_caption");
        title_line2.text(format(date)+'-'+(date.getFullYear()+1).toString()+' season shoting accuracy per game')
                            .attr('x', margin.left)
                            .attr('y', margin.top);

        var title_line3 = d3.select("#line3_caption");
        title_line3.text(format(date)+'-'+(date.getFullYear()+1).toString()+' season score per game')
                            .attr('x', margin.left)
                            .attr('y', margin.top);

    }


    function dragged(d) {
        var title = d3.select("#caption");
        var prev = title.text().split('-')[0]
        var x = Math.min(d3.event.x, innerWidth);
                value = scale.invert(x);

        update_all_plots(value, prev)
            //add_shot(value);
    }
    function update_all_plots(value, prev){
        updateHeader(value);
        if (value.getFullYear() != parseTime(prev).getFullYear()) {
            Heat_Map(value);
            add_shot(value);
            Stat_Table(value);
            // Injurty_Info(value);
            Shot_Accu_Line(value, 'line2');
            Shot_Score_Line(value, 'line3');
      setTimeout(function(){ $(document).ready(function(){
          $('[data-toggle="tooltip"]').tooltip();
      }); }, 4000);
        }
    }

    // https://stackoverflow.com/questions/28773113/d3-event-is-null-inside-of-debounced-function
    function debounceD3Event(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this;
        var args = arguments;
        var evt  = d3.event;

        var later = function() {
          timeout = null;
          if (!immediate) {
            var tmpEvent = d3.event;
            d3.event = evt;
            func.apply(context, args);
            d3.event = tmpEvent;
          }
        };

        var callNow = immediate && !timeout;

        var x = Math.min(d3.event.x, innerWidth);
        d3.select('.slider').attr('transform', 'translate(' + Math.max(0,Math.min(x, x-margin.left)) + ',' + innerHeight + ')');

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
          var tmpEvent = d3.event;
          d3.event = evt;
          func.apply(context, args);
          d3.event = tmpEvent;
        }

      };
    }

}




