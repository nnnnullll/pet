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
      <div class="medium_txt2" @click="userhome_goto('userhistory')">历史</div>
      <div @click="userhome_goto('userstar')" class="medium_txt3">收藏</div>
      <div  class="medium_txt4">设置</div>
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
        <div class="bottom_rigthbox_header">
          <div class="medium_txt2" @click="userhome_goto('usershezhi')">主人信息</div>
          <div class="medium_txt4" >宠物信息</div>
          <img class="user_historycat" :src="user_historycat" >

        </div>
        <div class="bottom_rigthboxinner" style="display: flex;flex-direction:column">
          <div style="display: flex;flex-direction: row;padding-top: 4%">
            <div style="width:84px;margin-right: 4.5%;margin-left: 4%;">宠物名</div>
            <!--            flag=false的时候readonly-->
            <input class="input-before" v-model="pets[seq].pet.xm" style="width: 471px;background-color: transparent"type="text" :readonly="flag1?false:'readonly'" :placeholder="pets[seq].pet.xm"></input>
            <div @click="changeFlag1">{{msg1}}</div>
          </div>
          <div style="display: flex;flex-direction: row;padding-top: 2%">
            <div style="width:84px;margin-right: 4.5%;margin-left: 4%">品种</div>
            <input class="input-before"v-model="pets[seq].pet.pz" style="width: 471px;background-color: transparent"type="text" :readonly="flag2?false:'readonly'" :placeholder="pets[seq].pet.pz"></input>
            <div @click="changeFlag2">{{msg2}}</div>
          </div>
          <div style="display: flex;flex-direction: row;padding-top: 2%">
            <div style="width:84px;margin-right: 4.5%;margin-left: 4%;">出生日期</div>
            <input class="input-before" v-model="pets[seq].pet.csrq" style="width: 471px;background-color: transparent"type="text" :readonly="flag3?false:'readonly'" :placeholder="pets[seq].pet.csrq"></input>
            <div @click="changeFlag3">{{msg3}}</div>
          </div>
          <div style="display: flex;flex-direction: row;padding-top: 2%">
            <div style="width:84px;margin-right: 4.5%;margin-left: 4%;">性别</div>
            <input class="input-before" v-model="pets[seq].pet.xb" style="width: 471px;background-color: transparent"type="text" :readonly="flag4?false:'readonly'" :placeholder="pets[seq].pet.xb"></input>
            <div @click="changeFlag4">{{msg4}}</div>
          </div>
          <div class="confirmbtn" style="margin-left: 70%">
            <div style="text-align: center;font-size: 28px;" @click="renew">确认修改</div>
          </div>
          <div style="display: flex;flex-direction: row;margin-top: 20px;margin-left: 85px">
            <div style="display: flex;flex-direction: row;margin-right: 30%" >
              <img :src="former">
              <div style="margin-top: 20px"  @click="previous">上一个宠物</div>
            </div>
            <div style="display: flex;flex-direction: row">
              <div style="margin-top: 20px"  @click="next">{{this.info}}</div>
              <img :src="latter">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import vTop from "@/components/topselect";
import {videoPlayer} from "vue-video-player";

export default {
  name: "petinfo",
  components:{
    vTop,
    videoPlayer
  },
  data(){
    return{
      info:"下一个宠物",
      msg1:"编辑",
      msg2:"编辑",
      msg3:"编辑",
      msg4:"编辑",
      flag1:false,
      flag2:false,
      flag3:false,
      flag4:false,
      former:require("@/assets/img/former.png"),
      latter:require("@/assets/img/latter.png"),
      book:require("@/assets/img/home_title_book.png"),
      user_change:require("@/assets/img/user_change.png"),
      user_historycat:require("@/assets/img/user_historycat.png"),
      ispet:1,
      user_id:0,
      pet_url:"",
      pet_name:"用户名",
      pet_kind:"团宠喵",
      pet_age:"18",
      pet_gender:"女",
      pet_qianmin:"个性签名~个性签名~个性签名~最多20个字",
      user_url:"",
      user_name:"用户名",
      user_qianmin:"个性签名~个性签名~个性签名~最多20个字",
      user_guanzhu:"关注",
      guanzhu_num:22,
      fensi_num:23,
      fenxiang_num:222,
      seq:0,
      pets:[],
      messageinform:[],
      playerOptions:[],
    }
  },
  activated:function(){
    if(localStorage.getItem("yhid")){
      this.user_name=localStorage.getItem("yhm")
      this.getuserinfo()
    }
    else{
      this.gotologin()
    }
  },
  methods:{
    newPet(){
      console.log("下标："+this.seq)
    },
    previous(){
      console.log("长度："+this.pets.length)
      if(this.seq>0)
      {
        this.seq--;
        console.log("下标："+this.seq)
      }
      else {
        alert("已经是第一个宠物！")
        console.log("下标0")
      }
    },
    next(){
      if(this.seq<this.pets.length){
        this.seq++;
        console.log("下标："+this.seq)
      }
      else{
        this.info="新建宠物"
      }
      console.log("下标max")
    },
    renew(){
      //提交修改后宠物信息，链接后台修改数据
      console.log(this.pets[this.seq].pet)
      let tmp=this.pets[this.seq].pet;
      axios.post('/renewPet',{
        cwid:tmp.cwid,
        xm:tmp.xm,
        xb:tmp.xb,
        pz:tmp.pz,
        csrq:tmp.csrq
      })
      .then(res=>{
        console.log("yesok")
        console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    changeFlag1(){
      if(this.flag1==false){
        this.flag1=true;
        this.msg1="保存"
      }
      else{
        this.flag1=false;
        this.msg1="编辑"
      }

    },
    changeFlag2(){
      if(this.flag2==false){
        this.flag2=true;
        this.msg2="保存"
      }
      else{
        this.flag2=false;
        this.msg2="编辑"
      }
    },
    changeFlag3(){
      if(this.flag3==false){
        this.flag3=true;
        this.msg3="保存"
      }
      else{
        this.flag3=false;
        this.msg3="编辑"
      }
    },
    changeFlag4(){
      if(this.flag4==false){
        this.flag4=true;
        this.msg4="保存"
      }
      else{
        this.flag4=false;
        this.msg4="编辑"
      }
    },
    userhome_goto(e){
      this.$router.push("/"+e)
    },
    selectshijiaoFn(e){
      const _this=this
      console.log(e.target.selectedIndex)
      if(e.target.selectedIndex==1){
        _this.ispet=1
        _this.getuserinfo(_this.user_id)
      }
      else if(e.target.selectedIndex==0){
        return
      }
      else{
        _this.ispet=0
        _this.pet_url=_this.pets[e.target.selectedIndex-2].pet.cwtx
        _this.pet_name=_this.pets[e.target.selectedIndex-2].pet.xm
        _this.pet_qianmin=_this.pets[e.target.selectedIndex-2].pet.pz
        _this.getmessage(this.user_id,this.pets[e.target.selectedIndex-2].pet.cwid)
      }
    },
    selectFn(e) {
      const _this=this
      console.log(e.target.selectedIndex)
      if(e.target.selectedIndex==1){
        _this.getmessage(_this.user_id,0)
      }
      else if(e.target.selectedIndex==0){
        return
      }
      else{
        _this.getmessage(_this.user_id,_this.pets[e.target.selectedIndex-2].pet.cwid)
      }
    },
    async getmessage(e,t){
      const _this=this
      if(localStorage.getItem("yhid"))
        var a=localStorage.getItem("yhid")
      else
        var a=0
      this.playerOptions=[]
      await axios.post('/usersharebyyhid?yhid='+e+'&zyhid='+a+'&cwid='+t)
          .then(async(response)=>{
            console.log(response)
            this.messageinform=response.data
            // await this.setvid(response.data)
            for(var i=0;i<response.data.length;i++){
              console.log(response.data[i].isphoto)
              // if(response.data[i].isphoto=="0"){
              let arrStr = {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: "zh-CN",
                aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                sources: [
                  {
                    type: "", //这里的种类支持很多种：基本视频格式、直播、流媒体等
                    src: response.data[i].vdurl, //url地址 "../../static/vedio/test1.mp4"
                  },
                ],
                poster: "", //你的封面地址 "../../static/vedio/test.jpg"
                controlBar: {
                  timeDivider: true,
                  durationDisplay: true,
                  remainingTimeDisplay: false,
                  fullscreenToggle: true, //全屏按钮
                },
              }
              this.playerOptions.push(arrStr);
            }
          }).catch(function (error) { // 请求失败处理
            console.log("---查询出错---！"+error);
          })
    },
    getpet(e){
      const _this=this
      axios.post('/petinfolistbyyhid?yhid='+e)
          .then((response)=>{
            console.log("pets:")
            console.log(response)
            this.pets=response.data
          }).catch(function (error) { // 请求失败处理
        console.log("---查询出错---！"+error);
      })
    },
    getnum(e){
      const _this= this
      axios.post('/user/gzfsfx?yhid='+e)
          .then((response)=>{
            console.log(response)
            _this.guanzhu_num=response.data[0];
            _this.fensi_num=response.data[1];
            _this.fenxiang_num=response.data[2];
          }).catch(function (error) { // 请求失败处理
        console.log("---查询出错---！"+error);
      })
    },
    getuserinfo(){
      const _this= this
      axios.get('/user/getUserByNamelog/'+"sywtest")
          .then(async res=>{
            console.log(res.data)
            _this.user_id=res.data.yhid
            _this.user_name=res.data.yhm;
            _this.user_url=res.data.tx;
            _this.user_qianmin=res.data.gxqm;
            _this.getnum(res.data.yhid);
            _this.getpet(res.data.yhid);
            _this.getmessage(res.data.yhid,0);
          }).catch(err => {
        console.log('错误！！！！：'+err)
      })
    },
    loveplus(index) {
      // console.log(this.messageinform)
      if(localStorage.getItem("yhid")){
        axios.get('http://localhost:8000/islike', {
          params:{
            yhid:localStorage.getItem("yhid"),
            jlid:this.messageinform[index].messagenum
          }
        }).then(res => {
          // console.log(res.data)
          if(res.data=="wu"){
            axios.get('http://localhost:8000/addlike',{
              params:{
                yhid:localStorage.getItem("yhid"),
                jlid:this.messageinform[index].messagenum
              }
            }).then(res => {
              // console.log(res.data)
              if(res.data=="success"){
                this.messageinform[index].islove="已喜欢"
                this.messageinform[index].lovenumber++
              }
            }).catch(err => {
              console.log('首关注环节错误：'+err)//
            })
          }
          else if(res.data=="1"){
            axios.get('http://localhost:8000/uplike',{
              params:{
                yhid:localStorage.getItem("yhid"),
                jlid:this.messageinform[index].messagenum,
                sc:0
              }
            }).then(res => {
              // console.log(res.data)
              if(res.data=="success"){
                this.messageinform[index].islove="已喜欢"
                this.messageinform[index].lovenumber++
              }
            }).catch(err => {
              console.log('再关注环节错误：'+err)//
            })
          }
          else{
            axios.get('http://localhost:8000/uplike',{
              params:{
                yhid:localStorage.getItem("yhid"),
                jlid:this.messageinform[index].messagenum,
                sc:1
              }
            }).then(res => {
              // console.log(res.data)
              if(res.data=="success"){
                this.messageinform[index].islove="喜欢"
                this.messageinform[index].lovenumber--
              }
            }).catch(err => {
              console.log('取关错误：'+err)
            })
          }
        }).catch(err => {
          console.log('查错误：'+err)
        })
      }
      else{
        this.$router.push({
          name: 'content',
        })
      }
    },
    starplus(index) {
      console.log(index)
      console.log(this.messageinform)
      if(localStorage.getItem("yhid")){
        axios.get('http://localhost:8000/isstar', {
          params:{
            yhid:localStorage.getItem("yhid"),
            jlid:this.messageinform[index].messagenum
          }
        }).then(res => {
          console.log(res.data)
          if(res.data=="wu"){
            axios.get('http://localhost:8000/addstar',{
              params:{
                yhid:localStorage.getItem("yhid"),
                jlid:this.messageinform[index].messagenum
              }
            }).then(res => {
              console.log(res.data)
              if(res.data=="success"){
                this.messageinform[index].isstar="已收藏"
                this.messageinform[index].starnumber++
              }
            })
                .catch(err => {
                  console.log('首关注环节错误：'+err)//
                })
          }
          else if(res.data=="1"){
            console.log(this.messageinform[index].messagenum)
            axios.get('http://localhost:8000/upstar',{
              params:{
                yhid:localStorage.getItem("yhid"),
                jlid:this.messageinform[index].messagenum,
                sc:0
              }
            }).then(res => {
              console.log(res.data)
              if(res.data=="success"){
                this.messageinform[index].isstar="已收藏"
                this.messageinform[index].starnumber++
              }
            }).catch(err => {
              console.log('再关注环节错误：'+err)//
            })
          }
          else{
            console.log(index)
            axios.get('http://localhost:8000/upstar',{
              params:{
                yhid:localStorage.getItem("yhid"),
                jlid:this.messageinform[index].messagenum,
                sc:1
              }
            }).then(res => {
              console.log(res.data)
              if(res.data=="success"){
                this.messageinform[index].isstar="收藏"
                this.messageinform[index].starnumber--
              }
            }).catch(err => {
              console.log('取关错误：'+err)
            })
          }
        }).catch(err => {
          console.log('查错误：'+err)
        })
      }
      else{
        this.$router.push({
          name: 'content',
        })
      }
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
.confirmbtn{
  width: 134px;
  height: 48px;
  background: #F7D271;
  border-radius: 10px;
}
input-before[readonly]{
  color:black;opacity:1
}
.input-before{
  color: black;
  outline-color: invert;
  outline-style: none;
  outline-width: 0px;
  border: none;
  border-style: none;
  text-shadow: none;
  -webkit-appearance: none;
  -webkit-user-select: text;
  outline-color: transparent;
  box-shadow: none;

  display: -webkit-box;/* 弹性盒模型 */
  -webkit-box-orient: vertical;/* 元素垂直居中*/
  -webkit-line-clamp: 3;/*  文字显示的行数*/
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-word-break: break-all;
  -moz-word-break: break-all;
  -ms-word-break: break-all;
  -o-word-break: break-all;
  word-break: break-all;
}

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
  color: #FBA259;

}
.select2{
  margin-left: 10px;
  margin-top: 3px;
  border-radius: 20px;
  height: 47px;
  width: 130px;
  background-color: #FDF0;
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
  height: 800px;
  overflow:auto
}
.bottom_rigthbox_header{
  width: 792px;
  height: 59px;
  background: #FDF0E3;
  display: flex;
  flex-direction: row;
  border-bottom: #BDB6B1 solid 1px;
  position: relative;
}
.bottom_rigthbox_header_text1{
  margin-left: 20px;
  margin-top: 15px;
}
.bottom_rigthbox_header_text2box{
  margin-left: 490px;
  margin-top: 10px;
  width: 120px;
  height: 44px;
  background-color: #F7D271;
  border-radius: 10px;
}
.bottom_rigthbox_header_text2{
  margin-left: 16px;
  margin-top: 7px;
  color: #000000;
}
.user_historycat{
  position: absolute;
  width:170px;
  height: 80px;
  /*margin-left: 460px;*/
}
.bottom_rigthboxinner{
  width: 792px;
  min-height: 400px;
  background: #FDF0E3;
}
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
  object-fit: cover;
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