/**
 * Created by Administrator on 2017/8/25 0025.
 */
define(["jquery", "template", "tool", "bootstrap", "jquery_form"], function ($, template, tool) {
  
  $(function () {
    
    var cs_id = tool.getParam("cs_id");
    
    //发送ajax请求数据回显到课时列表
    $.ajax({
      type: "get",
      url: "/api/course/lesson",
      data: {
        cs_id: cs_id
      },
      success: function (info) {
        if (info.code == 200) {
          //console.log(info.result);
          var html = template("tpl_step3", info.result);
          $(".course-add").html(html);
        }
      }
      
    });
    
    //给添加课时按钮注册事件
    $("body").on("click", ".btn_add", function () {
      
      var html = template("tpl_lesson", {
        title: "添加课时",
        btnText: "添 加",
        cs_id: cs_id
      });
      $("#lesson").html(html);
      //添加请求 -> 给模态框存一个type
      $("#lesson").data("type", "add");
      $("#lesson").modal("show");
      
      
    });
    
    //给编辑课时按钮注册事件
    $("body").on("click", ".btn_edit", function () {
      var ct_id = $(this).parent().parent().data("id");
      
      //回显数据
      $.ajax({
        type: "get",
        url: "/api/course/chapter/edit",
        data: {
          ct_id: ct_id
        },
        success: function (info) {
          if (info.code == 200) {
            //console.log(info);
            info.result.title = "修改课时";
            info.result.btnText = "修 改";
            var html = template("tpl_lesson", info.result);
            $("#lesson").html(html);
            //修改请求 -> 给模态框存一个type
            $("#lesson").data("type", "edit");
            $("#lesson").modal("show");
          }
        }
      });
      
    });
    
    //给添加/修改按钮注册点击事件
    $("body").on("click", ".btn_save", function () {
      
      //判断是添加还是修改请求
      var url = "";
      if ($("#lesson").data("type") == "edit") {
        //修改
        url = "/api/course/chapter/modify";
      } else {
        //添加
        url = "/api/course/chapter/add";
      }
      
      //checkbox获取值的特殊处理：如果checked -> 设置值为0，否则为1
      var ct_is_free = 0;
      var checkbox = $("#ct_is_free");
      if (checkbox.prop("checked")) {
        ct_is_free = 0;
      } else {
        ct_is_free = 1;
      }
  
      console.log($("form").serialize());
  
      //发送ajax请求
      //jquery.form插件能自动把表单有name属性的value序列化后作为参数传递，还可以额外设置自定义参数
      $("form").ajaxSubmit({
        type: "post",
        url: url,
        data: {
          ct_is_free: ct_is_free
        },
        success: function (info) {
          if(info.code == 200) {
            //console.log(info);
            location.reload();
          }
        }
      });
      
    });
    
    //禁用‘获取’按钮功能
    $("body").on("click", ".btn_getvideo", function () {
      return false;
    });
  });
});