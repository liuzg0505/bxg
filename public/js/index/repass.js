/**
 * Created by Administrator on 2017/8/23 0023.
 */

define(["jquery"], function ($) {
  $(function () {
    
    
    
    //注册点击事件
    $("form").submit(function () {
      var tc_pass = $("#tc_pass").val();
      var tc_new_pass = $("#tc_new_pass").val();
      var confirm_pass = $("#confirm_pass").val();
      console.log(tc_pass);
      console.log(tc_new_pass);
      console.log(confirm_pass);
      $.ajax({
        type: "post",
        url: "/api/teacher/repass",
        data: $("form").serialize(),
        beforeSend: function () {
          if(tc_new_pass == "" || tc_pass == ""){
            alert("不能为空！");
            return false;
          }
          if(tc_new_pass !== confirm_pass) {
            alert("确认密码和新密码不一致！");
            return false;
          }
          
        },
        success: function (info) {
          if(info.code == 200) {
            alert("修改成功，请重新登录");
            $("#logout").trigger("click");
          }
        },
        error: function () {
          alert("修改失败，原密码错误！")
        }
      });
      
      return false;
      
    });
    
    
      
  });
  
  
  
});