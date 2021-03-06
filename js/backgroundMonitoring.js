// function drawAxis() {
//     var getPixelRatio = function (context) {
//         var backingStore = context.backingStorePixelRatio ||
//             context.webkitBackingStorePixelRatio ||
//             context.mozBackingStorePixelRatio ||
//             context.msBackingStorePixelRatio ||
//             context.oBackingStorePixelRatio ||
//             context.backingStorePixelRatio || 1;
//         return (window.devicePixelRatio || 1) / backingStore;
//     };
//
//     var canvas = document.getElementById('canvas');
//     var ctx = canvas.getContext('2d');
//     var ratio = getPixelRatio(ctx);
//     var width = canvas.width;
//     var height = canvas.height;
//     var padding = 90;        // 坐标轴到canvas边框的边距，留边距写文字
//
//     ctx.beginPath();
//     ctx.lineWidth = 1;
// // y轴线
//     ctx.moveTo(padding * ratio, (height - padding) * ratio);
//     ctx.lineTo(padding * ratio, padding * ratio);
//     ctx.stroke();
// // x轴线
//     ctx.moveTo(padding * ratio, (height - padding) * ratio);
//     ctx.lineTo((width - padding) * ratio, (height - padding) * ratio);
//     ctx.stroke();
//
//     ctx.fillStyle = "red";
//     ctx.fillRect((width - 2 * padding) * ratio, 15 * ratio, 25, 25);
//
//     ctx.fillStyle = "black";
//     ctx.font = "25px 微软雅黑";
//     ctx.fillText("固件数", (width - 1.5 * padding ) * ratio, 30 * ratio);
//
//     ctx.fillStyle = "blue";
//     ctx.fillRect((width - 2 * padding) * ratio, 45 * ratio, 25, 25);
//
//     ctx.fillStyle = "black";
//     ctx.font = "25px 微软雅黑";
//     ctx.fillText("已解压", (width - 1.5 * padding) * ratio, 60 * ratio);
//
//     var xData = getXdata();
//     var yFictitious = 100;  //根据所给数据确定大小
//
//     var yNumber = 5;                                                // y轴的段数
//     var yLength = Math.floor((height - padding * 2) / yNumber);     // y轴每段的真实长度
//     var xLength = Math.floor((width - padding * 2) / xData.length);  // x轴每段的真实长度
//
//     ctx.beginPath();
//     ctx.textAlign = 'center';
//     ctx.fillStyle = '#000000';
//     ctx.strokeStyle = '#000000';
//
// // x轴刻度和值
//     for (var i = 0; i < xData.length; i++) {
//         var xAxis = xData[i];
//         var xlen = xLength * (i + 1);
//         ctx.moveTo((padding + xlen) * ratio, (height - padding) * ratio);
//         ctx.lineTo((padding + xlen) * ratio, (height - padding + 5) * ratio);
//         ctx.stroke();                                       // 画轴线上的刻度
//         ctx.fillText(xAxis, (padding + xlen - xLength / 2) * ratio, (height - padding + 35) * ratio);   // 填充文字
//     }
// // y轴刻度和值
//     for (var j = 0; j < yNumber; j++) {
//         var Yx = yFictitious * (j + 1);
//         var ylen = yLength * (j + 1);
//         ctx.moveTo(padding * ratio, (height - padding - ylen) * ratio);
//         ctx.lineTo((padding - 5) * ratio, (height - padding - ylen) * ratio);
//         ctx.stroke();
//         ctx.fillText(Yx, (padding - 30) * ratio, (height - padding - ylen + 5) * ratio);
//     }
//
//     //固件柱状
//     var firmwareList = [100, 200, 300, 400, 400, 200, 300, 100, 400, 300];
//     for (var z = 0; z < firmwareList.length; z++) {
//         var xFirmware = firmwareList[z] / (yFictitious * 5) * yFictitious * 4;
//         var yFirmware = height - padding - xFirmware;
//         ctx.fillStyle = "red";
//         ctx.fillRect((padding + xLength * (z + 0.25)) * ratio, yFirmware * ratio, 25, xFirmware);
//         // 保存每个柱状的信息
//         firmwareList[z].left = padding + xLength / 4 + xLength * z;
//         firmwareList[z].top = yFirmware;
//         firmwareList[z].right = padding + 3 * xLength / 4 + xLength * z;
//         firmwareList[z].bottom = height - padding;
//     }
//
//     //已解压柱状
//     var alreadyDecompressedList = [100, 200, 300, 400, 400, 100, 200, 300, 400, 400];
//     for (var m = 0; m < alreadyDecompressedList.length; m++) {
//         var xAlDecompressed = alreadyDecompressedList[m] / (yFictitious * 5) * yFictitious * 4;
//         var yAlDecompressed = height - padding - xAlDecompressed;
//         ctx.fillStyle = "blue";
//         ctx.fillRect((padding + xLength * (m + 0.5)) * ratio, yAlDecompressed * ratio, 25, xAlDecompressed);
//         // 保存每个柱状的信息
//         alreadyDecompressedList[m].left = padding + xLength / 4 + xLength * m;
//         alreadyDecompressedList[m].top = yAlDecompressed;
//         alreadyDecompressedList[m].right = padding + 3 * xLength / 4 + xLength * m;
//         alreadyDecompressedList[m].bottom = height - padding;
//     }
// }
//
function getXdata() {
    var Xdata = [];
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    var number = 10;
    for (var i = 0; i < number; i++) {

        if (day < 1) {
            if (month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
                month -= 1;
                day = 30;
            }
            else if (month === 3) {
                month -= 1;
                if (year % 4 === 0 || year % 400 === 0) {
                    day = 29;
                }
                else {
                    day = 28;
                }
            }
            else if (month === 1) {
                month = 12;
                year -= 1;
                day = 31;
            }
            else {
                month -= 1;
                day = 31;
            }
        }
        Xdata.unshift(month.toString() + "/" + day.toString() + "/" + year.toString());
        day = day - 1;
    }

    return Xdata;
}


function zipFirmware() {
    var decompressingFirmwareList = ["a", "b", "c", "d", "e", "f", "g"];

    var tbody = document.getElementById("tbody");
    var tr = "";

    for (var j = 0; j < 6; j++) {
        var val = decompressingFirmwareList[j];
        tr += "<tr><td>" + val + "</td>" + "<td>" + val + "</td>" + "<td>" + val + "</td>" +
            "<td>" + val + "</td>" + "<td>" + val + "</td>" + "<td>" + val + "</td>" +
            "<td><a href='#' data-toggle='modal' data-target='#myModal'><img src='../images/delete.png'></td></tr>";
    }
    tbody.innerHTML = tr;

    var index = 1;

    window.setInterval(function () {
        getDecompressingFirmware()
    }, 3000);

    function getDecompressingFirmware() {

        var aList = [];
        for (var i = index; i < index + 6; i++) {
            aList.push(decompressingFirmwareList[i]);
        }
        if (index + 6 === decompressingFirmwareList.length) {
            index = 0;
        }
        else {
            index++;
        }
        var tbody = document.getElementById("tbody");
        var tr = "";

        $.each(aList, function (index, val) {
            tr += "<tr><td>" + val + "</td>" + "<td>" + val + "</td>" + "<td>" + val + "</td>" +
                "<td>" + val + "</td>" + "<td>" + val + "</td>" + "<td>" + val + "</td>" +
                "<td><a href='#' data-toggle='modal' data-target='#myModal'><img src='../images/delete.png'></td></tr>";
        });
        tbody.innerHTML = tr;
    }

}

$(function () {
    zipFirmware();
    $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '厂商解压固件数'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories:getXdata(),
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: '固件数'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: '固件数',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1]
        }, {
            name: '已解压',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5]
        }]
    });
});