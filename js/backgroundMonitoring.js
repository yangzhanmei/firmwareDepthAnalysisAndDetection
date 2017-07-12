function drawAxis() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var padding = 30;        // 坐标轴到canvas边框的边距，留边距写文字

    ctx.beginPath();
    ctx.lineWidth = 1;
// y轴线
    ctx.moveTo(padding + 0.5, height - padding + 0.5);
    ctx.lineTo(padding + 0.5, padding + 0.5);
    ctx.stroke();
// x轴线
    ctx.moveTo(padding + 0.5, height - padding + 0.5);
    ctx.lineTo(width - padding + 0.5, height - padding + 0.5);
    ctx.stroke();

    ctx.fillStyle = "red";
    ctx.fillRect(width - 2 * padding, 10, 10, 10);

    ctx.fillStyle = "black";
    ctx.font = "10px serif";
    ctx.fillText("固件数", width - padding - 5, 18);

    ctx.fillStyle = "blue";
    ctx.fillRect(width - 2 * padding, 25, 10, 10);

    ctx.fillStyle = "black";
    ctx.font = "10px serif";
    ctx.fillText("已解压", width - padding - 5, 33);

    var xData = getXdata();
    var yFictitious = 100;  //根据所给数据确定大小

    var yNumber = 5;                                                // y轴的段数
    var yLength = Math.floor((height - padding * 2) / yNumber);     // y轴每段的真实长度
    var xLength = Math.floor((width - padding * 2) / xData.length);  // x轴每段的真实长度

    ctx.beginPath();
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#000000';

// x轴刻度和值
    for (var i = 0; i < xData.length; i++) {
        var xAxis = xData[i];
        var xlen = xLength * (i + 1);
        ctx.moveTo(padding + xlen, height - padding);
        ctx.lineTo(padding + xlen, height - padding + 5);
        ctx.stroke();                                       // 画轴线上的刻度
        ctx.fillText(xAxis, padding + xlen - xLength / 2, height - padding + 15);   // 填充文字
    }
// y轴刻度和值
    for (var j = 0; j < yNumber; j++) {
        var Yx = yFictitious * (j + 1);
        var ylen = yLength * (j + 1);
        ctx.moveTo(padding, height - padding - ylen);
        ctx.lineTo(padding - 5, height - padding - ylen);
        ctx.stroke();
        ctx.fillText(Yx, padding - 10, height - padding - ylen + 5);
    }

    //固件柱状
    var firmwareList = [100, 200, 300, 400, 400];
    for (var z = 0; z < firmwareList.length; z++) {
        var xFirmware = firmwareList[z] / (yFictitious * 5) * yFictitious;
        var yFirmware = height - padding - xFirmware;
        ctx.fillStyle = "red";
        ctx.fillRect(padding + xLength * (z + 0.25), yFirmware, 10, xFirmware);
        // 保存每个柱状的信息
        firmwareList[z].left = padding + xLength / 4 + xLength * z;
        firmwareList[z].top = yFirmware;
        firmwareList[z].right = padding + 3 * xLength / 4 + xLength * z;
        firmwareList[z].bottom = height - padding;
    }

    //已解压柱状
    var alreadyDecompressedList = [100, 200, 300, 400, 400];
    for (var m = 0; m < alreadyDecompressedList.length; m++) {
        var xAlDecompressed = alreadyDecompressedList[m] / (yFictitious * 5) * yFictitious;
        var yAlDecompressed = height - padding - xAlDecompressed;
        ctx.fillStyle = "blue";
        ctx.fillRect(padding + xLength * (m + 0.5), yAlDecompressed, 10, xAlDecompressed);
        // 保存每个柱状的信息
        alreadyDecompressedList[m].left = padding + xLength / 4 + xLength * m;
        alreadyDecompressedList[m].top = yAlDecompressed;
        alreadyDecompressedList[m].right = padding + 3 * xLength / 4 + xLength * m;
        alreadyDecompressedList[m].bottom = height - padding;
    }
}

function getXdata() {
    var Xdata = [];
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    for (var i = 0; i < 5; i++) {

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

$(function () {
    drawAxis();
});
