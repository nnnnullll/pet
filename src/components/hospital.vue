// 医疗资源
<template>
    <div class="hospitalbox">
      <iframe id="geoPage" width=0 height=0 frameborder=0 style="display:none;" scrolling="no" src="https://apis.map.qq.com/tools/geolocation?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"></iframe>
      <!-- 首栏 -->
      <v-top></v-top>


      <div class="hospitalmainbox" :style ="backgroundpic">
        <div class="mapmainbox">
          <div class="mapbox">
            <div style="display: flex;flex-direction: row">
              <div class="maptitle1">附近的宠物医院</div>
              <div class="maptitle2">地图</div>
            </div>
            <div class="mapline1"></div>
            <div class="mapbottom" >
              <div class="outshow" style="display: flex;flex-direction: column;margin-top: 3%">
                <div class="mapsearchbox" style="display: flex;flex-direction: row;width: 400px;margin-left: 10%">
                  <img style="width:60%" :src="myicon">
                  <el-input style="margin-top: 30px;margin-left: 10px" class="mapinputbox" v-model="addressKeyword" v-on:change="changecontent" placeholder="请输入查询地点"></el-input>
                </div>

                  <div style="display: flex;flex-direction: column;margin-top: 5%" >
                    <div style="margin-bottom: 3%;margin-left: 5%">地址：{{address}}</div>
                    <div style="margin-left: 5%" :distance="distance">距离您所在位置{{distance}}公里</div>
                  </div>



              </div>

<!--              <button @click="getDistance">{{distance}}</button>-->
              <div class="mapline2"></div>
              <div class="mapshow" @click="getDistance">
                <!--放地图的-->
<!--                  <el-input v-model="addressKeyword" placeholder="请输入地址来直接查找相关位置"></el-input>-->
                  <!-- 给地图加点击事件getLocationPoint，点击地图获取位置相关的信息，经纬度啥的 -->
                  <!-- scroll-wheel-zoom：是否可以用鼠标滚轮控制地图缩放，zoom是视图比例 -->
                  <baidu-map
                      class="bmView"
                      :scroll-wheel-zoom="true"
                      :center="location"
                      :zoom="zoom"
                      @ready="handler"
                      @searchcomplete="searchcomplete"
                      @locationSuccess="getLocationSuccess"
                      @click="getLocationPoint"
                  >
                    <bm-view style="width: 467px; height:314px;"></bm-view>
                    <bm-geolocation
                        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                        :showAddressBar="true"
                        :auto-location="true"
                    ></bm-geolocation>
                    <bm-local-search :keyword="searchcontent" :auto-viewport="true" style="display: none"></bm-local-search>
                  </baidu-map>
              </div>
            </div>
          </div>

<!--          <div class="mapsearchbox">-->
<!--              <el-input class="mapinputbox" v-model="addressKeyword" v-on:change="changecontent" placeholder="请输入查询地点"></el-input>-->
<!--            <div class="mapensurebox">-->
<!--              <div class="sousuo">搜索</div>-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </div>
    </div>
<!--  <div id="map-container" ></div>-->
</template>

<script>
import vTop from '../components/topselect'
export default {
  name: "hospital",
  components:{
        vTop
  },
  data(){
    return{
      distance:0,
      address:"",
      mylng:'',
      mylat:'',
      location: {
        lng:'',
        lat:''
      },
      myicon:require("@/assets/img/nurse.png"),
      zoom: 12.8,
      addressKeyword: "",
      searchcontent:"",
      backgroundpic: {
        backgroundImage: "url(" + require('../assets/img/hospital.png') + ")",
        width: '1440px',
        height: '687px',
      },
      tmp:''
    }
  },
  methods: {
    rad(d){
      return d * Math.PI / 180.0;
    },
    // 测量百度地图两个点间的距离
    getDistance () {
      var _this=this;
      console.log("mylat:"+_this.mylat+",mylng:"+_this.mylng)
      console.log("lat2:"+this.location.lat+",lng2:"+this.location.lng)
      let EARTH_RADIUS = 6378.137;
      let radLat1 = this.rad(this.mylat);
      let radLat2 = this.rad(this.location.lat);
      let a = radLat1-radLat2;
      let b = this.rad(this.mylng) - this.rad(this.location.lng);
      let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
          + Math.cos(radLat1) * Math.cos(radLat2)
          * Math.pow(Math.sin(b / 2), 2)));
      s = s * EARTH_RADIUS;
      s = Math.round(s * 10000) / 10000;
      s= parseFloat(s).toFixed(2)
      //s = parseInt(s*1000);    //乘以1000是换算成米
      this.distance=s;
      console.log("distance:"+this.distance)
    },
    Tmap() {},
    changecontent(){
      this.searchcontent=this.addressKeyword+"宠物医院"
    },
    searchcomplete(e) {},
    handler ({BMap, map}){
      let _this=this;
  var geolocation = new BMap.Geolocation();
  geolocation.getCurrentPosition(function(r){
  	if(this.getStatus() == BMAP_STATUS_SUCCESS){
  		var mk = new BMap.Marker(r.point);
  		map.addOverlay(mk);
  		map.panTo(r.point);
      var geoCoder = new BMap.Geocoder();
      //let addComp=r.address;
      //this.tmp=(addComp.province + addComp.city + addComp.district + addComp.street + addComp.street_number)+"宠物医院";
      _this.mylng=r.point.lng;
      _this.mylat=r.point.lat;
      console.log("mylat:"+_this.mylat+",mylng:"+_this.mylng)
  	}
  	else {
  		console.log('failed'+this.getStatus());
  	}
  },{enableHighAccuracy: true})
},
    getLocationSuccess(e){
    },
    getLocationPoint(e) {
      var _this=this;
      _this.location.lng = e.point.lng;
      _this.location.lat = e.point.lat;
      /* 创建地址解析器的实例 */
      var geoCoder = new BMap.Geocoder();
      /* 获取位置对应的坐标 */
      geoCoder.getPoint(this.addressKeyword, point => {
        this.selectedLng = point.lng;
        this.selectedLat = point.lat;
      });
      /* 利用坐标获取地址的详细信息 */
      geoCoder.getLocation(e.point, res=>{
        console.log("res")
        console.log(res);
        this.address=res.address
      })
    }
  },
  mounted() {

    }

}
</script>

<style scoped>
body {
  margin: 0;
}
.hospitalbox{
  width: 1440px;
  height: 768px;
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;
}
.hospitalmainbox{
  margin-top: 2px;
  width: 1440px;
  height: 687px
}
.mapmainbox{
  display: flex;
  flex-direction: column;
  width: 1022px;
  height: 479px;
  margin-left: 172px;
}
.mapbox{
  width: 1022px;
  height: 390px;
  background: #F5E1AC;
  margin-top: 23px;
}
.maptitle1{
  margin-top: 10px;
  margin-left: 28px;
  width: 519px
}
.maptitle2{
  margin-top: 10px;
}
.mapline1{
  width: 1018px;
  height: 1px;
  margin-top: 5px;
  background: #F7D271;
}
.mapbottom{
  display: flex;
  flex-direction: row;
}
.outshow{
  width: 519px;
  height: 344px;
  display: flex;
  flex-direction: row;
}
.mapline2{
  width: 1px;
  height: 344px;
  background: #F7D271;
}
.mapshow{
  width: 502px;
  height: 344px;
  margin-right: 1%;
  margin-left: 1%;
  margin-top: 1%;
}
.mapsearchbox{
  display: flex;
  flex-direction: row;
}
.mapinputbox{
  width: 500px;
  height: 50px;
  margin-top: 16px;
  background: #F5E1AC;
}
.mapensurebox{
  width: 80px;
  height: 50px;
  margin-top: 16px;
  margin-left: 15px;
  background: #F7D271;
}
.sousuo{
  margin-top: 13px;
  margin-left: 18px;
}
</style>