<template>
  <div>
    <h1>联系我们</h1>
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  name: "contactme",
  methods:{
    init(){
      var map = new BMapGL.Map('container');
      var point = new BMapGL.Point(115.351619,34.015187);
      map.centerAndZoom(point, 17);

      var marker = new BMapGL.Marker(point);
      var zoomCtrl = new BMapGL.ZoomControl(); // 添加缩放控件
      map.addControl(zoomCtrl);
      map.addOverlay(marker);
      var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
      map.addControl(scaleCtrl);
// 创建信息窗口
      var opts = {
        width: 200,
        height: 100,
        title: '鹿邑心脑血管医院'
      };
      var infoWindow = new BMapGL.InfoWindow('地址：周口市鹿邑县杨湖口镇田傅元村加油站旁', opts);
// 点标记添加点击事件
      marker.addEventListener('click', function () {
        map.openInfoWindow(infoWindow, point); // 开启信息窗口
      });
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>
#container {
  width: 100%;
  height: 8.133rem;
  margin: 0.4rem 0;
}
h1 {
  text-align: center;
  margin: 0px;
  line-height: 1.333rem;
  border-bottom: 1px solid #78c3ae;
}
</style>
