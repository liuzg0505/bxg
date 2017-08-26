/**
 * Created by Administrator on 2017/8/25 0025.
 */

define(["jquery", "template", "tool", "uploadify", "jquery_jcrop"], function ($, template, tool) {
  
  $(function () {
    
    var cs_id = tool.getParam("cs_id");
    var x, y, w, h;
    
    //发送ajax请求获取数据回显到页面
    $.ajax({
      type: "get",
      url: "/api/course/picture",
      data: {
        cs_id: cs_id
      },
      success: function (info) {
        if (info.code == 200) {
          //console.log(info);
          var html = template("tpl_courseinfo", info.result);
          $(".course-add").html(html);
          
          //文件上传插件
          $("#upfile").uploadify({
            swf: '/public/assets/uploadify/uploadify.swf',//通过swf上传，这个必须指定
            uploader: '/api/uploader/cover',//图片上传的服务端地址。
            height: 30,//高度
            width: 70, //宽度
            buttonClass: "btn btn-success btn-sm", //按钮的类
            buttonText: "选择图片", //指定按钮的文本内容
            itemTemplate: "<span></span>", //上传进度盒子
            fileObjName: "cs_cover_original", //指定上传的这个表单框的name属性，后端才能获取到。
            formData: {   //可以多传的数据
              cs_id: cs_id
            },
            fileSizeLimit: "2MB", //指定文件大小限制
            fileTypeExts: "*.jpg; *.png; *.gif",  //指定上传文件的后缀名
            onUploadSuccess: function (file, data) { //上传成功事件
              //console.log(data);
              //拿到返回数据，转成对象，拿到返回的存好到服务器的图片路径
              var data = JSON.parse(data);
              var path = data.result.path;
              
              //修改当前图片显示
              $(".preview  img").attr("src", path);
              
              //修改当前页面侧边栏的小图
              $(".thumb  img").attr("src", path);
              
              //上传完成后移除裁切图片按钮的disabled属性
              $(".btn_crop").removeAttr("disabled");
              
            },
            onUploadError: function () { //上传失败事件
              alert("上传失败！请稍后重试");
            }
          });
          
        }
      }
    });
    
    
    //给裁切图片按钮注册点击事件
    $("body").on("click", ".btn_crop", function () {
      if ($(this).attr("disabled") == "disabled") {
        return false;
      }
      var btnText = $(this).text();
      if (btnText == "裁切图片") {
        $(this).text("保存图片");
        $('#target').Jcrop({
          setSelect: [0, 0, 10000, 10000],
          aspectRatio: 2,
          boxWidth: 400,
        }, function () {
          this.initComponent('Thumbnailer', {width: 240, height: 120, parent: ".thumb"});
          //初始化的时候就设置坐标和宽高
          var init = this.getSelection();
          x = init.x;
          y = init.y;
          w = init.w;
          h = init.h;
          
          //注册事件
          $(".preview").on("cropmove", function (e, s, c) {
            x = c.x;
            y = c.y;
            w = c.w;
            h = c.h;
          });
        });
        
      } else {
        $.ajax({
          type: "post",
          url: "/api/course/update/picture",
          data: {
            cs_id: cs_id,
            x: x,
            y: y,
            w: w,
            h: h
          },
          success: function (info) {
            if (info.code == 200) {
              location.href = "/course/step3?cs_id=" + cs_id;
            }
          }
        });
        
        
      }
    });
    
  });
  
  
});