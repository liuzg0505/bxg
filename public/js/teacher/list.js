/**
 * Created by Administrator on 2017/8/21 0021.
 */


define(["jquery", "template", "bootstrap"], function ($, template) {
  
  var tc_list = $("#tc_list");
  var teacherModal = $("#teacherModal");
  
  //发送请求查看所有讲师信息并渲染到页面,设置自定义属性存储tc_id
  $.ajax({
    type: "get",
    url: "/api/teacher",
    success: function (info) {
      if(info.code == 200) {
        var html = template("tpl_teacherlist", info);
        tc_list.html(html);
      }
        
    }
  });
  
  //给讲师列表tbody注册委托事件，点击查看按钮的时候显示模态框
  tc_list.on("click",".btn_view", function () {
    //alert($(this).parent().parent().data("id"));
    var tc_id = $(this).parent().parent().data("id");
    //发送ajax请求渲染讲师信息到模态框
    $.ajax({
      type: "get",
      url:"/api/teacher/view",
      data: {
        tc_id: tc_id
      },
      success:function (info) {
        var html = template("tpl_teacherinfo", info.result);
        teacherModal.html(html);
      }
    });
    //显示模态框
    teacherModal.modal("show");
  });
  
  
  //启用和注销讲师功能
  tc_list.on("click",".btn_handle", function () {
    var btn_handle = $(this);
    var tr = btn_handle.parent().parent();
    var tc_id = tr.data("id");
    var tc_status = tr.data("status");
    
    $.ajax({
      type: "post",
      url: "/api/teacher/handle",
      data: {
        tc_id: tc_id,
        tc_status: tc_status
      },
      success: function (info) {
        if(info.code == 200) {
          if(info.result.tc_status == 0) {
            btn_handle.text("注 销").addClass("btn-warning").removeClass("btn-success");
          }else {
            btn_handle.text("启 用").addClass("btn-success").removeClass("btn-warning");
          }
          tr.data("status",info.result.tc_status);
        }
        
      }
    });
    
  });
  
  
  
});