$(function () {
    $("#submit").hover(function () {
        $(".displaySubmit").slideToggle(900);
    });
    $("#close").click(function () {
        $(".displaySubmit").slideUp(900);
        $("#analysisInput").attr("value","").removeAttr("disabled").css("cursor","");
    });
    $(".upload-pic").change(function () {
        if(this.value!==""){
            $("#analysisInput").attr("value",this.value);
            $("#analysisInput").attr("disabled","disabled").css("cursor","not-allowed");
        }
    })
});