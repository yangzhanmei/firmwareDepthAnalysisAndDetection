$(function () {
    var res = ["a", "b"];
    var manufacturerList = document.getElementById("manufacturerList");
    var manufacturerString = "";
    $.each(res, function (index, val) {
        manufacturerString += "<div class='manufacturer'>" +
            "<a href='#' class='manufacturerA'>" + val + "</a>" +
            "</div>"
    });
    manufacturerList.innerHTML = manufacturerString;

    $(".manufacturerA").click(function () {

        return getFirmwareByManufacturer(this.innerHTML);
    })
});

function getFirmwareByManufacturer(manufacturer) {
    var res = [];
    res.push(manufacturer);
    var firmwareList = document.getElementById("firmwareList");
    var firmwareString = "";
    $.each(res, function (index, val) {
        firmwareString += " <div class='firmware'>" +
            "<a href='../view/firmware.html?" + val + "'>" + val + "</a>" +
            "</div>"
    });
    firmwareList.innerHTML = firmwareString;
}