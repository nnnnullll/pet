<template>
  <div class="otheruserbox">
    <!-- 首栏 -->
    <v-top></v-top>
    <div class="othseruserheader">
      <header class="header_userinfobox">
        <!-- <img class="header_change" :src="user_change"> -->
        <div class="header_change">
          <select class="select1" id="petselect"  @change="selectshijiaoFn($event)">
            <option value =0>请选择视角</option>
            <option value =1>主人视角</option>
            <option value=pet.pet.cwid v-for="(pet,index) in pets" :key="pet.index">{{pet.pet.xm}}视角</option>
          </select>
        </div>
        <div v-if="ispet==1" class="header_userinfobox_bottom">
          <img  v-image-preview   class="header_userurl" :src="user_url">
          <div class="header_textinfobox">
            <div class="header_nameguanzhu">
              <div class="header_textinfo_name">{{user_name}}</div>
            </div>
            <div class="header_textinfo_qianmin">{{user_qianmin}}</div>
          </div>
        </div>
        <div v-else-if="ispet==0" class="header_userinfobox_bottom">
          <img  v-image-preview   class="header_userurl" :src="pet_url">
          <div class="header_textinfobox">
            <div class="header_nameguanzhu">
              <div class="header_textinfo_name">{{pet_name}}</div>
            </div>
            <div class="header_textinfo_qianmin">{{pet_qianmin}}</div>
          </div>
        </div>
      </header>
      <img @click="userhome_goto('MedicalCard')" class="medium_book" :src="book">
    </div>
    <div class="othserusermedium">
      <div @click="userhome_goto('userhome')" class="medium_txt1">主页</div>
      <div @click="userhome_goto('userhistory')" class="medium_txt2">历史</div>
      <div  class="medium_txt3">收藏</div>
      <div @click="userhome_goto('usershezhi')" class="medium_txt4">设置</div>
    </div>
    <div class="otheruserbottom">
      <div class="bottom_leftbox">
        <div class="bottom_leftbox1">
          <div class="bottom_leftbox1_inner">
            <div>{{guanzhu_num}}</div>
            <div @click="userhome_goto('userguanzhu')">关注</div>
          </div>
          <div class="bottom_leftbox1_line"></div>
          <div class="bottom_leftbox1_inner">
            <div>{{fensi_num}}</div>
            <div @click="userhome_goto('userfensi')">粉丝</div>
          </div>
          <div class="bottom_leftbox1_line"></div>
          <div class="bottom_leftbox1_inner">
            <div>{{fenxiang_num}}</div>
            <div>分享</div>
          </div>
        </div>
        <div class="bottom_leftbox2" >
          <div v-if="ispet==1" class="petcard" v-for="(pet,index) in pets" :key="pet.index">
            <div class="bottom_leftbox2_info">
              <img  v-image-preview   class="bottom_leftbox2_peturl" :src="pet.pet.cwtx" >
              <div class="bottom_leftbox2_info_right">
                <div class="bottom_leftbox2_info_hang">
                  <div class="bottom_leftbox2_info_hang_item">{{pet.pet.xm}}</div>
                  <div class="bottom_leftbox2_info_hang_item">{{pet.pet.xb}}</div>
                  <div class="bottom_leftbox2_info_hang_item">{{pet.pet.csrq}}</div>
                </div>
                <div class="bottom_leftbox2_info_hang">
                  <div class="bottom_leftbox2_info_hang_item">{{pet.pet.zl}}</div>
                  <div class="bottom_leftbox2_info_hang_item">{{pet.pet.pz}}</div>
                </div>
              </div>
            </div>
            <div class="petsimags">
              <img v-image-preview   v-for="petpic in pet.petpic" class="petsimag" :src="petpic" >
            </div>
          </div>
          <!-- 主人  宠物视角显示 -->
          <div v-if="ispet==0" class="petcard" >
            <div class="bottom_leftbox2_info">
              <img  v-image-preview   class="bottom_leftbox2_peturl" :src="user_url" >
              <div class="bottom_leftbox2_info_right">
                <div class="bottom_leftbox2_info_hang">
                  <div class="bottom_leftbox2_info_hang_item">{{user_name}}</div>
                </div>
                <div class="bottom_leftbox2_info_hang">
                  <div class="bottom_leftbox2_info_hang_item">{{user_qianmin}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
<!-- ////////////////////////////////////////////////// -->
      <div class="bottom_rigthbox">
        <div class="bottom_rigthbox_header">关注列表</div>
        <div v-for="follow in follow" :key="follow.index" class="homeusercard"> 
          <img :src="follow.tx" class="bottom_leftbox2_peturl" >
          <div class="homeusercardleft">
            <div class="bottom_leftbox2_info_hang_item">{{follow.yhm}}</div>
            <div class="bottom_leftbox2_info_hang_item">{{follow.gxqm}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vTop from '../components/topselect'
import pethomeVue from './pethome.vue';
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
const axios = require('axios');
export default {
  name: "userguanzhu",
  components:{
    vTop,
    videoPlayer
  },
  data(){
    return{
      book:require("@/assets/img/home_title_book.png"),
      user_change:require("@/assets/img/user_change.png"),
      user_historycat:require("@/assets/img/user_historycat.png"),
      ispet:1,
      user_id:0,
      pet_url:"",
      pet_name:"用户名",
      pet_qianmin:"个性签名~个性签名~个性签名~最多20个字",
      user_url:"",
      user_name:"用户名",
      user_qianmin:"个性签名~个性签名~个性签名~最多20个字",
      user_guanzhu:"关注",
      guanzhu_num:22,
      fensi_num:23,
      fenxiang_num:222,
      pets:[],
      follow:[],
      userfollow:9,

    }
  },
  activated:function(){
    this.userfollow=this.$route.params.userfollow
    if(localStorage.getItem("yhid")){ 
        this.user_name=localStorage.getItem("yhm")
        this.getuserinfo()
    }
    else{
        this.gotologin()
    }
  },
  methods:{
    getuserfollow(e){
      const _this=this
      axios.post('http://localhost:8000/getusergz?zyhid='+e)
      .then((response)=>{
        console.log(response.data)
        this.follow=response.data
      }).catch(function (error) { // 请求失败处理
        console.log("---查询出错---！"+error);
      })
    },
    userhome_goto(e){
      this.$router.push("/"+e)({
      })
    },
    selectshijiaoFn(e){
      const _this=this
      //console.log(e.target.selectedIndex) 
      if(e.target.selectedIndex==1){
        _this.ispet=1
      }
      else if(e.target.selectedIndex==0){
        return
      }
      else{
        _this.ispet=0
        _this.pet_url=_this.pets[e.target.selectedIndex-2].pet.cwtx
        _this.pet_name=_this.pets[e.target.selectedIndex-2].pet.xm
        _this.pet_qianmin=_this.pets[e.target.selectedIndex-2].pet.pz
      }
    },
    getpet(e){
      const _this=this
      axios.post('http://localhost:8000/petinfolistbyyhid?yhid='+e)
      .then((response)=>{
        //console.log(response)
        this.pets=response.data
      }).catch(function (error) { // 请求失败处理
        console.log("---查询出错---！"+error);
      })
    },
    getnum(e){
      const _this= this
      axios.post('http://localhost:8000/user/gzfsfx?yhid='+e)
      .then((response)=>{
        //console.log(response)
        _this.guanzhu_num=response.data[0];
        _this.fensi_num=response.data[1];
        _this.fenxiang_num=response.data[2];
      }).catch(function (error) { // 请求失败处理
        console.log("---查询出错---！"+error);
      })
    },
    getuserinfo(){
      const _this= this
      axios.get('http://localhost:8000/user/getUserByNamelog/'+JSON.parse(localStorage.getItem('yhm')))
        .then(async res=>{
          //console.log(res.data)
          _this.user_id=res.data.yhid
          _this.user_name=res.data.yhm;
          _this.user_url=res.data.tx;
          _this.user_qianmin=res.data.gxqm;
          _this.getnum(res.data.yhid);
          _this.getpet(res.data.yhid);
          _this.getuserfollow(res.data.yhid);
        }).catch(err => {
          console.log('错误！！！！：'+err)
      })
    },
    gotologin(){
        const _this=this
        this.$router.push({
                name: 'content',
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
  position: relative;
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
.select1{
  border-radius: 20px;
  height: 47px;
  width: 130px;
  background-color: #FDF0E3;
  border-color: #FDF0e3;
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
  object-fit: cover;
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
.medium_book{
  position: absolute;
  margin-top:80px ;
  margin-left: 1000px;
}
.othserusermedium{
  background-image:url("../assets/img/user_medium.png");
  width: 1193px;
  height: 53px;
  margin-left: 124px;
  display: flex;
  flex-direction: row;
}
.medium_txt1{
  margin-left: 180px;
  font-size: 24px;
  margin-top: 8px;
}
.medium_txt2{
  margin-left: 170px;
  font-size: 24px;
  margin-top: 8px;
  
}
.medium_txt3{
  font-size: 24px;
  margin-top: 8px;
  margin-left: 170px;
}
.medium_txt4{
  margin-top: 8px;
  margin-left: 170px;
  font-size: 24px;
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
  height: 800px;
  overflow:auto
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
  min-height: 70px;
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
  object-fit: cover;
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
  min-height: 0px;
  width: 348px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
  
}
.petsimag{
  width: 116px;
  height: 93px;
  margin-bottom: 15px;
  object-fit: cover;
  margin-left: 2px;
}
/* ////////////////////////////////// */
.bottom_rigthbox{
  margin-left: 22px;
  width: 792px;
  height: 800px;
  overflow:auto
}
.homeusercard{
    width: 792px;
    min-height: 100px;
    background: #FDF0E3;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
}
.homeusercardleft{
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}
.bottom_rigthbox_header{
    width: 792px;
    height: 30px;
    background: #FDF0E3;
    border-bottom: #BDB6B1 solid 1px;
    position: relative;
}
</style>