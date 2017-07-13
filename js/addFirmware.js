$(function () {
    $("#submit").click(function () {
        $(".displaySubmit").slideToggle(900);
    });
    $("#close").click(function () {
        $(".displaySubmit").slideUp()(1000);
    })
});