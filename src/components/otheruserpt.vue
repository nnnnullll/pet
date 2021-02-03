<template>
  <div class="otheruserbox">
    <!-- 首栏 -->
    <v-top></v-top>
    <div class="othseruserheader">
      <header class="header_userinfobox">
        <img class="header_change" :src="user_change">
        <div class="header_userinfobox_bottom">
          <img class="header_userurl" :src="userurl">
          <div class="header_textinfobox">
            <div class="header_nameguanzhu">
              <div class="header_textinfo_name">{{username}}</div>
              <div class="header_guanzhu">{{guanzhu}}</div>
            </div>
            <div class="header_textinfo_qianmin">{{qianmin}}</div>
          </div>
        </div>
      </header>
    </div>
    <div class="othserusermedium">
      <div class="medium_txt1">他的主页</div>
      <div @click="otherhomegotopt()" class="medium_txt2">他的相册</div>
    </div>
    <div class="otheruserbottom">
      <div class="bottom_leftbox">
        <div class="bottom_leftbox1">
          <div class="bottom_leftbox1_inner">
            <div>{{guanzhunum}}</div>
            <div>关注</div>
          </div>
          <div class="bottom_leftbox1_line"></div>
          <div class="bottom_leftbox1_inner">
            <div>{{fensinum}}</div>
            <div>粉丝</div>
          </div>
          <div class="bottom_leftbox1_line"></div>
          <div class="bottom_leftbox1_inner">
            <div>{{fenxiangnum}}</div>
            <div>分享</div>
          </div>
        </div>
        <div class="bottom_leftbox2" >
          <div class="petcard" v-for="pet in pets" :key="pet.index">
            <div class="bottom_leftbox2_info">
              <img v-image-preview class="bottom_leftbox2_peturl" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" >
              <div class="bottom_leftbox2_info_right">
                <div class="bottom_leftbox2_info_hang">
                  <div class="bottom_leftbox2_info_hang_item">{{pet.petname}}</div>
                  <div class="bottom_leftbox2_info_hang_item">{{pet.petsex}}</div>
                  <div class="bottom_leftbox2_info_hang_item">{{pet.petage}}岁</div>
                </div>
                <div class="bottom_leftbox2_info_hang">
                  <div class="bottom_leftbox2_info_hang_item">{{pet.petclass1}}</div>
                  <div class="bottom_leftbox2_info_hang_item">{{pet.petclass2}}</div>
                </div>
              </div>
            </div>
            <div class="petsimags">
              <img v-image-preview class="petsimag" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" >
              <img v-image-preview class="petsimag" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" >
              <img v-image-preview class="petsimag" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" >
            </div>
          </div>
        </div>
      </div>
      <div class="bottom_rigthbox">
        <!-- //////////////////////////////和另一个页面不同的地方//////除了这部分复制就可以///////////////// -->
        <div class="bottom_rigthbox_head">
          <div>照片</div>
          <div>视频</div>
        </div>
        <div v-for="photoinform in photoinforms" :key="photoinform.index" class="photocard">
          <div class="bottom_rightbox_line"></div>
          <div class="photodate">{{photoinform.photodate}}</div>
          <div class="photosbox">
            <img v-image-preview class="photo" v-for="photo in photoinform.photo" :key="photo.index" :src="photo" >
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import vTop from '../components/topselect'
import pethomeVue from './pethome.vue';
const axios = require('axios');
export default {
  name: "otheruser",
  components:{
    vTop,
  },
  data(){
    return{
      user_change:require("@/assets/img/user_change.png"),
      userurl:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      username:"用户名",
      guanzhu:"已关注",
      guanzhunum:22,
      fensinum:23,
      fenxiangnum:222,
      qianmin:"个性签名~个性签名~个性签名~最多20个字",
      pets:[
        {
          petname:"啾啾",
          petage:"9",
          petsex:"男",
          petclass1:"鸟",
          petclass2:"鹦鹉"
        },
        {
          petname:"啾啾",
          petage:"9",
          petsex:"男",
          petclass1:"鸟",
          petclass2:"鹦鹉"
        }
      ],
      photoinforms:[
        {
          photodate:"2020-12-01",
          photo:[
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",

          ]
        },
        {
          photodate:"2020-12-01",
          photo:[
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",

          ]
        },
      ]
    }
  },
  methods:{
    otherhomegotopt(){
      const _this=this
        this.$router.push({
          name: 'otheruserpt',
          params: {
            yhid: _this.messageinform[0].userid,
          }
        })
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
.medium_txt1{
  font-size: 24px;
  margin-top: 3px;
  color: #FBA259;
}
.medium_txt2{
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
  min-height: 206px;
}
.petcard{
  width: 379px;
  height: 206px;
  background: #FDF0E3;
  margin-bottom: 5px;
}
.bottom_leftbox2_info{
  display: flex;
  flex-direction: row;
}
.bottom_leftbox2_peturl{
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-left: 14px;
  margin-top: 13px;
}
.bottom_leftbox2_info_right{
  width: 300px;
  margin-left: 20px;
  margin-top: 22px;
  display: flex;
  flex-direction: column;
}
.bottom_leftbox2_info_hang{
  display: flex;
  flex-direction: row;
}
.bottom_leftbox2_info_hang_item{
  margin-left: 20px;
}
.petsimags{
  margin-left:14px ;
  height: 93px;
  width: 348px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
}
.petsimag{
  width: 114px;
  height: 93px;
}
/* <!-- //////////////////////////////和另一个页面不同的地方//////除了这部分复制就可以///////////////// --> */
.bottom_rigthbox{
  margin-left: 22px;
  width: 792px;
  min-height: 400px;
  background: #FDF0E3;
}
.bottom_rigthbox_head{
  width: 225px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 13px;
  margin-left: 27px;
}
.photocard{
  margin-left: 27px;
  min-height: 236px;
  width: 738px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}
.bottom_rightbox_line{
  width: 738px;
  height: 1px;
  background: #BDB6B1;
}
.photodate{
  margin-top: 20px;
}
.photobox{
  width: 738px;
  min-height: 180px;
  display: flex;
  flex-direction: row;
}
.photo{
  width: 245px;
  height: 162px;
  padding: 2px;
  object-fit: cover;
}
</style>