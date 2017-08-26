/**
 * Created by Administrator on 2017/8/26 0026.
 */

define(['jquery', 'echarts'], function ($, echarts) {
  
  $(function () {
    $.ajax({
      type: "get",
      url: "/api/dashboard",
      success: function (info) {
        //console.log(info);
        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption(info);
        
      }
    });
  });
  
  
});