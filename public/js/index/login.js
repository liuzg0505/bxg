/**
 * Created by Administrator on 2017/8/20 0020.
 */

//定义login模块，设置3个依赖关系，其中，jquery有产出jQuery，用形参接收

define(["jquery","jquery_cookie","jquery_form"], function ($) {
  //代码写到入口函数里面，文档加载完成再执行
  $(function () {
    //给form注册onsubmit事件，表单提交时就会生效
    $("form").submit(function () {
      //jquery.form.js插件的使用，可以不用做表单序列化，即不需要传data，这个插件的方法会自己获取表单中设置了name属性的标签的value拼成串当成参数传递过去
      $(this).ajaxSubmit({
        type:"post",
        url:"/api/login",
        success: function (info) {
          if(info.code == 200) {
            //登录成功后，将登录信息转成json字符串存到cookie中，跳转到首页
            var userinfo = JSON.stringify(info.result);
            $.cookie("userinfo",userinfo, {path: "/", expires: 1});
            location.href = "/";
          }
        }
      });
      
      //阻止表单的默认提交行为
      return false;
      
    });
  });
});