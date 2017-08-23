/**
 * Created by Administrator on 2017/8/22 0022.
 */

define(["jquery", "template", "tool","ckeditor", "uploadify", "jquery_cookie", "region"], function ($, template, tool, CKEDITOR) {
    
  $(function () {
    
    //渲染数据
    $.ajax({
      type:"get",
      url: "/api/teacher/profile",
      success: function (info) {
        if(info.code == 200) {
          var html = template("tpl_settings", info.result);
          $(".teacher-profile").html(html);
          
          //日期插件
          tool.setDate("#tc_birthday");
          tool.setDate("#tc_join_date");
          
          //文件上传插件
          $("#upfile").uploadify({
            height        : 120,//高度
            swf           : '/public/assets/uploadify/uploadify.swf',//通过swf上传，这个必须指定
            uploader      : '/api/uploader/avatar',//图片上传的服务端地址。
            width         : 120, //宽度
            buttonText    : "", //指定按钮的文本内容
            fileObjName   : "tc_avatar", //指定上传的这个表单框的name属性，后端才能获取到。
            //fileSizeLimit : "2MB", //指定文件大小限制
            fileTypeExts  : "*.jpg; *.png; *.gif",  //指定上传文件的后缀名
            onUploadSuccess: function (file, data, response) { //上传成功事件
              //console.log(data);
              //拿到返回数据，转成对象，拿到返回的存好到服务器的图片路径
              var data = JSON.parse(data);
              var path = data.result.path;
              
              //修改当前图片显示
              $(".preview > img").attr("src", path);
              
              //修改当前页面侧边栏的头像
              $("#userinfo img").attr("src", path);
              
              //修改cookie中的userinfo的tc_avatar 再重新设置cookie
              var userinfo = $.cookie("userinfo");
              userinfo = JSON.parse(userinfo);
              userinfo.tc_avatar = path;
              userinfo = JSON.stringify(userinfo);
              $.cookie("userinfo", userinfo, {path: "/", expires: 1});
              
            },
            onUploadError: function () { //上传失败事件
              alert("上传失败！请稍后重试");
            }
          });
          
          //省市区三级联动插件
          $(".address").region({
            url:"/public/assets/jquery-region/region.json"
          });
          
          //富文本编辑器插件
          CKEDITOR.replace('tc_introduce', {
            toolbarGroups: [
              {name: 'clipboard', groups: ['clipboard', 'undo']},
    
              {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
              '/',
              {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi']},
              {name: 'styles'},
              {name: 'colors'},
            ]
          });
          
        }
      }
      
      
    });
    
    //注册事件 保存修改
    $("body").on("click", ".btn_save", function () {
      //手动同步富文本编辑器的value
      for ( instance in CKEDITOR.instances )
      {
        CKEDITOR.instances[instance].updateElement();
      }
      
      //发ajax请求保存修改
      $.ajax({
        type: "post",
        url: "/api/teacher/modify",
        data: $("form").serialize(),
        success: function (info) {
          if(info.code == 200) {
            location.href = "/settings";
          }
        }
      });
      
    });
    
    
    
    
  })
  
});