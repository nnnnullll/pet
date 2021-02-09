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
              <div @click="guanzhu()" class="header_guanzhu">{{user_guanzhu}}</div>
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
    </div>
    <div class="othserusermedium">
      <div  class="medium_txt1">他的主页</div>
      <div @click="userhomegotopt()" class="medium_txt2">他的相册</div>
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
        <div class="bottom_rigthboxinner">
          <div v-for="(messageinform,index) in messageinform" :key="messageinform.index" class="logcard">
            <div class="loguserinfobox">
              <img class="userimag" :src="user_url">
              <div class="infoleft">
                <span class="username">{{user_name}}</span>
                <span class="datetime">{{messageinform.datatime}}</span>
              </div> 
            </div>
            <div class="messagecont">{{messageinform.passage}}</div>
            <div v-if="messageinform.isphoto=='1'" class="messageimgs">
              <img fit="cover" class="messageimg" v-image-preview v-for="(photo) in messageinform.photourl" :key="photo.key"  :src="photo">  
            </div>
            <div v-else-if="messageinform.isphoto=='0'" class="messageimgs">
              <div class="tuijianvideo">
                <video-player class="video-player vjs-custom-skin"
                  muted
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions[index]">
                </video-player>
              </div>
            </div>
            <div class="logfoot">
              <div class="txt" style="font-weight:bold" >
                <img @click="starplus(index)" class="p1" src="../assets/img/star.png" alt="">
                  {{messageinform.starnumber}}  {{messageinform.isstar}}
              </div>     
              <div class="txt" style="font-weight:bold" >
                <img @click="loveplus(index)" class="p1" src="../assets/img/love.png" alt="">
                  {{messageinform.lovenumber}}  {{messageinform.islove}}
              </div>
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
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
const axios = require('axios');
export default {
  name: "otheruser",
  components:{
    vTop,
    videoPlayer
  },
  data(){
    return{
      user_change:require("@/assets/img/user_change.png"),
      ispet:1,
       pet_url:"",
      pet_name:"用户名",
      pet_qianmin:"个性签名~个性签名~个性签名~最多20个字",
      user_id:0,
      user_url:"",
      user_name:"",
      user_qianmin:"个性签名~个性签名~个性签名~最多20个字",
      user_guanzhu:"",
      guanzhu_num:22,
      fensi_num:23,
      fenxiang_num:222,
      pets:[],
      messageinform:[],
      playerOptions:[],
    }
  },
  activated:function(){
    this.getuserinfo( this.$route.params.yhm)
  },
  methods:{
    selectshijiaoFn(e){
      const _this=this
      console.log(e.target.selectedIndex) 
      if(e.target.selectedIndex==1){
        _this.ispet=1
        _this.getuserinfo(_this.user_name)
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
    setvid(e){
     for(var i=0;i<e.length;i++){
          console.log(e[i].isphoto)
          if(e[i].isphoto=="0"){
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
                  src: e[i].vdurl, //url地址 "../../static/vedio/test1.mp4"
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
          else{
            this.playerOptions.push(1)
          }
          console.log(playerOptions)
      }

    },
    async getmessage(e,t){
      const _this=this
      if(localStorage.getItem("yhid"))
        var a=localStorage.getItem("yhid")
      else
        var a=0
      _this.playerOptions=[]
      await axios.post('http://localhost:8000/usersharebyyhid?yhid='+e+'&zyhid='+a+'&cwid='+t)
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
          _this.getpet(res.data.yhid);
          _this.getmessage(res.data.yhid,0)
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
    loveplus(index) {
      if(localStorage.getItem("yhid")){
        axios.get('http://localhost:8000/islike', {
          params:{
            yhid:localStorage.getItem("yhid"),
            jlid:this.messageinform[index].messagenum
          }
        }).then(res => {
          console.log(res.data)
          if(res.data=="wu"){
            axios.get('http://localhost:8000/addlike',{
            params:{
              yhid:localStorage.getItem("yhid"),
              jlid:this.messageinform[index].messagenum
            }
            }).then(res => {
              console.log(res.data)
              if(res.data=="success"){
                this.messageinform[index].love=false;
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
              console.log(res.data)
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
                console.log(res.data)
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
    userhomegotopt(){
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