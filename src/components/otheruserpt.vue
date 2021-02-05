<template>
  <div class="otheruserbox">
    <!-- 首栏 -->
    <v-top></v-top>
    <div class="othseruserheader">
      <header class="header_userinfobox">
        <img class="header_change" :src="user_change">
        <div class="header_userinfobox_bottom">
          <img  v-image-preview   class="header_userurl" :src="user_url">
          <div class="header_textinfobox">
            <div class="header_nameguanzhu">
              <div class="header_textinfo_name">{{user_name}}</div>
              <div @click="guanzhu()" class="header_guanzhu">{{user_guanzhu}}</div>
            </div>
            <div class="header_textinfo_qianmin">{{user_qianmin}}</div>
          </div>
        </div>
      </header>
    </div>
    <div class="othserusermedium">
      <div @click="otherhomegotopt()" class="medium_txt1">他的主页</div>
      <div  class="medium_txt2">他的相册</div>
    </div>
    <div class="otheruserbottom">
      <div class="bottom_leftbox">
        <div class="bottom_leftbox1">
          <div class="bottom_leftbox1_inner">
            <div>{{guanzhu_num}}</div>
            <div>关注</div>
          </div>
          <div class="bottom_leftbox1_line"></div>
          <div class="bottom_leftbox1_inner">
            <div>{{fensi_num}}</div>
            <div>粉丝</div>
          </div>
          <div class="bottom_leftbox1_line"></div>
          <div class="bottom_leftbox1_inner">
            <div>{{fenxiang_num}}</div>
            <div>分享</div>
          </div>
        </div>
        <div class="bottom_leftbox2" >
          <div class="petcard" v-for="(pet,index) in pets" :key="pet.index">
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
        </div>
      </div>
<!-- ////////////////////////////////////////////////// -->
      <div class="bottom_rigthbox">
        <div class="bottom_rigthboxinner">
          <div class="bottom_rigthbox_head">
            <div class="bottom_rigthbox_headtxt1">照片</div>
            <div @click="userhomegotovd()" class="bottom_rigthbox_headtxt2">视频</div>
          </div>
          <div v-for="photoinform in photoinforms" :key="photoinform.index" class="photocard">
            <div class="bottom_rightbox_line"></div>
            <div class="photodate">{{photoinform.fbsj}}</div>
            <div class="photosbox">
              <img v-image-preview class="photo" v-for="photo in photoinform.photolist" :key="photo.index" :src="photo" >
            </div>
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
      user_id:0,
      user_url:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      user_name:"用户名",
      user_qianmin:"个性签名~个性签名~个性签名~最多20个字",
      user_guanzhu:"",
      guanzhu_num:22,
      fensi_num:23,
      fenxiang_num:222,
      pets:[],
      photoinforms:[],
      messageinform:[
        {
          messagenum:0,
          username:"用户名",
          datatime:"2021-01-01 00：00",    
          passage:"示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字",
          userid:0,
          userUrl:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          lovenumber:223,
          starnumber:12,
          islove:"喜欢",
          isstar:"收藏",
          photourl: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                    ],
        },
        {
          messagenum:0,
          username:"用户名",
          datatime:"2021-01-01 00：00",    
          passage:"示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字",
          userid:"",
          userUrl:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          lovenumber:223,
          starnumber:12,
          islove:"喜欢",
          isstar:"收藏",
          photourl: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'],
        },
      ]
    }
  },
  activated:function(){
    this.getuserinfo( this.$route.params.yhm)
    this.getphoto(this.$route.params.yhid)
  },
  methods:{
    getphoto(e){
      axios.post('http://localhost:8000/getuserfbsjpic?yhid='+e)
      .then((response)=>{
        console.log(response)
        this.photoinforms=response.data
      }).catch(function (error) { // 请求失败处理
        console.log("---查询出错---！"+error);
      })
    },
    getpet(e){
      const _this=this
      axios.post('http://localhost:8000/petinfolistbyyhid?yhid='+e)
      .then((response)=>{
        // console.log(response)
        this.pets=response.data
      }).catch(function (error) { // 请求失败处理
        console.log("---查询出错---！"+error);
      })
    },
    getnum(e){
      const _this= this
      axios.post('http://localhost:8000/user/gzfsfx?yhid='+e)
      .then((response)=>{
        // console.log(response)
        _this.guanzhu_num=response.data[0];
        _this.fensi_num=response.data[1];
        _this.fenxiang_num=response.data[2];
      }).catch(function (error) { // 请求失败处理
        console.log("---查询出错---！"+error);
      })
    },
    getguanzhu(e){
      const _this=this
      if(localStorage.getItem("yhid")){
        axios.get('http://localhost:8000/isfollow',{//查成功
          params:{
            zyhid:e,
            fsid:localStorage.getItem("yhid"),
          }
        }).then(re => {
          if(re.data=="wu"){
            _this.user_guanzhu="+关注"
          } 
          else if(re.data=="1"){
            _this.user_guanzhu="+关注"
          }
          else{
            _this.user_guanzhu="已关注"
          }
        }).catch(err => {
          console.log('错误！！！！：'+err)
        })
      }
      else{
        _this.user_guanzhu="+关注"
      }
    },
    getuserinfo(e){
      const _this= this
      axios.get('http://localhost:8000/user/getUserByNamelog/'+e)
        .then(async res=>{
          _this.user_id=res.data.yhid
          _this.user_name=res.data.yhm;
          _this.user_url=res.data.tx;
          _this.user_qianmin=res.data.gxqm;
          _this.getguanzhu(res.data.yhid);
          _this.getnum(res.data.yhid);
          _this.getpet(res.data.yhid)
        }).catch(err => {
          console.log('错误！！！！：'+err)
      })
    },
    guanzhu() {
      const _this=this
      if(localStorage.getItem("yhid")){
        axios.get('http://localhost:8000/isfollow',{//查成功
          params:{
            zyhid:_this.user_id,
            fsid:localStorage.getItem("yhid"),
          }
        }).then(res => {
          console.log(res.data)
          if(res.data=="wu"){
            axios.get('http://localhost:8000/addfollow',{
              params:{
                zyhid:_this.user_id,
                fsid:localStorage.getItem("yhid"),
                qxgz:0
              }
            }).then(res => {
              console.log(res.data)
              if(res.data=="success"){
                alert("关注成功")
                _this.user_guanzhu="已关注"
              } 
            })
            .catch(err => {
              console.log('首关注环节错误：'+err)//
            })
          } 
          else if(res.data=="1"){
            axios.get('http://localhost:8000/upfollow',{
            params:{
              zyhid:_this.user_id,
              fsid:localStorage.getItem("yhid"),
              qxgz:0
            }
          }).then(res => {
            console.log(res.data)
            if(res.data=="success"){
              alert("关注成功")
            _this.user_guanzhu="已关注"
          } 
        })
        .catch(err => {
          console.log('再关注环节错误：'+err)//
        })
          }
          else{
            axios.get('http://localhost:8000/upfollow',{
              params:{
                zyhid:_this.user_id,
                fsid:localStorage.getItem("yhid"),
                qxgz:1
              }
            }).then(res => {
              console.log(res.data)
              if(res.data=="success"){
                alert("取消关注成功")
                _this.user_guanzhu="+关注"
              } 
            })
            .catch(err => {
              console.log('取关错误：'+err)
            })
          }
        })
        .catch(err => {
          console.log('查错误：'+err)
        })
      }
      else{
        this.$router.push({
          name: 'content',
        })
      }
    },
    otherhomegotopt(){
      const _this=this
      this.$router.replace({
        name: 'otheruser',
        params: {
          yhid: _this.user_id,
          yhm:_this.user_name
        }
      })
    },
    userhomegotovd(){
      const _this=this
      this.$router.replace({
        name: 'otheruservd',
        params: {
          yhid: _this.user_id,
          yhm:_this.user_name
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
}
.medium_txt2{
  font-size: 24px;
  margin-top: 3px;
  color: #FBA259;
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
  width: 114px;
  height: 93px;
  margin-bottom: 15px;
  object-fit: cover;
}
/* ////////////////////////////////// */
.bottom_rigthbox{
  margin-left: 22px;
  width: 792px;
  height: 900px;
  overflow:auto
}
.bottom_rigthboxinner{
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
.bottom_rigthbox_headtxt1{
  color: #000000; 
}
.bottom_rigthbox_headtxt2{
  color: #BDB6B1;
}
.photocard{
  margin-left: 27px;
  min-height: 236px;
  width: 738px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  overflow:auto
}
.bottom_rightbox_line{
  width: 738px;
  height: 1px;
  background: #BDB6B1;
}
.photodate{
  margin-top: 20px;
}
.photosbox{
  width: 738px;
  min-height: 180px;
}
.photo{
  width: 245px;
  height: 162px;
  padding: 2px;
  object-fit: cover;
}
</style>