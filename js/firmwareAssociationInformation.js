$(function () {
    // var imgHead = "http://10.10.2.254/";
    var img = "<img src='../images/waiting.gif' style='margin-top:100px;'/>";
    $("#containers").html(img);
    sendRequest(1);

    function sendRequest(number) {
        $.ajax({
            url: "http://10.10.2.254:8080/file/fileassociationbynumber/" + number,
            type: "get",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            xhrFields: {withCredentials: true},
            success: function (res) {
                var filenameDownload = res.content.fileName;
                var link = "http://10.10.2.254:8080/file/download?fileName=" + filenameDownload;
                var data = res.content.analysis;
                var firmwareLists = "";
                var str = "<option selected>请选择厂商</option>";
                var manufacturers = removeTheSame(data);
                $.each(data, function (index, val) {
                    firmwareLists += "<li class='fa fa-file-text-o'><a href='firmware.html'>" + val.firmwarenName + "</a></li>";
                });
                var arr = [];
                $.each(manufacturers, function (index, val) {
                    str += "<option>" + index + "</option>";
                    arr.push([index, val]);
                });
                drawHighcharts(arr);
                $("#selectManufacture").html(str);
                $("#firmwareLists").html(firmwareLists);
                var download = "<a href='" + link + "' download='" + link + "'><button class='btn btn-sm btn-danger' id='download'>下载</button></a>";
                $("#downloadDiv").html(download);

                $("#selectManufacture").change(function () {
                    var val = $(this).val();
                    var firmwareListsArr = [];
                    if (val !== "请选择厂商") {
                        for (var i = 0; i < data.length; i++) {
                            if (val === data[i].manufacturer) {
                                firmwareListsArr.push(data[i]);
                            }
                        }
                    }
                    else {
                        firmwareListsArr = data;
                    }
                    var firmwareLists = "";
                    $.each(firmwareListsArr, function (index, val) {
                        firmwareLists += "<li class='fa fa-file-text-o'><a href='firmware.html'>" + val.firmwarenName + "</a></li>";
                    });
                    $("#firmwareLists").html(firmwareLists);
                });
            }
        });
    }

    $(".sample").click(function () {
        var number = $(this).attr('number');
        sendRequest(number);
    });

    function removeTheSame(data) {
        var obj = {};
        for (var i = 0; i < data.length; i++) {
            if (!obj[data[i].manufacturer]) {
                obj[data[i].manufacturer] = 1;
            }
            else {
                obj[data[i].manufacturer]++;
            }
        }

        return obj;
    }

    $("#file").change(function () {
        if (!$("#file").val()) {
            alert("please upload file");
        }
        else {
            var img = "<img src='../images/waiting.gif' style='margin-top:100px;'/>";
            $("#containers").html(img);

            var formData = new FormData();
            formData.append('file', $('#file')[0].files[0]);

            $("#fileInformation").html($("#file").val());
            uploadFileRequest(formData);
        }

        var dz = $('#uploadForm');
        dz.ondragover = function (ev) {
            ev.preventDefault();
            this.className = 'over';
        };

        dz.ondragleave = function () {
            this.className = '';
        };

        dz.ondrop = function (ev) {
            this.className = '';
            ev.preventDefault();
            var formData = new FormData();
            var fileList = ev.dataTransfer.files[0];
            formData.append('file', fileList);

            $("#fileInformation").html($("#file").val());
            var img = "<img src='../images/waiting.gif' style='margin-top:100px;'/>";
            $("#containers").html(img);

            uploadFileRequest(formData);
        }
    });

    function uploadFileRequest(formData) {
        $.ajax({
            url: 'http://10.10.2.254:8080/file/associateupload',
            type: 'POST',
            cache: false,
            data: formData,
            processData: false,
            contentType: false
        }).done(function (res) {
            var result = JSON.parse(res);
            var filenameDownload = result.content.filename;
            var data = result.content.analyresult;
            var link = "http://10.10.2.254:8080/file/download?fileName=" + filenameDownload;

            if (data.length === 0) {
                alert("没有结果，请重新上传！");
                $("#containers").html("");
                $("#selectManufacture").html("<option selected>请选择厂商</option>");
                $("#firmwareLists").html("");
                $("#downloadDiv").html("");
                $("#fileInformation").html("");
            }
            else {
                alert("上传成功!");
                $("#fileInformation").html("");
                var firmwareLists = "";
                var str = "<option selected>请选择厂商</option>";
                var manufacturers = removeTheSame(data);
                $.each(data, function (index, val) {
                    firmwareLists += "<li class='fa fa-file-text-o'><a href='firmware.html'>" + val.firmwarenName + "</a></li>";
                });
                var arr = [];
                $.each(manufacturers, function (index, val) {
                    str += "<option>" + index + "</option>";
                    arr.push([index, val]);
                });
                drawHighcharts(arr);
                $("#selectManufacture").html(str);
                $("#firmwareLists").html(firmwareLists);
                var download = "<a href='" + link + "' download='" + link + "'><button class='btn btn-sm btn-danger' id='download'>下载</button></a>";
                $("#downloadDiv").html(download);

                $("#selectManufacture").change(function () {
                    var val = $(this).val();
                    var firmwareListsArr = [];
                    if (val !== "请选择厂商") {
                        for (var i = 0; i < data.length; i++) {
                            if (val === data[i].manufacturer) {
                                firmwareListsArr.push(data[i]);
                            }
                        }
                    }
                    else {
                        firmwareListsArr = data;
                    }
                    var firmwareLists = "";
                    $.each(firmwareListsArr, function (index, val) {
                        firmwareLists += "<li class='fa fa-file-text-o'><a href='firmware.html'>" + val.firmwarenName + "</a></li>";
                    });
                    $("#firmwareLists").html(firmwareLists);
                });
            }
        }).fail(function (res) {
            alert(res);
        });
    }

    function drawHighcharts(obj) {
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
                data: obj
            }]
        });
    }
});
