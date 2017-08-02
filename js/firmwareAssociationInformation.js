$(function () {
    $('#containers').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: '关联结果'
        },
        tooltip: {
            headerFormat: '{series.name}<br>',
            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            type: 'pie',
            data: [
                ['NetGear', 45.0],
                ['Dlink', 26.8],
                ['TPlink', 12.8],
                ['ZyXEL', 8.5],
                ['Schneider', 6.2]
            ]
        }]
    });
});
