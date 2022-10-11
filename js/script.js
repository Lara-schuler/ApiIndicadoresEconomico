var dados = new Array();
var url = `https://www.econdb.com/api/series/IPUS/?format=json`;

fetch(url).then(response => response.json())
    .then(response => {
        for (let i = 0; i < response.data.dates.length; i++) {
            //console.log(response.data.dates[i] + "-" + response.data.values[i]);
            dados.push([response.data.dates[i], response.data.values[i]]);
        }
        //drawChart(dados);

        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            
            if (dados.length > 0) {

                var data = google.visualization.arrayToDataTable([
                    ['Year', 'Sales'],
                    ...dados

                ]);

                var options = {
                    title: 'Company Performance',
                    curveType: 'function',
                    legend: { position: 'bottom' }
                };

                var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

                chart.draw(data, options);

            }
        }
    });
