<template>
  <div class="otheruserbox">
    <!-- 首栏 -->
    <v-top></v-top>
    <div class="othseruserheader">
      <header class="header_userinfobox">
        <img class="header_change" :src="user_change">
        <div class="header_userinfobox_bottom">
          <img class="header_userurl" :src="user_url">
          <div class="header_textinfobox">
            <div class="header_nameguanzhu">
              <div class="header_textinfo_name">{{user_name}}</div>
              <div class="header_guanzhu">{{user_guanzhu}}</div>
            </div>
            <div class="header_textinfo_qianmin">{{user_qianmin}}</div>
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
          <!-- //////////////////////////////和另一个页面不同的地方//////除了这部分复制就可以///////////////// -->
          <div class="petcard" v-for="(pet,index) in pets" :key="pet.index">
            <div class="bottom_leftbox2_info">
              <img class="bottom_leftbox2_peturl" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" >
              <div class="bottom_leftbox2_info_right">
                <div class="bottom_leftbox2_info_hang">
                  <div class="bottom_leftbox2_info_hang_item">{{pet.xm}}</div>
                  <div class="bottom_leftbox2_info_hang_item">{{pet.xb}}</div>
                  <div class="bottom_leftbox2_info_hang_item">{{pet.csrq}}</div>
                </div>
                <div class="bottom_leftbox2_info_hang">
                  <div class="bottom_leftbox2_info_hang_item">{{pet.zl}}</div>
                  <div class="bottom_leftbox2_info_hang_item">{{pet.pz}}</div>
                </div>
              </div>
            </div>
            <div class="petsimags">
              <img v-for="petpic in petspic[index]" class="petsimag" :src="petpic" >
            </div>
          </div>
        </div>
      </div>
      <div class="bottom_rigthbox">
        <div v-for="messageinform in messageinform" :key="messageinform.index" class="logcard">
          <div class="loguserinfobox">
            <img class="userimag" :src="messageinform.userUrl">
            <div class="infoleft">
              <span class="username">{{messageinform.username}}</span>
              <span class="datetime">{{messageinform.datatime}}</span>
            </div> 
          </div>
          <div class="messagecont">{{messageinform.passage}}</div>
          <div class="messageimgs">
            <img fit="cover" class="messageimg" v-image-preview v-for="(photo) in messageinform.photourl" :key="photo.key"  :src="photo">  
          </div>
          <div class="logfoot">
            <div class="txt" style="font-weight:bold" >
              <img @click="starplus()" class="p1" src="../assets/img/star.png" alt="">
                {{messageinform.starnumber}}  {{messageinform.isstar}}
            </div>     
            <div class="txt" style="font-weight:bold" >
              <img @click="loveplus()" class="p1" src="../assets/img/love.png" alt="">
                {{messageinform.lovenumber}}  {{messageinform.islove}}
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
      user_guanzhu:"已关注",
      guanzhu_num:22,
      fensi_num:23,
      fenxiang_num:222,
      pets:[],
      petspic:[[],[],[],[],[],[]],
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
  },
  methods:{
    getpet(e){
      const _this=this
      axios.post('http://localhost:8000/petlist?yhid='+e)
      .then((response)=>{
        // console.log(response)
        this.pets=response.data
          var i=0
          for(i=0;i<response.data.length;i++){
            axios.post('http://localhost:8000/getpetpic?cwid='+response.data[i].cwid)
            .then((res)=>{
              // console.log(res)
              for(var j=0;j<3;j++){
                _this.petspic[i][j]=res.data[j]
              }
            }).catch(function (error) { // 请求失败处理
              console.log("查询出错"+error);
            })
          }
      }).catch(function (error) { // 请求失败处理
        console.log("---查询出错---！"+error);
      })
     
    },
    getnum(e){
      const _this= this
      axios.post('http://localhost:8000/follow?zyhid='+e)
      .then((response)=>{
        // console.log(response)
        _this.fensi_num=response.data;
      }).catch(function (error) { // 请求失败处理
        console.log("---查询出错---！"+error);
      })
      axios.post('http://localhost:8000/fsfollow?fsid='+e)
      .then((response)=>{
        // console.log(response)
        _this.guanzhu_num=response.data;
      }).catch(function (error) { // 请求失败处理
        console.log("---查询出错---！"+error);
      })
      axios.post('http://localhost:8000/share?yhid='+e)
      .then((response)=>{
        // console.log(response)
        _this.fenxiang_num=response.data;
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
            _this.guanzhu="+关注"
          } 
          else if(re.data=="1"){
            _this.guanzhu="+关注"
          }
          else{
            _this.guanzhu="已关注"
          }
        }).catch(err => {
          console.log('错误！！！！：'+err)
        })
      }
      else{
        _this.guanzhu="+关注"
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
      console.log(this.pets)
      console.log(this.petspic)
    },
    otherhomegotopt(){
      const _this=this
        this.$router.replace({
          name: 'otheruserpt',
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
}
.bottom_rigthbox{
  margin-left: 22px;
  width: 792px;
  height: 400px;
}
/* <!-- //////////////////////////////和另一个页面不同的地方/////////////////////// --> */
.logcard{
    width: 792px;
    min-height: 400px;
    background: #FDF0E3;
    margin-bottom: 5px;
}
.loguserinfobox{
    width: 300px;
    height: 70px;
    display: flex;
    flex-direction: row;
    margin-left: 18px;
}
.infoleft{
    display: flex;
    flex-direction: column;
}
.userimag{
    margin-top: 20px; 
    width: 70px;
    height: 70px;
    border-radius: 50%;
}
.username{
    margin-top: 30px;
    margin-left: 25px;
}
.datetime{
    width: 400px;
    margin-top: 0px;
    margin-left: 25px;
}
.messagecont{
    margin-top: 35px;
    margin-left: 109px;
    margin-right: 20px;
}
.messageimgs{
    width: 662px;
    margin-left: 109px;
    margin-right: 20px;
    margin-top: 10px;
}
.messageimg{
    width: 218px; 
    height: 140px;
    padding:1px;
    object-fit: cover;
}
.logfoot{
    width: 350px;
    margin-left: 500px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: row;
}
</style>
