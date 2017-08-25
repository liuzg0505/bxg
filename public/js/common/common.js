/**
 * Created by Administrator on 2017/8/20 0020.
 */

//定义common模块，设置3个依赖关系，其中，jquery有产出jQuery，用形参接收;
// template 也有产出template方法，用形参接收

define(["jquery", "template", "NProgress" ,"jquery_cookie"], function ($, template, NProgress) {
  //所有页面公共部分的功能都写到common里面
  $(function () {
  
    //进度条插件
    NProgress.start();
    setTimeout(function () {
      NProgress.done();
    },500);
  
  
    //jquery中ajax的全局事件
    //遮罩层
    $(document).ajaxStart(function () {
      $(".mask").show();
    });
    $(document).ajaxStop(function () {
      setTimeout(function () {
        $(".mask").hide();
      },500);
    });
    
    //判断cookie中是否存在session ID， 存在就渲染这个页面侧边栏头像和用户名，否则就跳转到login页面
    var PHPSESSID = $.cookie("PHPSESSID");
    if(PHPSESSID) {
      //将cookie中的userinfo字符串转成对象
      var userinfo = JSON.parse($.cookie("userinfo"));
      //使用模板引擎
      var html = template("userinfo-tpl", userinfo);
      //渲染侧边栏头像和用户名
      $("#userinfo").html(html);
    }else {
      //除了登录页面，其他页面都需要跳回login
      if(location.pathname != "/login") {
        location.href = "/login";
      }
    }
    
    
    //退出功能
    $("#logout").click(function () {
      //发送ajax请求
      $.ajax({
        type: "post",
        url: "/api/logout",
        success: function (info) {
          if(info.code == 200) {
            //响应成功，要清除userinfo这个cookie，并跳回login页面
            $.removeCookie("userinfo",{path: "/"});
            location.href = "/login";
          }
        }
      });
      
    });
    
    
    //左侧导航栏高亮功能  排他
    var navs = $("#aside_nav a");
    var pathname = location.pathname;
    var pathObj = {
      "/teacher/add": "/teacher/list",
      "/settings": "/",
      "/repass" : "/",
      "/category/add": "/category/list",
      "/course/step1": "/course/add",
      "/course/step2": "/course/add",
      "/course/step3": "/course/add",
    };
    pathname = pathObj[pathname] || pathname;
    
    navs.each(function (i, e) {
      //排他
      $(e).removeClass("active");
      //高亮当前
      if($(this).attr("href") == pathname) {
        $(this).addClass("active");
      }
    });
    //点击 课程管理 slide展开或收起子菜单
    var subMenu = $(".sub_menu");
    var subMenuUl = subMenu.children("ul");
    subMenu.on("click",function () {
      subMenuUl.slideToggle();
    });
    
    //如果当前页面属于子菜单的菜单项，直接让子菜单成展开状态，否则是收起状态
    //console.log(subMenuUl.find("a.active")); //就算没有a.active，这个对象也不是空的
    //console.log(subMenuUl.find("a.active").length);
    if(subMenuUl.find("a.active").length != 0) {
      subMenuUl.show();
    }else {
      subMenuUl.hide();
    }
    
  });
  
  
});