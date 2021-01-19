// 头部选择栏组件
<template xmlns:overflow="http://www.w3.org/1999/xhtml">
    <div class="tab">
      <img :src="topUrl" class="toplogo">
      <p @click="gotomain" class="webitem1">首页</p>
      <p @click="gotosection" class="webitem15">流浪之家🏡</p>
      <p @click="gotosection" class="webitem15">宠物识别🔍</p>
      <p @click="gotosection" class="webitem15">医疗资源💊</p>
      <img :src="imgUrl" class="img">
      <p class="webitem3">扫码小程序</p>
      <input type="text" class="webitem4"></input>
      <div class="webitem5" @click="search">
        <p class="text1">搜索</p>
      </div>
      <img :src="userimg"  class="userimg" >
      <p class="webitem6" @click="gotologin">登陆</p>
      <p class="webitem7" @click="gotoregister">注册</p>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
const axios=require('axios');
export default {
  name:'v-top',
  data() {
    return {
      topUrl:require("@/assets/img/toplogo.png"),
      imgUrl:require("@/assets/img/img1.png"),
      userimg:require("@/assets/img/userimg.png"),
    }
  },
  methods: {
    search(){
      this.$router.push('/search');
    },
    gotoregister(){
      this.$router.push('/register');
    },
    gotologin(){
      this.$router.push('/content');
    },
    gotosection(){
      this.$router.push('/section');
    },
    gotomain(){
      this.$router.push('/main');
    }
  }
}
</script>

<style scope>
.tab{
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 0.7%;
}
.toplogo{
  margin-right: 1%;
  margin-left: 27px;
  margin-top: 15px;
  width: 167px;
  height: 40px;
}

.webitem1{
  flex: 0 0 46px;
  flex-shrink: 0;
  width: 46px;
  height: 23px;
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #030303;
  margin-right: 1%;
  margin-top: 2%;

}
.webitem15{
  flex: 0 0 180px;
  flex-shrink: 0;
  margin-right: 1%;
  margin-top:2%;
  width: 180px;
  height: 22px;
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;

}
.webitem2{
  flex: 0 0 46px;
  flex-shrink: 0;
  margin-right: 1%;
  margin-top:2%;
  width: 43px;
  height: 22px;
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;

}

.img{
  margin-top: 19px;
  margin-right: 12px;
  margin-bottom: 13px;
  flex: 0 0 35px;
  width: 35px;
  height: 45px;
}
.webitem3{
  flex: 0 0 116px;
  flex-shrink: 0;
  margin-top: 2%;
  margin-right: 1%;
  width: 116px;
  height: 23px;
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;

}
.text1{
  flex: 0 0 45px;
  width: 45px;
  height: 23px;
  font-size: 22px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #2E3232;
  flex-shrink: 0;
  margin-top: 15%;
  margin-left: 10%;
}
.webitem4{
  flex: 0 0 373px;
  flex-shrink: 0;
  margin-top: 1.5%;
  width: 373px;
  height: 41px;
  background: #B6B6B6;
  opacity: 0.3;
  box-sizing: border-box;

}
.webitem5{
  width: 61px;
  height: 41px;
  background: #F5EEEE;
  margin-top: 1.5%;

}
.userimg{
  width:75px;
  height: 75px;
}
.webitem6{
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #030303;
  margin-left: 1%;
  margin-top: 2%;
}
.webitem7{
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #030303;
  margin-top: 2%;
  margin-left: 1%;
}

</style>

