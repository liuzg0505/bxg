/**
 * Created by Administrator on 2017/8/20 0020.
 */


require.config({
  baseUrl: "/public/",
  paths: {
    "jquery": "assets/jquery/jquery",
    "jquery_form": "assets/jquery-form/jquery.form",
    "jquery_cookie": "assets/jquery-cookie/jquery.cookie",
    "template": "assets/artTemplate/template-web",
    "bootstrap": "assets/bootstrap/js/bootstrap",
    "tool": "js/common/tool",
    "datepicker": "assets/bootstrap-datepicker/js/bootstrap-datepicker",
    "datepicker_cn": "assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min",
    "NProgress": "assets/nprogress/nprogress"
  },
  shim: {
    "bootstrap": {
      deps: ["jquery"]
    },
    "datepicker_cn": {
      deps: ["jquery", "datepicker"]
    }
  }
  
});
//jquery 支持AMD, 有产出，jQuery, 需要用形参来接收
//jquery_form 和 jquery_cookie 支持AMD，只是这两个就是在jquery上添加了方法，没有产出
//新版的 template-web 也支持AMD， 但是是独立的方法 template(), 是有产出的，定义模块有依赖这个的时候，需要设置形参接收产出，

//bootstrap插件不支持AMD，需要加“垫子”, 需要依赖 jquery, 没有产出