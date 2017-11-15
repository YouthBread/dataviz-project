function Injurty_Info(year) {
    var format = d3.timeFormat('%Y');

    d3.csv('data/injury.csv', data => {
        var target_season = format(year) + '-' + (year.getFullYear() + 1).toString().substring(2, 4);
        var data = data.filter(d => d.Season === target_season);

        function tabulate(data) {
            d3.select('#injury_table').remove()

            var table = d3.select('#court').append('table').attr('id', 'injury_table').attr('class', 'table-condensed');
            var thead_basic = table.append('thead')
            var tbody_basic = table.append('tbody');
            var thead_detail = table.append('thead')
            var tbody_detail = table.append('tbody');

            var basic_col = ['', 'Content'];

            // append the header row
            thead_basic.append('tr')
                .selectAll('th')
                .data(basic_col).enter()
                .append('th')
                .text(function(column) { return column; });

            // create a row for each object in the data
            var rows = tbody_basic.selectAll('tr')
                .data(data)
                .enter()
                .append('tr');

            // create a cell in each row for each column
            var cells = rows.selectAll('td')
                .data(function(row) {
                    return basic_col.map(function(column) {
                        return { column: column, value: row[column] };
                    })
                })
                .enter()
                .append('td')
                .text(function(d) { return d.value; });


            return table;
        }

        // render the table(s)
        tabulate(data);

    })
}
