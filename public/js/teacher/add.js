/**
 * Created by Administrator on 2017/8/22 0022.
 */
define(["jquery", "template", "tool"], function ($, template, tool) {
  
  $(function () {
  
    var tc_id = tool.getParam("tc_id");
  
    //如果tc_id存在，就是编辑，否则就是添加
    if(tc_id) {
      $.ajax({
        type: "get",
        url: "/api/teacher/edit",
        data: {
          tc_id: tc_id
        },
        success: function (info) {
          if(info.code == 200) {
          
            var result = info.result;
            result.title = "讲师编辑";
            result.btnText = "修 改";
          
            var html = template("tpl_addteacher", result);
            $(".teacher").html(html);
          
            //调用设置日期插件工具
            tool.setDate("#tc_join_date");
          }
        }
      });
    
    }else {
      var html = template("tpl_addteacher", {
        title: "讲师添加",
        btnText: "添 加"
      });
      $(".teacher").html(html);
    
      //调用设置日期插件工具
      tool.setDate("#tc_join_date");
    }
  
  
    //给 添加/编辑 按钮注册点击事件（委托事件）, 添加/修改讲师信息
    $("body").on("click", ".btn_add", function () {
      //如果tc_id存在，说明是修改请求，否则是添加请求
      var url = "";
      if(tc_id) {
        url = "/api/teacher/update";
      }else {
        url= "/api/teacher/add";
      }
      //console.log($("form").serialize());
      $.ajax({
        type: "post",
        url: url,
        data: $("form").serialize(),  //序列化表单
        success: function (info) {
          if (info.code == 200) {
            location.href = "/teacher/list";
          }
        }
      });
    
    });
    
  });
  
});