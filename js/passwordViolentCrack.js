var i=0;
/*add——创建tbx下的div加文字和变宽度的方法*/
function add(i){
    var tbox =$(".tbox");
    var tiao =$(".tiao");
    tiao.css("width",i+"%").html(i+"%");
}
/*创建方法（i++循环起来）*/
function xh(){
    if(i>100){
        // $(".ok").html("破解完成").fadeIn("fast");
        alert("破解完成");
        return;
    }
    if(i<=100){
        setTimeout("xh()",50);
        add(i);
        i++;
    }
}

$(function () {
    $(".box").hide();
    $("#upload").change(function () {
        if(this.value!==""){
            $("#dicInput").attr("value",this.value);
        }
    });
    $("#pojie").click(function () {
        $(".box").show();
        xh();
    });
});