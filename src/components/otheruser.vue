<template>
  <div class="otheruserbox">
    <!-- 首栏 -->
    <v-top></v-top>
    <div class="othseruserheader">
      <header class="header_userinfobox">
        <img class="header_change" :src="user_change">
        <div class="header_userinfobox_bottom">
          <img class="header_userurl" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
          <div class="header_textinfobox">
            <div class="header_nameguanzhu">
              <div class="header_textinfo_name">用户名</div>
              <div class="header_guanzhu">已关注</div>
            </div>
            <div class="header_textinfo_qianmin">个性签名~个性签名~个性签名~最多20个字</div>
          </div>
        </div>
      </header>
    </div>
    <div class="othserusermedium">
      <div class="medium_txt">他的主页</div>
      <div class="medium_txt">他的相册</div>
    </div>
    <div class="otheruserbottom">
      <div class="bottom_leftbox">
        <div class="bottom_leftbox1">
          <div class="bottom_leftbox1_inner">
            <div>229</div>
            <div>关注</div>
          </div>
          <div class="bottom_leftbox1_line"></div>
          <div class="bottom_leftbox1_inner">
            <div>12</div>
            <div>粉丝</div>
          </div>
          <div class="bottom_leftbox1_line"></div>
          <div class="bottom_leftbox1_inner">
            <div>13</div>
            <div>分享</div>
          </div>
        </div>
        <div class="bottom_leftbox2">
          <img class="bottom_leftbox2_peturl" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" >
        </div>
      </div>
      <div class="bottom_rigthbox"></div>
    </div>


  </div>
</template>

<script>
import vTop from '../components/topselect'
const axios = require('axios');
export default {
  name: "otheruser",
  components:{
    vTop,
  },
  data(){
    return{
      user_change:require("@/assets/img/user_change.png"),
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
}
.otheruserbox{
  width: 1440px;
  height: 1360px;
  font-size: 21px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;
}
.othseruserheader{
  width: 1193px;
  height: 357px;
  background-image:url("../assets/img/userhome.png");
  margin-left: 124px;
  margin-top: 5px;
}
.header_userinfobox{
  height: 200px;
  width: 400px;
  margin-left: 29px;
  display: flex;
  flex-direction: column;
 
}
.header_change{
  height: 47px;
  width: 165px;
  margin-top: 30px;
}
.header_userinfobox_bottom{
  display: flex;
  flex-direction: row;
  margin-top: 25px;
}
.header_userurl{
  width: 110px;
  height: 110px;
  border-radius: 50%;
}
.header_textinfobox{
  display: flex;
  flex-direction: column;
  margin-left: 25px;
  margin-top: 15px;
}
.header_textinfo_name{
  font-size: 26px;
}
.header_nameguanzhu{
  display: flex;
  flex-direction: row;
}
.header_guanzhu{
  width: 68px;
  height: 23px;
  background: #308DC2;
  border-radius: 10px;
  text-align: center;
  margin-top: 6px;
  margin-left: 20px;
  font-size: 18px;
  color: aliceblue;
}
.header_textinfo_qianmin{
  width: 300px;
  word-wrap:break-word;
  word-break:break-all; 
}
.othserusermedium{
  width: 1193px;
  height: 40px;
  background: #FDF0E3;
  margin-left: 124px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.medium_txt{
  font-size: 24px;
  margin-top: 3px;
}
.otheruserbottom{
  display: flex;
  flex-direction: row;
  width: 1193px;
  margin-left: 124px;
  margin-top: 21px;
}
.bottom_leftbox{
  display: flex;
  flex-direction: column;
  width: 380px;
}
.bottom_leftbox1{
  width: 380px;
  height: 110px;
  background: #FDF0E3;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.bottom_leftbox1_inner{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 23px;
  height: 60px;
  padding-left: 30px;
  padding-right: 30px;
}
.bottom_leftbox1_line{
  margin-top: 14px;
  width: 1px;
  height: 81px;
  background: #BDB6B1;
}
.bottom_leftbox2{
  margin-top: 22px;
  width: 379px;
  height: 206px;
  background: #FDF0E3;
}
.bottom_rigthbox{
  margin-left: 22px;
  width: 792px;
  height: 400px;
  background: #FDF0E3;
}
.bottom_leftbox2_peturl{
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
</style>
