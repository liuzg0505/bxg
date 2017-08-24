/**
 * Created by Administrator on 2017/8/24 0024.
 */

define(["jquery", "template", "js/common/common"], function ($, template) {
  
  $(function () {
    //分类列表渲染
    $.ajax({
      type: "get",
      url: "/api/category",
      success: function (info) {
        if(info.code == 200) {
          var html = template("tpl_listcategory", info);
          $(".course-category").html(html);
          
          
        }
            
        
      }
    });
    
   
  });
  
});