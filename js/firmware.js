$(document).ready(function(){
    $(".menu ul").css("display","none");
    $(".menu a").on("click", function(){
        $(this).next().toggle();
    });
});