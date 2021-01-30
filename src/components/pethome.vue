// 流浪者之家
<template>
  <div class="building">
    <!-- 首栏 -->
    <v-top style="margin-bottom:5px"></v-top>
    <div >
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
      <div class="contact" style="display:flex;flex-direction: column;justify-content: center;text-align:center">
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
import vTop from '../components/topselect'
import { mapMutations } from 'vuex';
const axios=require('axios');
export default {
  name: "pethome",
  components:{
        vTop
    },
  data() {
    return {
      user: {
        input: '',
        password: '',
      },
      gifUrl:require("@/assets/img/welcome.gif"),
      imgwall:require("@/assets/img/imgwall.png"),
      house:require("@/assets/img/house.png"),
      lan:require("@/assets/img/lan.png"),
      nurse:require("@/assets/img/nurse.png"),
      bag:require("@/assets/img/bag.png"),
    }
  },
}
</script>

<style scoped>
body {
  margin: 0;
}
.building{
  width: 1440px;
  height: 1100px;
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
