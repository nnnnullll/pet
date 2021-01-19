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
      <div style="display: flex;flex-direction: row;justify-content: center">
        <p class="text3">以领养代替购买</p>
        <img :src="imgwall">
      </div>
      <div class="part1" style="display:flex;flex-direction: row;justify-content: center">
        <div class="line1-left"></div>
        <p class="text4">关于我们</p>
        <div class="line1-right"></div>
      </div>
      <div class="aboutus" style="display:flex;justify-content: center">
        上海大学迷途之家流浪动物保护组织，成立于2017年，是上海大学内致力于救助校内流浪猫狗，进行TNR以及领养的非盈利社团。进行的TNR活动有效控制了学校的流浪猫数量，并对部分猫咪打了疫苗，希望未来能够创建更好的人与流浪动物和谐环境。
      </div>
      <div class="part2" style="display:flex;flex-direction: row;justify-content: center">
        <div class="line2-left"></div>
        <p class="text5">领养流程</p>
        <div class="line2-right"></div>
      </div>
      <div class="process" style="display:flex;flex-direction:row;justify-content: space-around">
        <img :src="house" class="house">
        <img :src="lan" class="lan">
        <img :src="nurse" class="nurse">
        <img :src="bag" class="bag">
      </div>
      <div class="description" style="display:flex;flex-direction:row;">
        <p class="describe1">
          领养人必须年满十八周岁，有正当职业或经济能力者（需带身份证件），并取得家庭其他成员同意。
        </p>
        <p class="describe2">
          在接收领养动物后的一段时间内，协助甲方对喂养情况进行了解及回访。
        </p>
        <p class="describe3">
          如果领养时动物尚未成年，领养人应当在动物适龄时带其去正规放心的宠物医院完成绝育手术。
        </p>
        <p class="describe4">
          在无法继续喂养领养动物的情况下，必须将动物交回甲方，未经甲方事先同意不得将领养动物自行转交他人或将其出售甚至抛弃。
        </p>
      </div>

      <div class="part3" style="display:flex;flex-direction: row;justify-content: center">
        <div class="line3-left"></div>
        <p class="text6">联系我们</p>
        <div class="line3-right"></div>
      </div>
      <div class="contact" style="display:flex;flex-direction: column;justify-content: center">
        <p class="addr">
          地址：上海大学宝山校区
        </p>
        <p class="tel">
          QQ：230897124
        </p>
        <p class="mail">
          QQ群：迷途之家SHU HAPA
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
const axios=require('axios');
export default {
  name: "pethome",
  data() {
    return {
      user: {
        input: '',
        password: '',
      },
      rules: {
        input: [{required: true, message: '账号不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
      },
      imgUrl:require("@/assets/img/img1.png"),
      userimg:require("@/assets/img/userimg.png"),
      gifUrl:require("@/assets/img/welcome.gif"),
      imgwall:require("@/assets/img/imgwall.png"),
      house:require("@/assets/img/house.png"),
      lan:require("@/assets/img/lan.png"),
      nurse:require("@/assets/img/nurse.png"),
      bag:require("@/assets/img/bag.png"),
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

<style scoped>
body {
  margin: 0;
}
.building{
  width: 1400px;
  height: 1100px;
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
.circle2img{
  margin-left: 5%;
  background: #f6deca;
  border-radius: 50%;
  width:4.8%;
  height: 4.8%;
}

.text3{
  width: 34px;
  height: 249px;
  font-size: 30px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #0B1335;
  margin-right: 3.5%;
}
.line1-left{
  width: 110px;
  height: 1px;
  background: #000000;
  margin-top: 2.5%;
}
.line1-right{
  width: 110px;
  height: 1px;
  background: #000000;
  margin-top: 2.5%;
}
.line2-left{
  width: 110px;
  height: 1px;
  background: #000000;
  margin-top: 2.5%;
}
.line2-right{
  width: 110px;
  height: 1px;
  background: #000000;
  margin-top: 2.5%;
}
.line3-left{
  width: 110px;
  height: 1px;
  background: #000000;
  margin-top: 2.5%;
}
.line3-right{
  width: 110px;
  height: 1px;
  background: #000000;
  margin-top: 2.5%;
}
.text4{
  width: 102px;
  height: 24px;
  font-size: 25px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;
}
.text5{
  width: 102px;
  height: 24px;
  font-size: 25px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;
}
.text6{
  width: 102px;
  height: 24px;
  font-size: 25px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;
}
.aboutus{
  margin-right: 8%;
  margin-left: 8%;
  font-size: 18px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #959595;
}
.process{

}
.house{
  margin-left: 23%;
  margin-right: 5%;
}
.lan{
  margin-right: 5%;
}
.bag{
  margin-right: 20%;
}
.nurse{
  margin-right: 5%;
}
.describe1 {
  width: 175px;
  height: 72px;
  font-size: 16px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #737373;
  margin-left: 21%;
  margin-right: 3%;
}
.describe2{
  width: 175px;
  height: 72px;
  font-size: 16px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #737373;
  margin-right: 3%;
}
.describe3 {
  width: 175px;
  height: 72px;
  font-size: 16px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #737373;
  margin-right: 3%;
}
.describe4 {
  width: 175px;
  height: 72px;
  font-size: 16px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #737373;
}
.tel{

  font-size: 18px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #959595;
}
.addr{

  font-size: 18px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #959595;
}
.mail{

  font-size: 18px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #959595;
}
</style>
