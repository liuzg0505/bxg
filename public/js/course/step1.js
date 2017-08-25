/**
 * Created by Administrator on 2017/8/25 0025.
 */

define(["jquery", "template", "tool", "ckeditor"], function ($, template, tool, CKEDITOR) {
  
  $(function () {
    //获取传过来的cs_id
    var cs_id = tool.getParam("cs_id");
    
    $.ajax({
      type: "get",
      url: "/api/course/basic",
      data: {
        cs_id: cs_id
      },
      success: function (info) {
        if (info.code == 200) {
          //console.log(info.result);
          //渲染数据
          var html = template("tpl_step1", info.result);
          $(".course-add").html(html);
          
          //富文本编辑器
          CKEDITOR.replace("cs_brief", {
            toolbarGroups: [
              {name: 'clipboard', groups: ['clipboard', 'undo']},
              
              {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
              '/',
              {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi']},
              {name: 'styles'},
              {name: 'colors'},
            ]
          });
          
          
        }
      }
    });
    
    //选一级分类的时候，发ajax获取二级分类列表
    $("body").on("change", "#cs_cg_pid", function () {
      var cs_cg_pid = $("#cs_cg_pid").val();
      $.ajax({
        type: "get",
        url: "/api/category/child",
        data: {
          cg_id: cs_cg_pid
        },
        success: function (info) {
          //console.log(info);
          if (info.code == 200) {
            var html = template("tpl_step1_cgid", info);
            $("#cs_cg_id").html(html);
          }else {
            //前面select改成'一级分类'的时候，第二个select框只能是'二级分类'
            $("#cs_cg_id").html('<option value="">二级分类</option>');
          }
        }
      });
    });
    
    //给保存按钮注册点击事件
    $("body").on("click", ".btn_save", function () {
      //手动同步富文本编辑器的value
      for ( instance in CKEDITOR.instances )
      {
        CKEDITOR.instances[instance].updateElement();
      }
      //发ajax保存信息
      $.ajax({
        type: "post",
        url: "/api/course/update/basic",
        data: $("form").serialize(),
        success: function (info) {
          if (info.code == 200) {
            //console.log(info);
            location.href = "/course/step2?cs_id=" + info.result.cs_id;
          }
        }
      });
      
      return false;
      
    });
    
    
  });
  
});