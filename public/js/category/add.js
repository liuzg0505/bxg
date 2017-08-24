/**
 * Created by Administrator on 2017/8/24 0024.
 */

define(["jquery","template", "tool"], function ($, template, tool) {
  
  $(function () {
    
    //如果是编辑，获取地址栏分类的id
    var cg_id = tool.getParam("cg_id");
    
    //判断是添加还是编辑
    if(cg_id) {
      //编辑 渲染要编辑的分类信息
      $.ajax({
        type: "get",
        url: "/api/category/edit",
        data: {
          cg_id: cg_id
        },
        success: function (info) {
          if(info.code == 200) {
            //
            var result = info.result;
            result.title = "编辑分类";
            result.btnText = "修 改";
            result.type = "edit";
            var html = template("tpl_addcategory", result);
            $(".course-category").html(html);
          }
        }
      });
    }else {
      //添加 渲染顶级分类下拉框
      $.ajax({
        type: "get",
        url: "/api/category/top",
        success: function (info) {
          var result = {
            title: "添加分类",
            btnText: "添 加",
            type: "add"
          };
          //
          result.top = info.result;
          var html = template("tpl_addcategory", result);
          $(".course-category").html(html);
        }
      });
      
    }
    
    //注册事件 ->修改或添加分类信息
    $("body").on("click", ".btn_save", function () {
  
      //判断是添加还是编辑
      var url = "";
      if(cg_id) {
        url = "/api/category/modify";
      }else {
        url = "/api/category/add";
      }
      
      $.ajax({
        type: "post",
        url: url,
        data: $("form").serialize(),
        success: function (info) {
          if(info.code==200) {
            location.href = "/category/list";
          }
        }
      });
      
    });
    
  });
  
});

