/**
 * Created by Administrator on 2017/8/25 0025.
 */

define(["jquery"], function ($) {
  
  $(function () {
    
    $(".btn_create").on("click", function () {
  
      $.ajax({
        type: "post",
        url: "/api/course/create",
        data: $("form").serialize(),
        success: function (info) {
          console.log(info);
          if(info.code == 200) {
            location.href = "/course/step1?cs_id=" + info.result.cs_id;
          }
        }
      });
      
      return false;//阻止a标签跳转
    });
    $("form").submit(function () {
      $(".btn_create").click();
      return false;//阻止表单提交
    });
    
    
  });
  
  
  
});