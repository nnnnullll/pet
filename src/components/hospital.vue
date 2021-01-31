// 医疗资源
<template>
    <div class="hospitalbox">
      <!-- 首栏 -->
      <v-top></v-top>
      <div class="hospitalmainbox" :style ="backgroundpic">
        <div class="mapmainbox">
          <div class="mapbox">
            <div class="maptitle1">附近的宠物医院</div>
            <div class="mapline1"></div>
            <div class="mapbottom">
              <div class="outshow"></div>
              <div class="mapline2"></div>
              <div class="mapshow"></div>
            </div>
          </div>
          <div class="mapsearchbox">
            <div class="mapinputbox"></div>
            <div class="mapensurebox">
              <div class="sousuo">搜索</div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      backgroundpic: {
        backgroundImage: "url(" + require('../assets/img/hospital.png') + ")",
        width: '1440px',
        height: '687px',
      }

    }
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
}
.mapline2{
  width: 1px;
  height: 344px;
  background: #F7D271;
}
.mapshow{
  width: 502px;
  height: 344px;
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