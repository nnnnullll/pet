<template>
  <div class="building">
    <div class="tab">
      <p class="webtitle">宠物的一生</p>
      <p @click="gotomain" class="webitem1">首页</p>
      <p @click="gotosection" class="webitem2">栏目</p>
      <img :src="imgUrl" class="img">
      <p class="webitem3">扫码小程序</p>
      <input type="text" class="webitem4"></input>
      <div class="webitem5" @click="search">
        <p class="text1">搜索</p>
      </div>
      <div class="circle2img" >
        <img :src="userimg"  class="userimg" >
      </div>
      <p class="webitem6" @click="gotologin">登陆</p>
      <p class="webitem7" @click="gotoregister">注册</p>
    </div>
    <div class="bottom">
      <div style="display: flex;flex-direction: column">
        <img :src="flags" class="flags">
        <img :src="pet" class="pet">
        <img :src="border" class="border">
      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: "knowledgecard",
  data() {
    return {
      user: {
        input: '',
        password: '',
      },
      imgUrl:require("@/assets/img/img1.png"),
      userimg:require("@/assets/img/userimg.png"),
      flags:require("@/assets/img/flags.png"),
      border:require("@/assets/img/border.png"),
      pet:require('@/assets/img/userimg.png')
    }
  },
  methods:{
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

<style >
body {
  margin: 0;
  padding: 0;
}
.building{
  width: 1440px;
  height: 1072px;
  background: #f8e5d3;
}
.tab{
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 1%;
}
.webtitle{
  flex: 0 0 196px;
  flex-shrink: 0;
  margin-right: 35px;
  margin-left: 27px;
  margin-top: 15px;
  width: 196px;
  height: 20px;
  font-size: 36px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #4FA1F4;
  opacity: 0.91;
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
  margin-right: 2%;
  margin-top: 2%;

}
.webitem2{
  flex: 0 0 46px;
  flex-shrink: 0;
  margin-right: 0.7%;
  margin-top:2%;
  width: 43px;
  height: 22px;
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;

}
.img{
  margin-left: 42px;
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
  margin-right: 4%;
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
.bottom{
  width: 1440px;
  height: 995px;
  top: 1%;
}
.circle2img{
  margin-left: 5%;
  background: #f6deca;
  border-radius: 50%;
  width:4.8%;
  height: 4.8%;
}
.webitem6{
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #030303;
  margin-right: 1%;
  margin-left: 0.5%;
  margin-top: 2%;
}
.webitem7{
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #030303;
  margin-top: 2%;
}

.flags{
  width: 1248px;
  height: 615px;
  margin-left: 17px;
}
.border{
  width: 937px;
  height: 739px;
  position: absolute;
  margin-top: 14%;
  margin-left: 30%;
}
.pet{
  width: 259px;
  height: 348px;
  position: absolute;
  margin-top: 25%;
  margin-left: 10%;
}
</style>
