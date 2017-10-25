function Stat_Table(year){
  var format = d3.timeFormat('%Y');

    d3.csv('data/stat.csv', data => {
      var target_season = format(year)+'-'+(year.getFullYear()+1).toString().substring(2, 4);
      var data = data.filter(d=>d.Season===target_season);

      function tabulate(data, columns) {
        d3.select('table').remove()
        var table = d3.select('court').append('table')
        var thead = table.append('thead')
        var tbody = table.append('tbody');

        // append the header row
        thead.append('tr')
          .selectAll('th')
          .data(columns).enter()
          .append('th')
            .text(function (column) { return column; });

        // create a row for each object in the data
        var rows = tbody.selectAll('tr')
          .data(data)
          .enter()
          .append('tr');

        // create a cell in each row for each column
        var cells = rows.selectAll('td')
          .data(function (row) {
            return columns.map(function (column) {
              return {column: column, value: row[column]};
            })
          })
          .enter()
          .append('td')
            .text(function (d) { return d.value; });

        return table;
      }

      // render the table(s)
      tabulate(data, ['Season','ORB','AST', 'STL', 'BLK', 'PTS']); // 2 column table

    })
}

