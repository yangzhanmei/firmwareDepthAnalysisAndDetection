$(function () {
    /**
     * 使用递归遍历json字符串，生成树结构
     * @param  {[type]} tData json字符串
     * @return {[type]}       返回树结构
     */
    function loadTree(tData) {

        var ul = $('<ul>');
        for (var i = 0; i < tData.length; i++) {
            var li = $('<li style="width: 250px">').appendTo(ul);
            var node = $('<a style="color: white">').appendTo(li);
            var icon = $('<i>').css('margin-right', '5').appendTo(node);
            var aTree = $('<a href="#" style="color: white">').html(tData[i].name).appendTo(node);
            var input = $('<input>').addClass('field').val(tData[i].name).css({'display': 'none'}).appendTo(node);

            // 处理有子节点的
            if (tData[i].contents != undefined) {
                // 添加图标样式
                icon.addClass('fa fa-minus-square-o');
                var ic = $('<i>').addClass('fa fa-folder-open-o');
                icon.after(ic).addClass('status');
                node.addClass('tree-node');

                // 添加标记节点是否打开
                $('<input>').addClass('open').val(tData[i].open).css('display', 'none').appendTo(node);

                // 递归遍历子节点
                loadTree(tData[i].contents).appendTo(li);
            } else {
                if (tData[i].type === "file") {
                    icon.addClass('fa fa-file-text-o');
                    icon.next().addClass("yeziNode");
                    icon.next().click(function () {
                        console.log(1);
                        fileClick(this.text);
                    });
                }
                else if (tData[i].type === "link") {
                    icon.addClass('fa fa-shield');
                }
                // 叶子节点新增是否可选
                $('<input>').addClass('candidate').val(tData[i].candidate).css('display', 'none').appendTo(li);
            }
        }
        return ul;
    }

    /**
     * 节点点击事件
     * @param  {[type]} box 存在菜单树的盒子
     */
    function nodeClick(box) {
        box.find('.tree-node').click(function () {
            // 判断该节点是否开启
            if ($.trim($(this).find('.open').val()) == 'true') {
                // 已开启，则关闭节点
                $(this).next().slideUp(500);
                $(this).find('.open').val('false');
                $(this).find('.status').removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
            } else {
                // 开启前关闭节点下的所有节点
                $(this).next().find('.tree-node').each(function () {
                    $(this).next().css('display', 'none');
                    $(this).find('.open').val('false');
                    $(this).find('.status').removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
                });

                // 已关闭，则开启节点
                $(this).find('.open').val('true');
                $(this).find('.status').removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
                // 开启节点下的节点

                $(this).next().slideDown(500);
            }
        })
    }

    function fileClick(fileName) {
        var str1 = "<li class='active'><a href='#basicInformation' data-toggle='tab'>基础信息</a></li>" +
            "<li><a href='#homologousFirmware' data-toggle='tab'>同源组件</a></li>";
        $("#myTab").html(str1);
        var str2 = "<div class='tab-pane fade in active' id='basicInformation'><div id='table'>" +
            "<div class='div'><div class='divTag tdTag'>文件名</div><div class='divTag tdVul'>" + fileName + "</div></div>" +
            "<div class='div'><div class='divTag tdTag'>路径</div><div class='divTag tdVul'>/bin/busybox</div></div>" +
            "<div class='div'><div class='divTag tdTag'>MD5</div><div class='divTag tdVul'>645c8f12bd2549ad328cfdefc188b190</div></div>" +
            "<div class='div'><div class='divTag tdTag'>大小</div><div class='divTag tdVul'>7143450</div></div>" +
            "<div class='div'><div class='divTag tdTag'>类型</div>" +
            "<div class='divTag tdVul'>ELF 32-bit MSB executable, version 1 (SYSV), dynamically linked (uses sharedlibs), sdivipped </div></div>" +
            "<div class='div'><div class='divTag tdTag'>操作系统</div><div class='divTag tdVul'>Linux</div></div>" +
            "<div class='div'><div class='divTag tdTag'>指令集</div><div class='divTag tdVul'>32bit MIPS 大端</div></div></div></div>";
        var div = "<div class='tab-pane fade' id='homologousFirmware'></div>";

        $(".tab-content").html(str2 + div);
    }

    function firstNodeClick(firmwareName,firmwarePath) {
        var str1 = " <li class='active'>" +
            "<a href='#general' data-toggle='tab'>基础信息</a></li>" +
            "<li><a href='#contents' data-toggle='tab'>弱口令</a></li>" +
            "<li><a href='#entropy' data-toggle='tab'>开源组件</a></li>" +
            "<li><a href='#loopholes' data-toggle='tab'>疑似漏洞</a></li>";
        $("#myTab").html(str1);
        var str2 = "<div class='tab-pane fade in active' id='basicInformation'><div id='table'>" +
            "<div class='div'><div class='divTag tdTag'>固件名</div><div id='firmwareName' class='divTag tdVul'>" + firmwareName + "</div></div>" +
            "<div class='div'><div class='divTag tdTag'>路径</div><div id='firmwarePath' class='divTag tdVul'>"+firmwarePath+"</div></div>" +
            "<div class='div'><div class='divTag tdTag'>MD5</div><div id='firmwareMD5' class='divTag tdVul'>645c8f12bd2549ad328cfdefc188b190</div></div>" +
            "<div class='div'><div class='divTag tdTag'>大小</div><div id='firmwareBig' class='divTag tdVul'>7143450</div></div>" +
            "<div class='div'><div class='divTag tdTag'>操作系统</div>" +
            "<div id='firmwareSystem' class='divTag tdVul'>Linux</div></div>" +
            "<div class='div'><div class='divTag tdTag'>指令集</div><div id='firmwareInstruction' class='divTag tdVul'>32bit MIPS 大端</div></div>" +
            "<div class='div'><div class='divTag tdTag'>入库时间</div><div id='firmwareTime' class='divTag tdVul'>32bit MIPS 大端</div></div></div>" +
            " <div class='tab-list' style='margin-top: 20px;margin-left: 70%'>" +
            " <button class='btn btn-danger'>下载</button>" +
            "</div></div>";
        var div = "  <div class='tab-pane fade' id='contents'>" +
            "<div>" +
            "<span>开源组件搜索</span><span><img src='../images/sousuo.png'></span>" +
            "</div>" +
            "<div>" +
            "<span>etc/passwd、etc/shadow 破解</span><span><img src='../images/yaoshi.png'></span>" +
            " </div></div>" +
            "<div class='tab-pane fade' id='entropy'>" +
            "<p>Compressed yes</p>" +
            "<p>Encrypted no</p>" +
            "</div>" +
            "<div class='tab-pane fade' id='loopholes'>" +
            "</div>";

        $(".tab-content").html(str2 + div);
    }


    $.ajax({
        url: "/api/firmware/getfirmwaretree/596701ad35bd191130442039",
        type: "get",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        xhrFields: {withCredentials: true},
        success: function (res) {
            var data = JSON.parse(res.content.fileContent);
            var firmwareName = res.content.firmwareName;
            var firmwarePath = res.content.firmwarePath;
            if (res.status === 0) {
                $('#default_tree').append(loadTree(data));
                $("#default_tree").children(":first").children(":first").children(":first").children("a").addClass("firstNode");
                nodeClick($('#default_tree'));
                $("#firmwareName").html(firmwareName);
                $("#firmwarePath").html(firmwarePath);
                $("#firmwareMD5").html("645c8f12bd2549ad328cfdefc188b190");
                $("#firmwareBig").html("7143450");
                $("#firmwareSystem").html("Linux");
                $("#firmwareInstruction").html("32bit MIPS 大端");
                $("#firmwareTime").html("2017-7-19 T13:12:01");
                $(".firstNode").click(function () {
                    firstNodeClick(firmwareName,firmwarePath);
                })
            }
            else {
                alert("获取失败！");
            }
        }
    });
});