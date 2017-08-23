/**
 * Created by Administrator on 2017/8/22 0022.
 */
define(["jquery", "datepicker", "datepicker_cn"], function ($) {
  //获取地址栏传过来的数据
  function getParamStr() {
    var paramStr = location.search.slice(1);
    var paramArr = paramStr.split("&");
    var paramObj = {};
    for (var i = 0; i < paramArr.length; i++) {
      var key = paramArr[i].split("=")[0];
      var value = paramArr[i].split("=")[1];
      paramObj[key] = value;
    }
    return paramObj;
  }
  
  function getParam(key) {
    var paramObj = getParamStr();
    return paramObj[key];
  }
  
  
  //日期插件
  function setDate(selector) {
    $(selector).datepicker({
      language: "zh-CN", //语言：中文包
      autoclose: true,  //自动关闭
      todayBtn: "linked", //“今日”按钮
      todayHighlight: true, //今日日期高亮
      endDate: "+0d",       //结束日期：默认今天
      format: "yyyy-mm-dd"  //日期格式
    });
  }
  
  return {
    getParamStr: getParamStr,
    getParam: getParam,
    setDate: setDate
  }
  
  
});
