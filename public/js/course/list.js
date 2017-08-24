/**
 * Created by Administrator on 2017/8/24 0024.
 */
define(["jquery", "template", "js/common/common"], function ($, template) {
  $(function () {
    
    $.ajax({
      type: "get",
      url: "/api/course",
      success: function (info) {
        console.log(info);
        var html = template("tpl_courselist", info);
        $(".course-list").html(html);
      }
    });
    
  })
});