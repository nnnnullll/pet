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
      <div class="medium_txt1">主页</div>
      <div @click="userhome_goto('userhistory')" class="medium_txt2">历史</div>
      <div @click="userhome_goto('userstar')" class="medium_txt3">收藏</div>
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
        <div class="bottom_rigthbox_header">
          <div class="bottom_rigthbox_header1_txt1">
            <!-- <textarea v-model="currentValue" name="input1" id="input1"  placeholder="有什么和大家分享的？" class="bottom_rigthbox_header1_txt1_input"></textarea> -->
            <div class="address-container">
                <textarea name="input1" id="input1"  placeholder="有什么和大家分享的？" ref="test" class="textarea-mine" v-model="currentValue"></textarea>
            </div>
            <div v-if="status == 'ready'" class="file-list" style="width: 663px">
              <section v-for="(file, index) of files" class="file-item draggable-item" >
                <img :src="file.src" alt="" ondragstart="return false;">
                <span class="file-remove " @click="remove(index)" >+</span>
              </section>
              <section v-if="(status == 'ready'&&files.length<9&&arr.isphoto ==1)||(status == 'ready'&&files.length<1&&arr.isphoto ==0)" class="file-item">
                <div @click="add(arr.isphoto)" style="margin-top: 40px;" class="add">
                  <span>+</span>
                </div>
              </section>
            </div>
          </div>
          <div class="bottom_rigthbox_header2">
            <div class="bottom_rigthbox_header2_txt2">
              <select id="sharepetselect1" name="sharepetselect1" class="bottom_rigthbox_header2_select1" @change="selectFn1($event)">
                <option value ="0">请选择宠物</option>
                <option v-for="(pet,index) in pets" :key="pet.index">{{pet.pet.xm}}</option>
              </select>
            </div>
            <div class="bottom_rigthbox_header2_txt3">
              <select id="sharefqhselect1" name="sharefqhselect1" class="bottom_rigthbox_header2_select1" @change="selectFn2($event)">
                <option value =0>请选择分区</option>
                <option value =1>萌宠日常</option>
                <option value =2>养护知识</option>
                <option value =3>DIY课堂</option>
                <option value =4>学习训练</option>
              </select>
            </div>
            <img v-if="status == 'pre'"  @click="add(1)" class="bottom_rigthbox_header2_img1" :src="user_camera">
            <input v-if="arr.isphoto ==1" class="share_input" type="file" accept="image/*" @change="fileChanged" ref="file" multiple="multiple">
            <input v-if="arr.isphoto ==0" class="share_input" type="file" accept="video/*" @change="fileChanged" ref="file" multiple="multiple">
            <img v-if="status == 'pre'" @click="add(0)" class="bottom_rigthbox_header2_img2" :src="user_dv">
            <div class="bottom_rigthbox_header2_txt4"   @click="submit">发布</div>
          </div>
        </div>
        <div class="bottom_rigthboxinner">
          <div v-for="(messageinform,index) in messageinforms" :key="messageinform.index" class="logcard">
            <div class="loguserinfobox">
              <img class="userimag" :src="messageinform.userurl">
              <div class="infoleft">
                <span class="username">{{messageinform.username}}</span>
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
  name: "userhome",
  components:{
    vTop,
    videoPlayer
  },
  data(){
    return{
      book:require("@/assets/img/home_title_book.png"),
      user_change:require("@/assets/img/user_change.png"),
      user_historycat:require("@/assets/img/user_historycat.png"),
      user_camera:require("@/assets/img/user_camera.png"),
      user_dv:require("@/assets/img/user_dv.png"),
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
      messageinforms:[],
      playerOptions:[],
      status: 'pre',
      files: [],
      uploading: false,
      percent: 0,
      arr:{
        userid:0,
        username:"",
        userurl:"",
        datatime:"",
        passage:"",
        photourl:[],
        vdurl:[],
        isphoto:9,
        fqh:1,
        cwid:1,
      },
      //textarea高度自适应
      currentValue: ''
    }
  },
  activated:function(){
    this.clean();
    if(localStorage.getItem("yhid")){ 
        this.user_name=localStorage.getItem("yhm")
        this.getuserinfo()
    }
    else{
        this.gotologin()
    }
  },
  //textarea高度自适应
   watch: {
      currentValue (nv, ov) {
        if (nv === ov) {
          return
        }
        this.currentValue = nv
        console.log('value changed')
        this.changeHeight()
      }
    },
  methods:{
    //textarea高度自适应
     changeHeight () {
        let _this = this
        this.$nextTick(() => {
          var textArea = _this.$refs.test
          var scrollHeight = textArea.scrollHeight // 控件所有的高度，包含滚动的那部分(不可见也会有高度)
          var height = textArea.offsetHeight // 屏幕上显示的高度
          if (height <= scrollHeight) {
            textArea.style.height = 'auto' // 恢复默认值，这个作用就是根据内容自适应textarea高度
            textArea.style.height = textArea.scrollHeight + 'px' // 拿到最新的高度改变textarea的高度
          }
        })
    },
    add(e) {
      this.arr.isphoto=e
      this.$refs.file.click()//调用file的click事件  
      this.status="ready"
    },
    remove(index) {
      this.files.splice(index, 1)
      if(!this.isContain(this.files)){
        this.status="pre"
        this.arr.isphoto=9
      }
    },
    current() {
				var d = new Date(),
				str = '';
				str += d.getFullYear() + '-'; //获取当前年份 
				str += d.getMonth() + 1 + '-'; //获取当前月份（0——11） 
				str += d.getDate() + ' ';
				str += d.getHours() + ':';
				str += d.getMinutes() + ':';
				str += d.getSeconds() + ' ';
				return str;
		},
    submit() {
      console.log(document.getElementById('input1').value)
      if (this.files.length == 0&&document.getElementById('input1').value=="") {
        console.warn('no file!');
        return
      }
      else if (this.files.length != 0) {
        let formData = new FormData()
        //当点击上传按钮时，将会遍历所有选中的文件，并添加到自定义的FormData中
        this.files.forEach((item) => {
          // console.log(item)
          formData.append("file", item.file)
        })
        let headers = {headers: {"Content-Type": "multipart/form-data"}}//设置上传文件格式，为指定传输数据为二进制类型
        axios.post('/useruploadimg',formData,headers)
          .then(res => {
            if(res.status){
              console.log('文件上传成功')
              console.log(res.data)
              var reason = document.getElementById('input1').value;
              this.arr.passage=reason
              this.arr.photourl=res.data
              this.arr.vdurl=res.data
              this.arr.datatime=this.current()
              console.log(this.arr)
              axios.post('http://localhost:8000/addshare?userid='+this.arr.userid+'&username='+this.arr.username+'&userurl='+this.arr.userurl+'&datatime='+this.arr.datatime+'&passage='+this.arr.passage+'&photourl='+this.arr.photourl+'&vdurl='+this.arr.vdurl+'&isphoto='+this.arr.isphoto+'&fqh='+this.arr.fqh+'&cwid='+this.arr.cwid)
              .then((response)=>{
                this.clean()
              }).catch(function (error) { // 请求失败处理
                console.log("---查询出错---！"+error);
              })
            }else{
              console.log('上传失败')
            }
          })
          .catch(err => {
            console.log('上传失败',err)
          })
      }
      else{
        var reason = document.getElementById('input1').value;
        this.arr.passage=reason
        this.arr.datatime=this.current()
        console.log(this.arr)
        axios.post('http://localhost:8000/addshare?userid='+this.arr.userid+'&username='+this.arr.username+'&userurl='+this.arr.userurl+'&datatime='+this.arr.datatime+'&passage='+this.arr.passage+'&photourl='+this.arr.photourl+'&vdurl='+this.arr.vdurl+'&isphoto='+this.arr.isphoto+'&fqh='+this.arr.fqh+'&cwid='+this.arr.cwid)
        .then((response)=>{
          this.clean()
        }).catch(function (error) { // 请求失败处理
          console.log("---查询出错---！"+error);
        })
      }
    },
    clean(){
      this.arr.isphoto=9
      this.files=[]
      this.status="pre"
      document.getElementById("input1").value=""
      document.getElementById("sharepetselect1").value="0"
      document.getElementById("sharefqhselect1").value="0"
    },
    fileChanged() {
      const list = this.$refs.file.files
      for (let i = 0; i < list.length; i++) {
        if (!this.isContain(list[i])) {
          const item = {
            file: list[i]
          }
          this.html5Reader(list[i], item)
          this.files.push(item)
        }
      }
      this.$refs.file.value = ''
    },
    // 将图片文件转成BASE64格式
    html5Reader(file, item){
      const reader = new FileReader()
      reader.onload = (e) => {
        this.$set(item, 'src', e.target.result)
      }
      reader.readAsDataURL(file)
    },
    isContain(file) {
      return this.files.find((item) => item.name === file.name && item.size === file.size)    
    },
    selectFn1(e){
      if(e.target.selectedIndex==0){
        this.arr.cwid=0
      }
      else{
        this.arr.cwid=this.pets[e.target.selectedIndex-1].pet.cwid
      }
    },
    selectFn2(e){
      if(e.target.selectedIndex==0){
        return
      }
      else{
        this.arr.fqh=e.target.selectedIndex
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
    async getmessage(e,t){
      const _this=this
      this.playerOptions=[]
      await axios.post('http://localhost:8000/userstarsharebyyhid?yhid='+e+'&fqh='+t+'&follorstar=0')
      .then(async(response)=>{
        console.log(response)
        this.messageinforms=response.data
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
        console.log(this.playerOptions)
      }).catch(function (error) { // 请求失败处理
        console.log("---查询出错---！"+error);
      })
    },
    getpet(e){
      const _this=this
      axios.post('http://localhost:8000/petinfolistbyyhid?yhid='+e)
      .then((response)=>{
        console.log(response)
        this.pets=response.data
      }).catch(function (error) { // 请求失败处理
        console.log("---查询出错---！"+error);
      })
    },
    getnum(e){
      const _this= this
      axios.post('http://localhost:8000/user/gzfsfx?yhid='+e)
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
      axios.get('http://localhost:8000/user/getUserByNamelog/'+"sywtest")
        .then(async res=>{
          console.log(res.data)
          _this.user_id=res.data.yhid;
          _this.user_name=res.data.yhm;
          _this.user_url=res.data.tx;
          _this.user_qianmin=res.data.gxqm;
          _this.getnum(res.data.yhid);
          _this.getpet(res.data.yhid);
          _this.getmessage(res.data.yhid,0);

          _this.arr.userid=res.data.yhid;
          _this.arr.username=res.data.yhm;
          _this.arr.userurl=res.data.tx;
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
  color: #FBA259;
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
/* //textarea高度自适应 */
 .address-container {
    position: relative;
    display: flex;
    align-items: center;
  }
  .textarea-mine {
    background: #FDF0;
    border-color: #FDF0;
    min-height: 20px;
    padding: 5px;
    width: 700px;
    display: block;
    flex: 1;
    outline: none;
    border: none;
    overflow-y: auto;
    appearance: none;
    text-align: inherit;
  }
/* 右下加上面的textarea////////////////////////////////////////////// */
.bottom_rigthbox{
  margin-left: 22px;
  width: 792px;
  height: 800px;
  overflow:auto
}
.bottom_rigthbox_header{
  width: 792px;
  min-height: 150px;
  background: #FDF0E3;
  display: flex;
  flex-direction: column;
  position: relative;
  display: flex;
    
}
.bottom_rigthbox_header1_txt1{
  width: 700px;
  min-height: 40px;
  margin-top: 15px;
  margin-left: 15px;
  position: relative;
  display: flex;
  flex-direction: column;
}
/* .bottom_rigthbox_header1_txt1_input{
  background: #FDF0;
  border-color: #FDF0;
  width: 700px;
  min-height: 20px;
  display: block;
  flex: 1;
  color: #0c0c0c;
  outline: none;
  border: none;
  overflow-y: auto;
  appearance: none;
  text-align: inherit;
} */
.file-list {
  padding: 3px 0px;
}
.file-list:after {
  content: '';
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
  font-size: 0;
}
.file-list .file-item {
  float: left;
  position: relative;
  width: 200px;
  text-align: center;
}
.file-list .file-item img{
  width: 200px;
  height: 150px;
  object-fit: cover;
  padding-left: 2px;
}
.file-list .file-item .file-remove {
  position: absolute;
  right: 12px;
  display: none;
  top: 4px;
  width: 14px;
  height: 14px;
  color: white;
  cursor: pointer;
  line-height: 12px;
  border-radius: 100%;
  transform: rotate(45deg);
  background: rgba(0, 0, 0, 0.5);
   display: inline;
}
.add {
  width: 100px;
  height: 100px;
  margin-left: 10px;
  float: left;
  text-align: center;
  line-height: 80px;
  border: 1px dashed #ececec;
  font-size: 30px;
  cursor: pointer;
}
.share_input{
  display:none
}
.bottom_rigthbox_header2{
  display: flex;
  flex-direction: row;
  height: 48px;
}
.bottom_rigthbox_header2_txt2{
  margin-left: 15px;
  margin-top: 1px;
  margin-bottom: 20px;
} 
.bottom_rigthbox_header2_select1{
  background: #F7D271;
  border-color: #FDF0;
  border-radius: 10px;
  height: 35px;
}
.bottom_rigthbox_header2_txt3{
  margin-left: 28px;
  margin-top: 1px;
  margin-bottom: 20px;
}
.bottom_rigthbox_header2_select2{
  background: #F7D271;
  border-color: #FDF0;
  border-radius: 10px;
  height: 35px;
  
}
.bottom_rigthbox_header2_img1{
  margin-left: 28px;
  margin-top: 1px;
  width: 40px;
  height: 33px;
  margin-bottom: 20px;
}
.bottom_rigthbox_header2_img2{
  margin-left: 28px;
  margin-top: 1px;
  width: 35px;
  height: 38px;
  margin-bottom: 20px;
}
.bottom_rigthbox_header2_txt4{
  text-align: center;
  margin-left: 260px;
  margin-top: 1px;
  height: 35px;
  width: 50px;
  background: #F7D271;
  border-radius: 10px;
  margin-bottom: 20px;
}

.bottom_rigthboxinner{
  padding-top: 20px;
  width: 792px;
  min-height: 400px;
  margin-top: 20px;
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