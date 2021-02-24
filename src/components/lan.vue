<template>
  <div class="building1">
    <v-top></v-top>
      <div class="search" style="display: flex;flex-direction: row;justify-content: center">
        <input class="s-search-text" type="text" placeholder="猜你喜欢" id="s-search-text" ref="searchval">
        <div class="webitem5" style="display: flex;flex-direction: row;justify-content: center" @click="search">
          <p class="text1">搜索</p>
          <img :src="searchicon">
        </div>
      </div>
      <div class="lead" style="display: flex;flex-direction: row;justify-content: center">
        <div class="nav-box" >
          <!-- 导航列表 -->
          <li class="nav-item"
              v-for="(item, index) in nav"
              @click="routerLink(index, item.path)"
              :key="index">
            <!-- 判断高亮表 -->
            <p :class=" navIndex === index ? 'item-cn item-cn-active' : 'item-cn'">
              {{ item.title }}
            </p>
          </li>
        </div>
        <img :src="laycat" class="laycat">
      </div>
      <div class="line"></div>
      <div class="btns">
        <div style="display: flex;flex-direction: row;">
          <button @click="mostCollects" class="btngroup1">最多收藏</button>
          <button @click="mostLikes" class="btngroup1">最多喜欢</button>
          <button @click="latestReleased" class="btngroup1">最多关注</button>
        </div>
        <div>
          <button @click="lovelyPets" class="btngroup2">萌宠日常</button>
          <button @click="warmTips" class="btngroup2">喂养贴士</button>
          <button @click="training" class="btngroup2">学习训练</button>
          <button @click="diyClass" class="btngroup2">DIY课堂</button>
        </div>
        <div>
          <button class="btngroup3" @click="dog">狗狗</button>
          <button class="btngroup3" @click="cat">猫咪</button>
          <button class="btngroup3" @click="rabbit">兔子</button>
          <button class="btngroup3" @click="mouse">仓鼠</button>
        </div>
      </div>
    <div class="bottom">
      <div class="box"  >
        <el-card  class="messagecard" v-if="showflag==true&&index<length&&item.show!=false"
                  v-for="(item,index) in messageinform" :key="index">
          <!-- 用户信息 -->
          <el-row >
            <el-col  :span="4" class="userleft">
              <img @click="gotouser(item.username,useridtmp[index],item.userUrl)" class="userurl" :size="100"  :src="item.userUrl"></img>
            </el-col >
            <el-col :span="6" class="userright">
              <el-row>
                <el-col :span="10">
                  <div @click="gotouser(item.username,useridtmp[index],item.userUrl)"      class="username">{{item.username}}</div>
                </el-col>
                <el-col :span="4">
                  <div class="guanzhu">
                    <div  class="guantext" v-on:click="getIndex(item,index)" @click="guanZhu"> {{item.msg}}</div>
                  </div>
                </el-col>
              </el-row>
              <div  class="userdatetime">{{item.datatime}}</div>
            </el-col >
          </el-row>
          <!-- 记录内容 -->
          <div class="messagecont" @click="gotolog(recordid[index])">
            <div  class="textcont">
              <!-- 文字内容 -->
              <div class="messagetext">{{item.passage}}</div>
            </div>
            <el-image  v-for="(photo,photolen) in item.photourl" v-if="photolen<item.photolen" :key="photolen"
                     style="width: 221px; height: 150px;padding:1px"
                     :src="photo"
                     :preview-src-list="item.photourl"
                     fit="cover"/>
            <el-row  class="lovestar" >
              <el-col  :span="10" >
                <div class="txt" style="font-weight:bold" >
                  <img @click="starplus()" v-on:click="getIndex(item,index)" class="p1" src="../assets/img/star.png" alt="">
                  {{item.starnumber}}  {{item.isstar}}
                </div>
              </el-col>
              <el-col  :span="12" >
                <div class="txt" style="font-weight:bold" >
                  <img @click="loveplus()" v-on:click="getIndex(item,index)" class="p1" src="../assets/img/love.png" alt="">
                  {{item.lovenumber}}  {{item.islove}}
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
const axios=require('axios');
import vTop from "@/components/topselect";
export default {
  name: "lan",
  components: {
    vTop
  },
  data() {
    return {
      length:0,
      showflag:false,
      index:0,
      id:null,
      ph:{},
      messageinform:[
          {
            sectionflag:false,
            warmflag:false,
            trainflag:false,
            diyflag:false,
            section:"",
            show:false,
            messagenum:1,
            username:"用户名",
            userUrl:'',
            datatime:"2020-12-26",
            passage:"这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字",
            lovenumber:15,
            islove:"喜欢",
            starnumber:9,
            isstar:"收藏",
            fans:0,
            photourl:[],
            photolen:0,
            flag:true,
            msg:"",
            star:false,
            love:false
          },
        {
          sectionflag:false,
          warmflag:false,
          trainflag:false,
          diyflag:false,
          section:"",
          fans:0,
          show:false,
          messagenum:1,
          username:"用户名",
          userUrl:'',
          datatime:"2020-12-26",
          passage:"这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字",
          lovenumber:15,
          islove:"喜欢",
          starnumber:9,
          isstar:"收藏",
          photourl:[],
          photolen:0,
          flag:true,
          msg:"",
          star:false,
          love:false
        },
        {
          sectionflag:false,
          warmflag:false,
          trainflag:false,
          diyflag:false,
          section:"",
          fans:0,
          show:false,
          messagenum:1,
          username:"用户名",
          userUrl:'',
          datatime:"2020-12-26",
          passage:"这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字",
          lovenumber:15,
          islove:"喜欢",
          starnumber:9,
          isstar:"收藏",
          photourl:[],
          photolen:0,
          flag:true,
          msg:"",
          star:false,
          love:false
        },
        {
          sectionflag:false,
          warmflag:false,
          trainflag:false,
          diyflag:false,
          section:"",
          fans:0,
          show:false,
          messagenum:1,
          username:"用户名",
          userUrl:'',
          datatime:"2020-12-26",
          passage:"这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字",
          lovenumber:15,
          islove:"喜欢",
          starnumber:9,
          isstar:"收藏",
          photourl:[],
          photolen:0,
          flag:true,
          msg:"",
          star:false,
          love:false
        }
      ],
      photourl: [],
      searchcontent:'',
      imgUrl:require("@/assets/img/img1.png"),
      userimg:require("@/assets/img/userimg.png"),
      searchicon:require("@/assets/img/searchicon.png"),
      laycat:require("@/assets/img/laycat.png"),
      num:4,
      recordid:[],
      useridtmp:[],
      nav: [
        {title: '用户',path: '/search'},
        {title: '专栏', path: '/lan'}
      ],
      navIndex: 1
    }
  },
  activated:function(){
      console.log(this.$refs.searchval.value)
      this.search()
  },
  methods:{
    lovelyPets(){
      // 萌宠日常
      //this.search();
      //根据记录搜索相关分区信息
      let searchText = this.$refs.searchval.value
      console.log(searchText)
      if (searchText =='') {
        return
      }
      else {
        this.showflag=true
        axios.post('/targetsearch',
            {
              wz: searchText,
              fqh:1
            })
            .then((res) => {
              console.log(res.data)
              var len=res.data.shareinfo.length
              if(len>this.length){
                this.length=3
              }else{
                this.length=len
              }
              if (res.status == 200) {
                //this.$emit用于向父组件传值
                // console.log(res.data);
                for (let i=0; i<len; i++){
                  this.useridtmp[i]=res.data.shareinfo[i].yhid;
                  this.recordid[i]=res.data.shareinfo[i].jlid;
                  let tmp=this.recordid[i];
                  const _this = this
                  axios.get('http://localhost:8000/getShareByjlid',{
                    params:{
                      jlid:tmp
                    }
                  })
                      .then(res => {
                    _this.messageinform[i].show=true
                    _this.messageinform[i].messagenum=res.data.jlid
                    _this.messageinform[i].username=res.data.yhm
                    _this.messageinform[i].datatime=res.data.fbsj
                    _this.messageinform[i].passage=res.data.wz
                    axios.post('http://localhost:8000/follow?zyhid='+_this.useridtmp[i]).then((response)=>{
                      if(response){
                        var data=response.data;
                        this.messageinform[i].fans=data
                      }
                    }).catch(function (error) { // 请求失败处理
                      console.log("---查询出错---！"+error);
                    })
                        axios.post('/getSection',{
                          jlid:tmp
                        }).then(res=>{
                          console.log("sec:"+res.data.Section)
                          this.messageinform[i].section=res.data.Section;
                          if(this.messageinform[i].section!="1"&&this.messageinform[i].section!=1)
                          {
                            this.messageinform[i].show=false;
                          }
                          else {
                            console.log("index:"+i);
                            console.log("this.messageinform[i].section:"+this.messageinform[i].section)
                            this.messageinform[i].show=true;
                          }
                        }).catch(err=>{
                          console.log("section err")
                          console.log(err)
                        })

                        axios.get('http://localhost:8000/user/getUserByNamelog/'+ _this.messageinform[i].username)
                        .then(r=>{
                          _this.messageinform[i].userUrl=r.data.tx;
                        }).catch(err => {
                      console.log('错误！！！！：'+err)
                    })
                    axios.get('http://localhost:8000/getPhotoByjlid',{
                      params:{
                        jlid:tmp
                      }
                    })
                        .then(res => {
                      _this.ph=res.data
                      var j=0
                      for(j=0;j<_this.ph.length;j++){
                        _this.messageinform[i].photourl[j]=_this.ph[j].zp
                      }
                          _this.messageinform[i].photolen=_this.ph.length
                          console.log("photolen:"+ _this.messageinform[i].photolen)
                      axios.post('http://localhost:8000/likecount?jlid='+tmp)
                          .then(res=>{
                        //console.log(res.data)
                        _this.messageinform[i].lovenumber=res.data;
                      })
                      axios.post('http://localhost:8000/starcount?jlid='+tmp)
                          .then(res=>{
                        //console.log(res.data)
                        _this.messageinform[i].starnumber=res.data;
                      })
                      axios.get('http://localhost:8000/isfollow',{//查成功
                        params:{
                          zyhid:localStorage.getItem('yhid'),
                          fsid:tmp
                        }
                      })
                          .then(res => {
                        // console.log(res.data)
                        if(res.data=="wu"){
                          this.messageinform[i].flag=false;
                          this.messageinform[i].msg="+关注"
                        }
                        else if(res.data=="1"){
                          this.messageinform[i].flag=false;
                          this.messageinform[i].msg="+关注"
                        }
                        else{
                          this.messageinform[i].flag=true;
                          this.messageinform[i].msg="已关注"
                        }
                      })
                    })
                  })
                      .catch(err => {
                        console.log('错误：'+err)
                      })

                }
              }

            })
      }
      // this.$forceUpdate();
      //console.log(this.messageinform.sort(this.compare('section')));
    },
    warmTips(){
      // 喂养贴士
      let searchText = this.$refs.searchval.value
      console.log(searchText)
      if (searchText =='') {
        return
      }
      else {
        this.showflag=true
        axios.post('/targetsearch',
            {
              wz: searchText,
              fqh:2
            })
            .then((res) => {
              console.log(res.data)
              var len=res.data.shareinfo.length
              if(len>this.length){
                this.length=3
              }else{
                this.length=len
              }
              if (res.status == 200) {
                //this.$emit用于向父组件传值
                // console.log(res.data);
                for (let i=0; i<len; i++){
                  this.useridtmp[i]=res.data.shareinfo[i].yhid;
                  this.recordid[i]=res.data.shareinfo[i].jlid;
                  let tmp=this.recordid[i];
                  const _this = this
                  axios.get('http://localhost:8000/getShareByjlid',{
                    params:{
                      jlid:tmp
                    }
                  })
                      .then(res => {
                        _this.messageinform[i].show=true
                        _this.messageinform[i].messagenum=res.data.jlid
                        _this.messageinform[i].username=res.data.yhm
                        _this.messageinform[i].datatime=res.data.fbsj
                        _this.messageinform[i].passage=res.data.wz
                        axios.post('http://localhost:8000/follow?zyhid='+_this.useridtmp[i]).then((response)=>{
                          if(response){
                            var data=response.data;
                            this.messageinform[i].fans=data
                          }
                        }).catch(function (error) { // 请求失败处理
                          console.log("---查询出错---！"+error);
                        })
                        axios.post('/getSection',{
                          jlid:tmp
                        }).then(res=>{
                          console.log("sec:"+res.data.Section)
                          this.messageinform[i].section=res.data.Section;
                          if(this.messageinform[i].section!="2"&&this.messageinform[i].section!=2)
                          {
                            this.messageinform[i].show=false;
                          }
                          else {
                            console.log("index:"+i);
                            console.log("this.messageinform[i].section:"+this.messageinform[i].section)
                            this.messageinform[i].show=true;
                          }
                        }).catch(err=>{
                          console.log("section err")
                          console.log(err)
                        })

                        axios.get('http://localhost:8000/user/getUserByNamelog/'+ _this.messageinform[i].username)
                            .then(r=>{
                              _this.messageinform[i].userUrl=r.data.tx;
                            }).catch(err => {
                          console.log('错误！！！！：'+err)
                        })
                        axios.get('http://localhost:8000/getPhotoByjlid',{
                          params:{
                            jlid:tmp
                          }
                        })
                            .then(res => {
                              _this.ph=res.data
                              var j=0
                              _this.messageinform[i].photolen=_this.ph.length
                              console.log("photolen:"+ _this.messageinform[i].photolen)
                              for(j=0;j<_this.ph.length;j++){
                                _this.messageinform[i].photourl[j]=_this.ph[j].zp
                              }
                              axios.post('http://localhost:8000/likecount?jlid='+tmp)
                                  .then(res=>{
                                    //console.log(res.data)
                                    _this.messageinform[i].lovenumber=res.data;
                                  })
                              axios.post('http://localhost:8000/starcount?jlid='+tmp)
                                  .then(res=>{
                                    //console.log(res.data)
                                    _this.messageinform[i].starnumber=res.data;
                                  })
                              axios.get('http://localhost:8000/isfollow',{//查成功
                                params:{
                                  zyhid:localStorage.getItem('yhid'),
                                  fsid:tmp
                                }
                              })
                                  .then(res => {
                                    // console.log(res.data)
                                    if(res.data=="wu"){
                                      this.messageinform[i].flag=false;
                                      this.messageinform[i].msg="+关注"
                                    }
                                    else if(res.data=="1"){
                                      this.messageinform[i].flag=false;
                                      this.messageinform[i].msg="+关注"
                                    }
                                    else{
                                      this.messageinform[i].flag=true;
                                      this.messageinform[i].msg="已关注"
                                    }
                                  })
                            })
                      })
                      .catch(err => {
                        console.log('错误：'+err)
                      })

                }
              }

            })
      }
    },
    training(){
      // 学习训练
      let searchText = this.$refs.searchval.value
      console.log(searchText)
      if (searchText =='') {
        return
      }
      else {
        this.showflag=true
        axios.post('/targetsearch',
            {
              wz: searchText,
              fqh:3
            })
            .then((res) => {
              console.log(res.data)
              var len=res.data.shareinfo.length
              if(len>this.length){
                this.length=3
              }else{
                this.length=len
              }
              if (res.status == 200) {
                //this.$emit用于向父组件传值
                // console.log(res.data);
                for (let i=0; i<len; i++){
                  this.useridtmp[i]=res.data.shareinfo[i].yhid;
                  this.recordid[i]=res.data.shareinfo[i].jlid;
                  let tmp=this.recordid[i];
                  const _this = this
                  axios.get('http://localhost:8000/getShareByjlid',{
                    params:{
                      jlid:tmp
                    }
                  })
                      .then(res => {
                        _this.messageinform[i].show=true
                        _this.messageinform[i].messagenum=res.data.jlid
                        _this.messageinform[i].username=res.data.yhm
                        _this.messageinform[i].datatime=res.data.fbsj
                        _this.messageinform[i].passage=res.data.wz
                        axios.post('http://localhost:8000/follow?zyhid='+_this.useridtmp[i]).then((response)=>{
                          if(response){
                            var data=response.data;
                            this.messageinform[i].fans=data
                          }
                        }).catch(function (error) { // 请求失败处理
                          console.log("---查询出错---！"+error);
                        })
                        axios.post('/getSection',{
                          jlid:tmp
                        }).then(res=>{
                          console.log("sec:"+res.data.Section)
                          this.messageinform[i].section=res.data.Section;
                          if(this.messageinform[i].section!="3"&&this.messageinform[i].section!=3)
                          {
                            this.messageinform[i].show=false;
                          }
                          else {
                            console.log("index:"+i);
                            console.log("this.messageinform[i].section:"+this.messageinform[i].section)
                            this.messageinform[i].show=true;
                          }
                        }).catch(err=>{
                          console.log("section err")
                          console.log(err)
                        })

                        axios.get('http://localhost:8000/user/getUserByNamelog/'+ _this.messageinform[i].username)
                            .then(r=>{
                              _this.messageinform[i].userUrl=r.data.tx;
                            }).catch(err => {
                          console.log('错误！！！！：'+err)
                        })
                        axios.get('http://localhost:8000/getPhotoByjlid',{
                          params:{
                            jlid:tmp
                          }
                        })
                            .then(res => {
                              _this.ph=res.data
                              _this.messageinform[i].photolen=_this.ph.length
                              console.log("photolen:"+ _this.messageinform[i].photolen)
                              var j=0
                              for(j=0;j<_this.ph.length;j++){
                                _this.messageinform[i].photourl[j]=_this.ph[j].zp
                              }
                              axios.post('http://localhost:8000/likecount?jlid='+tmp)
                                  .then(res=>{
                                    //console.log(res.data)
                                    _this.messageinform[i].lovenumber=res.data;
                                  })
                              axios.post('http://localhost:8000/starcount?jlid='+tmp)
                                  .then(res=>{
                                    //console.log(res.data)
                                    _this.messageinform[i].starnumber=res.data;
                                  })
                              axios.get('http://localhost:8000/isfollow',{//查成功
                                params:{
                                  zyhid:localStorage.getItem('yhid'),
                                  fsid:tmp
                                }
                              })
                                  .then(res => {
                                    // console.log(res.data)
                                    if(res.data=="wu"){
                                      this.messageinform[i].flag=false;
                                      this.messageinform[i].msg="+关注"
                                    }
                                    else if(res.data=="1"){
                                      this.messageinform[i].flag=false;
                                      this.messageinform[i].msg="+关注"
                                    }
                                    else{
                                      this.messageinform[i].flag=true;
                                      this.messageinform[i].msg="已关注"
                                    }
                                  })
                            })
                      })
                      .catch(err => {
                        console.log('错误：'+err)
                      })

                }
              }

            })
      }
      // this.$forceUpdate();
    },
    diyClass(){
      // diy课堂
      let searchText = this.$refs.searchval.value
      console.log(searchText)
      if (searchText =='') {
        return
      }
      else {
        this.showflag=true
        axios.post('/targetsearch',
            {
              wz: searchText,
              fqh:4
            })
            .then((res) => {
              console.log(res.data)
              var len=res.data.shareinfo.length
              if(len>this.length){
                this.length=3
              }else{
                this.length=len
              }
              if (res.status == 200) {
                //this.$emit用于向父组件传值
                // console.log(res.data);
                for (let i=0; i<len; i++){
                  this.useridtmp[i]=res.data.shareinfo[i].yhid;
                  this.recordid[i]=res.data.shareinfo[i].jlid;
                  let tmp=this.recordid[i];
                  const _this = this
                  axios.get('http://localhost:8000/getShareByjlid',{
                    params:{
                      jlid:tmp
                    }
                  })
                      .then(res => {
                        _this.messageinform[i].show=true
                        _this.messageinform[i].messagenum=res.data.jlid
                        _this.messageinform[i].username=res.data.yhm
                        _this.messageinform[i].datatime=res.data.fbsj
                        _this.messageinform[i].passage=res.data.wz
                        axios.post('http://localhost:8000/follow?zyhid='+_this.useridtmp[i]).then((response)=>{
                          if(response){
                            var data=response.data;
                            this.messageinform[i].fans=data
                          }
                        }).catch(function (error) { // 请求失败处理
                          console.log("---查询出错---！"+error);
                        })
                        axios.post('/getSection',{
                          jlid:tmp
                        }).then(res=>{
                          console.log("sec:"+res.data.Section)
                          this.messageinform[i].section=res.data.Section;
                          if(this.messageinform[i].section!="4"&&this.messageinform[i].section!=4)
                          {
                            this.messageinform[i].show=false;
                          }
                          else {
                            console.log("index:"+i);
                            console.log("this.messageinform[i].section:"+this.messageinform[i].section)
                            this.messageinform[i].show=true;
                          }
                        }).catch(err=>{
                          console.log("section err")
                          console.log(err)
                        })

                        axios.get('http://localhost:8000/user/getUserByNamelog/'+ _this.messageinform[i].username)
                            .then(r=>{
                              _this.messageinform[i].userUrl=r.data.tx;
                            }).catch(err => {
                          console.log('错误！！！！：'+err)
                        })
                        axios.get('http://localhost:8000/getPhotoByjlid',{
                          params:{
                            jlid:tmp
                          }
                        })
                            .then(res => {
                              _this.ph=res.data
                              _this.messageinform[i].photolen=_this.ph.length
                              console.log("photolen:"+ _this.messageinform[i].photolen)
                              var j=0
                              for(j=0;j<_this.ph.length;j++){
                                _this.messageinform[i].photourl[j]=_this.ph[j].zp
                              }
                              axios.post('http://localhost:8000/likecount?jlid='+tmp)
                                  .then(res=>{
                                    //console.log(res.data)
                                    _this.messageinform[i].lovenumber=res.data;
                                  })
                              axios.post('http://localhost:8000/starcount?jlid='+tmp)
                                  .then(res=>{
                                    //console.log(res.data)
                                    _this.messageinform[i].starnumber=res.data;
                                  })
                              axios.get('http://localhost:8000/isfollow',{//查成功
                                params:{
                                  zyhid:localStorage.getItem('yhid'),
                                  fsid:tmp
                                }
                              })
                                  .then(res => {
                                    // console.log(res.data)
                                    if(res.data=="wu"){
                                      this.messageinform[i].flag=false;
                                      this.messageinform[i].msg="+关注"
                                    }
                                    else if(res.data=="1"){
                                      this.messageinform[i].flag=false;
                                      this.messageinform[i].msg="+关注"
                                    }
                                    else{
                                      this.messageinform[i].flag=true;
                                      this.messageinform[i].msg="已关注"
                                    }
                                  })
                            })
                      })
                      .catch(err => {
                        console.log('错误：'+err)
                      })

                }
              }

            })
      }
      // this.$forceUpdate();
    },
    dog(){
      let searchText = this.$refs.searchval.value
      console.log(searchText)
      if (searchText =='') {
        return
      }
      else {
        this.showflag=true
        axios.post('/animalsearch',
            {
              wz: searchText,
              zl:"狗狗"
            })
            .then((res) => {
              console.log(res.data)
              var len=res.data.shareinfo.length
              if(len>this.length){
                this.length=3
              }else{
                this.length=len
              }
              if (res.status == 200) {
                //this.$emit用于向父组件传值
                // console.log(res.data);
                for (let i=0; i<len; i++){
                  this.useridtmp[i]=res.data.shareinfo[i].yhid;
                  this.recordid[i]=res.data.shareinfo[i].jlid;
                  let tmp=this.recordid[i];
                  const _this = this
                  axios.get('http://localhost:8000/getShareByjlid',{
                    params:{
                      jlid:tmp
                    }
                  })
                      .then(res => {
                        _this.messageinform[i].show=true
                        _this.messageinform[i].messagenum=res.data.jlid
                        _this.messageinform[i].username=res.data.yhm
                        _this.messageinform[i].datatime=res.data.fbsj
                        _this.messageinform[i].passage=res.data.wz
                        axios.post('http://localhost:8000/follow?zyhid='+_this.useridtmp[i]).then((response)=>{
                          if(response){
                            var data=response.data;
                            this.messageinform[i].fans=data
                          }
                        }).catch(function (error) { // 请求失败处理
                          console.log("---查询出错---！"+error);
                        })
                        axios.get('http://localhost:8000/user/getUserByNamelog/'+ _this.messageinform[i].username)
                            .then(r=>{
                              _this.messageinform[i].userUrl=r.data.tx;
                            }).catch(err => {
                          console.log('错误！！！！：'+err)
                        })
                        axios.get('http://localhost:8000/getPhotoByjlid',{
                          params:{
                            jlid:tmp
                          }
                        })
                            .then(res => {
                              _this.ph=res.data
                              var j=0
                              for(j=0;j<_this.ph.length;j++){
                                _this.messageinform[i].photourl[j]=_this.ph[j].zp
                              }
                              _this.messageinform[i].photolen=_this.ph.length
                              console.log("photolen:"+ _this.messageinform[i].photolen)
                              axios.post('http://localhost:8000/likecount?jlid='+tmp)
                                  .then(res=>{
                                    //console.log(res.data)
                                    _this.messageinform[i].lovenumber=res.data;
                                  })
                              axios.post('http://localhost:8000/starcount?jlid='+tmp)
                                  .then(res=>{
                                    //console.log(res.data)
                                    _this.messageinform[i].starnumber=res.data;
                                  })
                              axios.get('http://localhost:8000/isfollow',{//查成功
                                params:{
                                  zyhid:localStorage.getItem('yhid'),
                                  fsid:tmp
                                }
                              })
                                  .then(res => {
                                    // console.log(res.data)
                                    if(res.data=="wu"){
                                      this.messageinform[i].flag=false;
                                      this.messageinform[i].msg="+关注"
                                    }
                                    else if(res.data=="1"){
                                      this.messageinform[i].flag=false;
                                      this.messageinform[i].msg="+关注"
                                    }
                                    else{
                                      this.messageinform[i].flag=true;
                                      this.messageinform[i].msg="已关注"
                                    }
                                  })
                            })
                      })
                      .catch(err => {
                        console.log('错误：'+err)
                      })

                }
              }

            })
      }
    },
    cat(){
      let searchText = this.$refs.searchval.value
      console.log(searchText)
      if (searchText =='') {
        return
      }
      else {
        this.showflag=true
        axios.post('/animalsearch',
            {
              wz: searchText,
              zl:"猫咪"
            })
            .then((res) => {
              console.log(res.data)
              var len=res.data.shareinfo.length
              if(len>this.length){
                this.length=3
              }else{
                this.length=len
              }
              if (res.status == 200) {
                //this.$emit用于向父组件传值
                // console.log(res.data);
                for (let i=0; i<len; i++){
                  this.useridtmp[i]=res.data.shareinfo[i].yhid;
                  this.recordid[i]=res.data.shareinfo[i].jlid;
                  let tmp=this.recordid[i];
                  const _this = this
                  axios.get('http://localhost:8000/getShareByjlid',{
                    params:{
                      jlid:tmp
                    }
                  })
                      .then(res => {
                        _this.messageinform[i].show=true
                        _this.messageinform[i].messagenum=res.data.jlid
                        _this.messageinform[i].username=res.data.yhm
                        _this.messageinform[i].datatime=res.data.fbsj
                        _this.messageinform[i].passage=res.data.wz
                        axios.post('http://localhost:8000/follow?zyhid='+_this.useridtmp[i]).then((response)=>{
                          if(response){
                            var data=response.data;
                            this.messageinform[i].fans=data
                          }
                        }).catch(function (error) { // 请求失败处理
                          console.log("---查询出错---！"+error);
                        })
                        axios.get('http://localhost:8000/user/getUserByNamelog/'+ _this.messageinform[i].username)
                            .then(r=>{
                              _this.messageinform[i].userUrl=r.data.tx;
                            }).catch(err => {
                          console.log('错误！！！！：'+err)
                        })
                        axios.get('http://localhost:8000/getPhotoByjlid',{
                          params:{
                            jlid:tmp
                          }
                        })
                            .then(res => {
                              _this.ph=res.data
                              var j=0
                              for(j=0;j<_this.ph.length;j++){
                                _this.messageinform[i].photourl[j]=_this.ph[j].zp
                              }
                              _this.messageinform[i].photolen=_this.ph.length
                              console.log("photolen:"+ _this.messageinform[i].photolen)
                              axios.post('http://localhost:8000/likecount?jlid='+tmp)
                                  .then(res=>{
                                    //console.log(res.data)
                                    _this.messageinform[i].lovenumber=res.data;
                                  })
                              axios.post('http://localhost:8000/starcount?jlid='+tmp)
                                  .then(res=>{
                                    //console.log(res.data)
                                    _this.messageinform[i].starnumber=res.data;
                                  })
                              axios.get('http://localhost:8000/isfollow',{//查成功
                                params:{
                                  zyhid:localStorage.getItem('yhid'),
                                  fsid:tmp
                                }
                              })
                                  .then(res => {
                                    // console.log(res.data)
                                    if(res.data=="wu"){
                                      this.messageinform[i].flag=false;
                                      this.messageinform[i].msg="+关注"
                                    }
                                    else if(res.data=="1"){
                                      this.messageinform[i].flag=false;
                                      this.messageinform[i].msg="+关注"
                                    }
                                    else{
                                      this.messageinform[i].flag=true;
                                      this.messageinform[i].msg="已关注"
                                    }
                                  })
                            })
                      })
                      .catch(err => {
                        console.log('错误：'+err)
                      })

                }
              }

            })
      }
    },
    rabbit(){
      let searchText = this.$refs.searchval.value
      console.log(searchText)
      if (searchText =='') {
        return
      }
      else {
        this.showflag=true
        axios.post('/animalsearch',
            {
              wz: searchText,
              zl:"兔子"
            })
            .then((res) => {
              console.log(res.data)
              var len=res.data.shareinfo.length
              if(len>this.length){
                this.length=3
              }else{
                this.length=len
              }
              if (res.status == 200) {
                //this.$emit用于向父组件传值
                // console.log(res.data);
                for (let i=0; i<len; i++){
                  this.useridtmp[i]=res.data.shareinfo[i].yhid;
                  this.recordid[i]=res.data.shareinfo[i].jlid;
                  let tmp=this.recordid[i];
                  const _this = this
                  axios.get('http://localhost:8000/getShareByjlid',{
                    params:{
                      jlid:tmp
                    }
                  })
                      .then(res => {
                        _this.messageinform[i].show=true
                        _this.messageinform[i].messagenum=res.data.jlid
                        _this.messageinform[i].username=res.data.yhm
                        _this.messageinform[i].datatime=res.data.fbsj
                        _this.messageinform[i].passage=res.data.wz
                        axios.post('http://localhost:8000/follow?zyhid='+_this.useridtmp[i]).then((response)=>{
                          if(response){
                            var data=response.data;
                            this.messageinform[i].fans=data
                          }
                        }).catch(function (error) { // 请求失败处理
                          console.log("---查询出错---！"+error);
                        })
                        axios.get('http://localhost:8000/user/getUserByNamelog/'+ _this.messageinform[i].username)
                            .then(r=>{
                              _this.messageinform[i].userUrl=r.data.tx;
                            }).catch(err => {
                          console.log('错误！！！！：'+err)
                        })
                        axios.get('http://localhost:8000/getPhotoByjlid',{
                          params:{
                            jlid:tmp
                          }
                        })
                            .then(res => {
                              _this.ph=res.data
                              var j=0
                              for(j=0;j<_this.ph.length;j++){
                                _this.messageinform[i].photourl[j]=_this.ph[j].zp
                              }
                              _this.messageinform[i].photolen=_this.ph.length
                              console.log("photolen:"+ _this.messageinform[i].photolen)
                              axios.post('http://localhost:8000/likecount?jlid='+tmp)
                                  .then(res=>{
                                    //console.log(res.data)
                                    _this.messageinform[i].lovenumber=res.data;
                                  })
                              axios.post('http://localhost:8000/starcount?jlid='+tmp)
                                  .then(res=>{
                                    //console.log(res.data)
                                    _this.messageinform[i].starnumber=res.data;
                                  })
                              axios.get('http://localhost:8000/isfollow',{//查成功
                                params:{
                                  zyhid:localStorage.getItem('yhid'),
                                  fsid:tmp
                                }
                              })
                                  .then(res => {
                                    // console.log(res.data)
                                    if(res.data=="wu"){
                                      this.messageinform[i].flag=false;
                                      this.messageinform[i].msg="+关注"
                                    }
                                    else if(res.data=="1"){
                                      this.messageinform[i].flag=false;
                                      this.messageinform[i].msg="+关注"
                                    }
                                    else{
                                      this.messageinform[i].flag=true;
                                      this.messageinform[i].msg="已关注"
                                    }
                                  })
                            })
                      })
                      .catch(err => {
                        console.log('错误：'+err)
                      })

                }
              }

            })
      }
    },
    mouse(){
      let searchText = this.$refs.searchval.value
      console.log(searchText)
      if (searchText =='') {
        return
      }
      else {
        this.showflag=true
        axios.post('/animalsearch',
            {
              wz: searchText,
              zl:"仓鼠"
            })
            .then((res) => {
              console.log(res.data)
              var len=res.data.shareinfo.length
              if(len>this.length){
                this.length=3
              }else{
                this.length=len
              }
              if (res.status == 200) {
                //this.$emit用于向父组件传值
                // console.log(res.data);
                for (let i=0; i<len; i++){
                  this.useridtmp[i]=res.data.shareinfo[i].yhid;
                  this.recordid[i]=res.data.shareinfo[i].jlid;
                  let tmp=this.recordid[i];
                  const _this = this
                  axios.get('http://localhost:8000/getShareByjlid',{
                    params:{
                      jlid:tmp
                    }
                  })
                      .then(res => {
                        _this.messageinform[i].show=true
                        _this.messageinform[i].messagenum=res.data.jlid
                        _this.messageinform[i].username=res.data.yhm
                        _this.messageinform[i].datatime=res.data.fbsj
                        _this.messageinform[i].passage=res.data.wz
                        axios.post('http://localhost:8000/follow?zyhid='+_this.useridtmp[i]).then((response)=>{
                          if(response){
                            var data=response.data;
                            this.messageinform[i].fans=data
                          }
                        }).catch(function (error) { // 请求失败处理
                          console.log("---查询出错---！"+error);
                        })
                        axios.get('http://localhost:8000/user/getUserByNamelog/'+ _this.messageinform[i].username)
                            .then(r=>{
                              _this.messageinform[i].userUrl=r.data.tx;
                            }).catch(err => {
                          console.log('错误！！！！：'+err)
                        })
                        axios.get('http://localhost:8000/getPhotoByjlid',{
                          params:{
                            jlid:tmp
                          }
                        })
                            .then(res => {
                              _this.ph=res.data
                              var j=0
                              for(j=0;j<_this.ph.length;j++){
                                _this.messageinform[i].photourl[j]=_this.ph[j].zp
                              }
                              _this.messageinform[i].photolen=_this.ph.length
                              console.log("photolen:"+ _this.messageinform[i].photolen)
                              axios.post('http://localhost:8000/likecount?jlid='+tmp)
                                  .then(res=>{
                                    //console.log(res.data)
                                    _this.messageinform[i].lovenumber=res.data;
                                  })
                              axios.post('http://localhost:8000/starcount?jlid='+tmp)
                                  .then(res=>{
                                    //console.log(res.data)
                                    _this.messageinform[i].starnumber=res.data;
                                  })
                              axios.get('http://localhost:8000/isfollow',{//查成功
                                params:{
                                  zyhid:localStorage.getItem('yhid'),
                                  fsid:tmp
                                }
                              })
                                  .then(res => {
                                    // console.log(res.data)
                                    if(res.data=="wu"){
                                      this.messageinform[i].flag=false;
                                      this.messageinform[i].msg="+关注"
                                    }
                                    else if(res.data=="1"){
                                      this.messageinform[i].flag=false;
                                      this.messageinform[i].msg="+关注"
                                    }
                                    else{
                                      this.messageinform[i].flag=true;
                                      this.messageinform[i].msg="已关注"
                                    }
                                  })
                            })
                      })
                      .catch(err => {
                        console.log('错误：'+err)
                      })

                }
              }

            })
      }
    },
    compare(property){
      return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
  }
},
    mostCollects(){
      //最多收藏
      {
        //模糊查找记录名&用户名与查询内容相关的
        let searchText = this.$refs.searchval.value
        console.log(searchText)
        if (searchText =='') {
          return
        }
        else {
          this.showflag=true
          axios.post('http://localhost:8000/sharesearch',
              {
                wz: searchText,
                //zyhid:localStorage.getItem("yhid")
              })
              .then((res) => {
                var len=res.data.shareinfo.length
                if(len>this.length){
                  this.length=3
                }else{
                  this.length=len
                }
                if (res.status == 200) {
                  //this.$emit用于向父组件传值
                  // console.log(res.data);
                  for (let i=0; i<len; i++){
                    this.useridtmp[i]=res.data.shareinfo[i].yhid;
                    this.recordid[i]=res.data.shareinfo[i].jlid;
                    let tmp=this.recordid[i];
                    const _this = this
                    axios.get('http://localhost:8000/getShareByjlid',{
                      params:{
                        jlid:tmp
                      }
                    }).then(res => {
                      // console.log(res.data)
                      // var config={
                      //   messagenum:res.data.jlid,
                      //   username:res.data.yhm,
                      //   datatime:res.data.fbsj,
                      //   passage:res.data.wz
                      // }
                      // _this.messageinform[i].push(config)
                      _this.messageinform[i].show=true
                      _this.messageinform[i].messagenum=res.data.jlid
                      _this.messageinform[i].username=res.data.yhm
                      _this.messageinform[i].datatime=res.data.fbsj
                      _this.messageinform[i].passage=res.data.wz
                      axios.post('http://localhost:8000/follow?zyhid='+_this.useridtmp[i]).then((response)=>{
                        // console.log("fans")
                        // console.log(response)
                        if(response){
                          var data=response.data;
                          this.messageinform[i].fans=data
                        }
                      }).catch(function (error) { // 请求失败处理
                        console.log("---查询出错---！"+error);
                      })

                      axios.get('http://localhost:8000/user/getUserByNamelog/'+ _this.messageinform[i].username)
                          .then(r=>{
                            _this.messageinform[i].userUrl=r.data.tx;
                          }).catch(err => {
                        console.log('错误！！！！：'+err)
                      })
                      axios.get('http://localhost:8000/getPhotoByjlid',{
                        params:{
                          jlid:tmp
                        }
                      }).then(res => {
                        _this.ph=res.data
                        _this.messageinform[i].photolen=_this.ph.length
                        var j=0
                        for(j=0;j<_this.ph.length;j++){
                          _this.messageinform[i].photourl[j]=_this.ph[j].zp
                        }
                        axios.post('http://localhost:8000/likecount?jlid='+tmp).then(res=>{
                          //console.log(res.data)
                          _this.messageinform[i].lovenumber=res.data;
                        })
                        axios.post('http://localhost:8000/starcount?jlid='+tmp).then(res=>{
                          //console.log(res.data)
                          _this.messageinform[i].starnumber=res.data;
                          console.log(this.messageinform.sort(this.compare('starnumber')))
                        })
                        axios.get('http://localhost:8000/isfollow',{//查成功
                          params:{
                            zyhid:localStorage.getItem('yhid'),
                            fsid:tmp
                          }
                        }).then(res => {
                          // console.log(res.data)
                          if(res.data=="wu"){
                            this.messageinform[i].flag=false;
                            this.messageinform[i].msg="+关注"
                          }
                          else if(res.data=="1"){
                            this.messageinform[i].flag=false;
                            this.messageinform[i].msg="+关注"
                          }
                          else{
                            this.messageinform[i].flag=true;
                            this.messageinform[i].msg="已关注"
                          }
                        })
                            .catch(err => {
                              console.log('查错误：'+err)
                            })
                      })
                          .catch(err => {
                            console.log('错误！！！！：'+err)
                          })
                    })
                        .catch(err => {
                          console.log('错误：'+err)
                        })
                    // console.log("看这里！！！！！：")
                  }
                }
              })
              .catch((err) => {
                console.log(err)
              })
          for(let i=0;i<this.length;i++){
            axios.post('/getSection',{
              jlid:this.recordid[i]
            }).then(res=>{
              console.log("sec："+res.data.Section)
              this.messageinform[i].section=res.data.Section;
            }).catch(err=>{
              console.log("section err")
              console.log(err)
            })
          }
          // this.$forceUpdate()
        }
      }
    },
    mostLikes(){
      //最多喜欢
      {
        //模糊查找记录名&用户名与查询内容相关的
        let searchText = this.$refs.searchval.value
        console.log(searchText)
        if (searchText =='') {
          return
        }
        else {
          this.showflag=true
          axios.post('http://localhost:8000/sharesearch',
              {
                wz: searchText,
                //zyhid:localStorage.getItem("yhid")
              })
              .then((res) => {
                var len=res.data.shareinfo.length
                if(len>this.length){
                  this.length=3
                }else{
                  this.length=len
                }
                if (res.status == 200) {
                  //this.$emit用于向父组件传值
                  // console.log(res.data);
                  for (let i=0; i<len; i++){
                    this.useridtmp[i]=res.data.shareinfo[i].yhid;
                    this.recordid[i]=res.data.shareinfo[i].jlid;
                    let tmp=this.recordid[i];
                    const _this = this
                    axios.get('http://localhost:8000/getShareByjlid',{
                      params:{
                        jlid:tmp
                      }
                    }).then(res => {
                      // console.log(res.data)
                      // var config={
                      //   messagenum:res.data.jlid,
                      //   username:res.data.yhm,
                      //   datatime:res.data.fbsj,
                      //   passage:res.data.wz
                      // }
                      // _this.messageinform[i].push(config)
                      _this.messageinform[i].show=true
                      _this.messageinform[i].messagenum=res.data.jlid
                      _this.messageinform[i].username=res.data.yhm
                      _this.messageinform[i].datatime=res.data.fbsj
                      _this.messageinform[i].passage=res.data.wz
                      axios.post('http://localhost:8000/follow?zyhid='+_this.useridtmp[i]).then((response)=>{
                        // console.log("fans")
                        // console.log(response)
                        if(response){
                          var data=response.data;
                          this.messageinform[i].fans=data
                        }
                      }).catch(function (error) { // 请求失败处理
                        console.log("---查询出错---！"+error);
                      })

                      axios.get('http://localhost:8000/user/getUserByNamelog/'+ _this.messageinform[i].username)
                          .then(r=>{
                            _this.messageinform[i].userUrl=r.data.tx;
                          }).catch(err => {
                        console.log('错误！！！！：'+err)
                      })
                      axios.get('http://localhost:8000/getPhotoByjlid',{
                        params:{
                          jlid:tmp
                        }
                      }).then(res => {
                        _this.ph=res.data
                        _this.messageinform[i].photolen=_this.ph.length
                        var j=0
                        for(j=0;j<_this.ph.length;j++){
                          _this.messageinform[i].photourl[j]=_this.ph[j].zp
                        }
                        axios.post('http://localhost:8000/likecount?jlid='+tmp).then(res=>{
                          //console.log(res.data)
                          _this.messageinform[i].lovenumber=res.data;
                          console.log(this.messageinform.sort(this.compare('lovenumber')))

                        })
                        axios.post('http://localhost:8000/starcount?jlid='+tmp).then(res=>{
                          //console.log(res.data)
                          _this.messageinform[i].starnumber=res.data;
                        })
                        axios.get('http://localhost:8000/isfollow',{//查成功
                          params:{
                            zyhid:localStorage.getItem('yhid'),
                            fsid:tmp
                          }
                        }).then(res => {
                          // console.log(res.data)
                          if(res.data=="wu"){
                            this.messageinform[i].flag=false;
                            this.messageinform[i].msg="+关注"
                          }
                          else if(res.data=="1"){
                            this.messageinform[i].flag=false;
                            this.messageinform[i].msg="+关注"
                          }
                          else{
                            this.messageinform[i].flag=true;
                            this.messageinform[i].msg="已关注"
                          }

                        })
                            .catch(err => {
                              console.log('查错误：'+err)
                            })
                      })
                          .catch(err => {
                            console.log('错误！！！！：'+err)
                          })
                    })
                        .catch(err => {
                          console.log('错误：'+err)
                        })
                    // console.log("看这里！！！！！：")

                  }
                }
              })
              .catch((err) => {
                console.log(err)
              })
          for(let i=0;i<this.length;i++){
            axios.post('/getSection',{
              jlid:this.recordid[i]
            }).then(res=>{
              console.log("sec："+res.data.Section)
              this.messageinform[i].section=res.data.Section;
            }).catch(err=>{
              console.log("section err")
              console.log(err)
            })
          }
          // this.$forceUpdate()
        }
      }
    },
    latestReleased(){
      //最多关注
      {
        //模糊查找记录名&用户名与查询内容相关的
        let searchText = this.$refs.searchval.value
        console.log(searchText)
        if (searchText =='') {
          return
        }
        else {
          this.showflag=true
          axios.post('http://localhost:8000/sharesearch',
              {
                wz: searchText,
                //zyhid:localStorage.getItem("yhid")
              })
              .then((res) => {
                var len=res.data.shareinfo.length
                if(len>this.length){
                  this.length=3
                }else{
                  this.length=len
                }
                if (res.status == 200) {
                  //this.$emit用于向父组件传值
                  // console.log(res.data);
                  for (let i=0; i<len; i++){
                    this.useridtmp[i]=res.data.shareinfo[i].yhid;
                    this.recordid[i]=res.data.shareinfo[i].jlid;
                    let tmp=this.recordid[i];
                    const _this = this
                    axios.get('http://localhost:8000/getShareByjlid',{
                      params:{
                        jlid:tmp
                      }
                    }).then(res => {
                      // console.log(res.data)
                      // var config={
                      //   messagenum:res.data.jlid,
                      //   username:res.data.yhm,
                      //   datatime:res.data.fbsj,
                      //   passage:res.data.wz
                      // }
                      // _this.messageinform[i].push(config)
                      _this.messageinform[i].show=true
                      _this.messageinform[i].messagenum=res.data.jlid
                      _this.messageinform[i].username=res.data.yhm
                      _this.messageinform[i].datatime=res.data.fbsj
                      _this.messageinform[i].passage=res.data.wz
                      axios.post('http://localhost:8000/follow?zyhid='+_this.useridtmp[i]).then((response)=>{
                        // console.log("fans")
                        // console.log(response)
                        if(response){
                          var data=response.data;
                          this.messageinform[i].fans=data
                          console.log(this.messageinform.sort(this.compare('fans')))

                        }
                      }).catch(function (error) { // 请求失败处理
                        console.log("---查询出错---！"+error);
                      })

                      axios.get('http://localhost:8000/user/getUserByNamelog/'+ _this.messageinform[i].username)
                          .then(r=>{
                            _this.messageinform[i].userUrl=r.data.tx;
                          }).catch(err => {
                        console.log('错误！！！！：'+err)
                      })
                      axios.get('http://localhost:8000/getPhotoByjlid',{
                        params:{
                          jlid:tmp
                        }
                      }).then(res => {
                        _this.ph=res.data
                        _this.messageinform[i].photolen=_this.ph.length
                        var j=0
                        for(j=0;j<_this.ph.length;j++){
                          _this.messageinform[i].photourl[j]=_this.ph[j].zp
                        }
                        axios.post('http://localhost:8000/likecount?jlid='+tmp).then(res=>{
                          //console.log(res.data)
                          _this.messageinform[i].lovenumber=res.data;
                        })
                        axios.post('http://localhost:8000/starcount?jlid='+tmp).then(res=>{
                          //console.log(res.data)
                          _this.messageinform[i].starnumber=res.data;
                        })
                        axios.get('http://localhost:8000/isfollow',{//查成功
                          params:{
                            zyhid:localStorage.getItem('yhid'),
                            fsid:tmp
                          }
                        }).then(res => {
                          // console.log(res.data)
                          if(res.data=="wu"){
                            this.messageinform[i].flag=false;
                            this.messageinform[i].msg="+关注"
                          }
                          else if(res.data=="1"){
                            this.messageinform[i].flag=false;
                            this.messageinform[i].msg="+关注"
                          }
                          else{
                            this.messageinform[i].flag=true;
                            this.messageinform[i].msg="已关注"
                          }

                        })
                            .catch(err => {
                              console.log('查错误：'+err)
                            })
                      })
                          .catch(err => {
                            console.log('错误！！！！：'+err)
                          })
                    })
                        .catch(err => {
                          console.log('错误：'+err)
                        })
                    // console.log("看这里！！！！！：")
                  }
                }
              })
              .catch((err) => {
                console.log(err)
              })
          for(let i=0;i<this.length;i++){
            axios.post('/getSection',{
              jlid:this.recordid[i]
            }).then(res=>{
              console.log("sec："+res.data.Section)
              this.messageinform[i].section=res.data.Section;
            }).catch(err=>{
              console.log("section err")
              console.log(err)
            })
          }
          // this.$forceUpdate()
        }
      }
    },
    search () {
      //模糊查找记录名&用户名与查询内容相关的
      let searchText = this.$refs.searchval.value
      console.log(searchText)
      if (searchText =='') {
        return
      }
      else {
        this.showflag=true
        axios.post('http://localhost:8000/sharesearch',
            {
              wz: searchText,
              //zyhid:localStorage.getItem("yhid")
            })
            .then((res) => {
              var len=res.data.shareinfo.length
              if(len>this.length){
                this.length=3
              }else{
                this.length=len
              }
              if (res.status == 200) {
                //this.$emit用于向父组件传值
                // console.log(res.data);
                for (let i=0; i<len; i++){
                  this.useridtmp[i]=res.data.shareinfo[i].yhid;
                  this.recordid[i]=res.data.shareinfo[i].jlid;
                  let tmp=this.recordid[i];
                  const _this = this
                  axios.get('http://localhost:8000/getShareByjlid',{
                      params:{
                        jlid:tmp
                      }
                    }).then(res => {
                    // console.log(res.data)
                    // var config={
                    //   messagenum:res.data.jlid,
                    //   username:res.data.yhm,
                    //   datatime:res.data.fbsj,
                    //   passage:res.data.wz
                    // }
                    // _this.messageinform[i].push(config)
                    _this.messageinform[i].show=true
                    _this.messageinform[i].messagenum=res.data.jlid
                    _this.messageinform[i].username=res.data.yhm
                    _this.messageinform[i].datatime=res.data.fbsj
                    _this.messageinform[i].passage=res.data.wz
                    axios.post('http://localhost:8000/follow?zyhid='+_this.useridtmp[i]).then((response)=>{
                      // console.log("fans")
                      // console.log(response)
                      if(response){
                        var data=response.data;
                        this.messageinform[i].fans=data
                      }
                    }).catch(function (error) { // 请求失败处理
                      console.log("---查询出错---！"+error);
                    })

                    axios.get('http://localhost:8000/user/getUserByNamelog/'+ _this.messageinform[i].username)
                        .then(r=>{
                          _this.messageinform[i].userUrl=r.data.tx;
                        }).catch(err => {
                      console.log('错误！！！！：'+err)
                    })
                    axios.get('http://localhost:8000/getPhotoByjlid',{
                      params:{
                        jlid:tmp
                      }
                    }).then(res => {
                      _this.ph=res.data
                      _this.messageinform[i].photolen=_this.ph.length
                      var j=0
                      for(j=0;j<_this.ph.length;j++){
                        _this.messageinform[i].photourl[j]=_this.ph[j].zp
                      }
                      axios.post('http://localhost:8000/likecount?jlid='+tmp).then(res=>{
                        //console.log(res.data)
                       _this.messageinform[i].lovenumber=res.data;
                      })
                      axios.post('http://localhost:8000/starcount?jlid='+tmp).then(res=>{
                        //console.log(res.data)
                        _this.messageinform[i].starnumber=res.data;
                      })
                      axios.get('http://localhost:8000/isfollow',{//查成功
                        params:{
                          zyhid:localStorage.getItem('yhid'),
                          fsid:tmp
                        }
                      }).then(res => {
                        // console.log(res.data)
                        if(res.data=="wu"){
                          this.messageinform[i].flag=false;
                          this.messageinform[i].msg="+关注"
                        }
                        else if(res.data=="1"){
                          this.messageinform[i].flag=false;
                          this.messageinform[i].msg="+关注"
                        }
                        else{
                          this.messageinform[i].flag=true;
                          this.messageinform[i].msg="已关注"
                        }
                      })
                          .catch(err => {
                            console.log('查错误：'+err)
                          })
                    })
                        .catch(err => {
                          console.log('错误！！！！：'+err)
                        })
                    })
                        .catch(err => {
                          console.log('错误：'+err)
                        })
                  // console.log("看这里！！！！！：")
                }
              }
            })
            .catch((err) => {
              console.log(err)
            })
        for(let i=0;i<this.length;i++){
          axios.post('/getSection',{
            jlid:this.recordid[i]
          }).then(res=>{
            console.log("sec："+res.data.Section)
            this.messageinform[i].section=res.data.Section;
          }).catch(err=>{
            console.log("section err")
            console.log(err)
          })
        }
        // this.$forceUpdate()
      }
    },
    //查找记录并展示
    getJlData(e) {
      const _this = this
      axios.get('http://localhost:8000/getShareByjlid',{
        params:{
          jlid:1
        }
      }).then(res => {
        console.log(res.data)
        _this.messageinform.messagenum=res.data.jlid
        _this.messageinform.username=res.data.yhm
        // _this.messageinform.userUrl
        _this.messageinform.datatime=res.data.fbsj
        _this.messageinform.passage=res.data.wz
        // _this.messageinform.lovenumber
        // _this.messageinform.islove
        // _this.messageinform.starnumber
        // _this.messageinform.isstar
      })
          .catch(err => {
            console.log('错误：'+err)
          })
      axios.get('http://localhost:8000/getPhotoByjlid',{
        params:{
          jlid:1
        }
      }).then(res => {
        console.log(res.data)
        _this.ph=res.data
        // console.log(_this.ph[0].zp)
        // console.log(_this.ph[1].zp)
        var i=0
        for(i=0;i<_this.ph.length;i++){
          // console.log(_this.ph[i].zp)
          _this.photourl[i]=_this.ph[i].zp
          console.log(_this.photourl[i])
        }
        // console.log(_this.photourl)

      })
          .catch(err => {
            console.log('错误：'+err)
          })

    },
    getIndex(item,index){
      console.log(index)
      this.index=index;
      //这里的item是点击获取当前值的每一项内容
      //这里的index是点击获取当前值的下标
    },
    guanZhu(index) {
      console.log("------------")
      if(localStorage.getItem("yhid")){
        axios.get('http://localhost:8000/isfollow',{//查成功
          params:{
            zyhid:localStorage.getItem("yhid"),
            fsid:this.useridtmp[this.index],
          }
        }).then(res => {
          console.log(res.data)
          if(res.data=="wu"){
            axios.get('http://localhost:8000/addfollow',{
              params:{
                zyhid:localStorage.getItem("yhid"),
                fsid:this.useridtmp[this.index],
                qxgz:0
              }
            }).then(res => {
              console.log(res.data)
              if(res.data=="success"){
                this.messageinform[this.index].flag=false;
                this.messageinform[this.index].msg="已关注"
              }
            })
                .catch(err => {
                  console.log('首关注环节错误：'+err)//
                })
          }
          else if(res.data=="1"){
            axios.get('http://localhost:8000/upfollow',{
              params:{
                zyhid:localStorage.getItem("yhid"),
                fsid:this.useridtmp[this.index],
                qxgz:0
              }
            }).then(res => {
              console.log(res.data)
              if(res.data=="success"){
                this.messageinform[this.index].flag=false;
                this.messageinform[this.index].msg="已关注"
              }
            })
                .catch(err => {
                  console.log('再关注环节错误：'+err)//
                })
          }
          else{
            axios.get('http://localhost:8000/upfollow',{
              params:{
                zyhid:localStorage.getItem("yhid"),
                fsid:this.useridtmp[this.index],
                qxgz:1
              }
            }).then(res => {
              console.log(res.data)
              if(res.data=="success"){
                this.messageinform[this.index].flag=true;
                this.messageinform[this.index].msg="+关注"
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
            jlid:this.recordid[this.index]
          }
        }).then(res => {
          console.log(res.data)
          if(res.data=="wu"){
            axios.get('http://localhost:8000/addlike',{
              params:{
                yhid:localStorage.getItem("yhid"),
                jlid:this.recordid[this.index]
              }
            }).then(res => {
              console.log(res.data)
              if(res.data=="success"){
                this.messageinform[this.index].love=false;
                this.messageinform[this.index].islove="已喜欢"
                this.messageinform[this.index].lovenumber++
              }
            })
                .catch(err => {
                  console.log('首关注环节错误：'+err)//
                })
          }
          else if(res.data=="1"){
            axios.get('http://localhost:8000/uplike',{
              params:{
                yhid:localStorage.getItem("yhid"),
                jlid:this.recordid[this.index],
                sc:0
              }
            }).then(res => {
              console.log(res.data)
              if(res.data=="success"){
                this.messageinform[this.index].love=false;
                this.messageinform[this.index].islove="已喜欢"
                this.messageinform[this.index].lovenumber++
              }
            })
                .catch(err => {
                  console.log('再关注环节错误：'+err)//
                })
          }
          else{
            axios.get('http://localhost:8000/uplike',{
              params:{
                yhid:localStorage.getItem("yhid"),
                jlid:this.recordid[this.index],
                sc:1
              }
            }).then(res => {
              console.log(res.data)
              if(res.data=="success"){
                this.messageinform[this.index].love=true;
                this.messageinform[this.index].islove="喜欢"
                this.messageinform[this.index].lovenumber--
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
    starplus(index) {
      if(localStorage.getItem("yhid")){
        axios.get('http://localhost:8000/isstar', {
          params:{
            yhid:localStorage.getItem("yhid"),
            jlid:this.recordid[this.index]
          }
        }).then(res => {
          console.log(res.data)
          if(res.data=="wu"){
            axios.get('http://localhost:8000/addstar',{
              params:{
                yhid:localStorage.getItem("yhid"),
                jlid:this.recordid[this.index]
              }
            }).then(res => {
              console.log(res.data)
              if(res.data=="success"){
                this.messageinform[this.index].star=false;
                this.messageinform[this.index].isstar="已收藏"
                this.messageinform[this.index].starnumber++
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
                jlid:this.recordid[this.index],
                sc:0
              }
            }).then(res => {
              console.log(res.data)
              if(res.data=="success"){
                this.messageinform[this.index].star=false;
                this.messageinform[this.index].isstar="已收藏"
                this.messageinform[this.index].starnumber++
              }
            })
                .catch(err => {
                  console.log('再关注环节错误：'+err)//
                })
          }
          else{
            axios.get('http://localhost:8000/upstar',{
              params:{
                yhid:localStorage.getItem("yhid"),
                jlid:this.recordid[this.index],
                sc:1
              }
            }).then(res => {
              console.log(res.data)
              if(res.data=="success"){
                this.messageinform[this.index].star=true;
                this.messageinform[this.index].isstar="收藏"
                this.messageinform[this.index].starnumber--
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
    // 接收页面跳转得参数
    getRouterData() {
      // 接收top栏参数
      console.log(this.$route.params.topsearch)
      //接收home页参数  因为栏用1 2 3 4 标志所以必须和top分开避免相同
      console.log( this.$route.params.homesearch)
    },
    /**
     * 路由跳转
     * @param index
     * @param link
     */
    routerLink(index, path) {
      // 点击哪个路由就赋值给自定义的下下标
      this.navIndex = index;
      // 路由跳转
      this.$router.push(path)
      this.showflag=false;
      this.$refs.searchval.value=""
      this.length=0
    },
    /**
     * 检索当前路径
     * @param path
     */
    checkRouterLocal(path) {
      // 查找当前路由下标高亮
      this.navIndex = this.nav.findIndex(item => item.path === path);
    },
    gotolog(e){
      const _this=this
      axios.get('/ishavephoto',{
        params:{
          jlid:e
        }
      }).then(res => { //照片
        console.log(res.data)
        if(res.data=="you"){
          this.$router.push({
            name: 'Petlog',
            params: {
              jlid: e,
            }
          })
        }
        else{//视频
          this.$router.push({
            name: 'Petlog2',
            params: {
              jlid: e,
            }
          })
        }
      }).catch(err => {
        console.log('错误！！！！：'+err)
      })
    },
    gotouser(e,i,t){
      this.$router.push({
        name: 'otheruser',
        params: {
          yhm: e,
          yhid:i,
          tx:t
        }
      })
    }
  },
  mounted:function(){
    // console.log(this.$route.params.jlid)
    //this.getJlData(this.$route.params.jlid)
  },
  watch: {
    "$route"() {
      // 获取当前路径
      let path = this.$route.path;
      // 检索当前路径
      this.checkRouterLocal(path);
    }
  }
}
</script>
<style>
.userurl{

}
</style>
<style scoped>
body {
  margin: 0;
}


.building1{
  width: 1440px;
  height: 1300px;
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
  margin-top: 10%;
  margin-left: 5%;
}
.s-search-text{
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
  width: 86px;
  height: 41px;
  background: #F4F4F4;
  margin-top: 1.5%;
}
.search{
  margin-top: 1%;
}
.line{
  width: 768px;
  height: 2px;
  opacity: 0.55;
  background: #000000;
  position: absolute;
  left: 24%;
}
.lead{
  padding-top:2% ;
}

.nav-box {
  display: flex;
}

.nav-item {
  text-align: center;
  padding: 0 32px;
  position: relative;
  display: inline-block;
  font-size: 14px;
  line-height: 25px;
}

/*导航普通状态*/
.item-cn {
  color: #1c2438;
  font-weight: 800;
  width: 50px;
  height: 23px;
  font-size: 24px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;

}


/*导航高亮*/
.item-cn-active {
  color: #2d8cf0;
  width: 50px;
  height: 23px;
  font-size: 24px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;

}

.nav-item:hover .item-cn {
  color: #2d8cf0;
}
.nav-item:after {
  position: absolute;
  right: 0;
  top: 20px;
  content: '';
  width: 1px;
  height: 16px;
  background-color: #f8f8f8;
}
.nav-item:after:last-child {
  width: 0;
}
.btngroup1{
  width: 112px;
  height: 31px;
  border-radius: 10px;
  margin-bottom: 2px;
  font-size: 22px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;
  margin-right: 2%;
}
.btngroup2{
  width: 112px;
  height: 31px;
  border-radius: 10px;
  margin-bottom: 2px;
  font-size: 22px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;
  margin-right: 2%;
}
.btngroup3{
  width: 112px;
  height: 31px;
  border-radius: 10px;
  font-size: 22px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;
  margin-right: 2%;
  margin-bottom: 2px;
}
.btns{
  margin-left:24% ;
  margin-top: 0.6%;
}

.box{
  margin-top: 2%;
}
.messagecard{
  margin-left: 20%;
  width: 900px;
  min-height: 320px;
  background: #FDF0E3;
}
.userright{
  margin-top:30px;
}
.userurl{
  margin-top: 5px;
  margin-left: 5px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.username{
  width: 75px;
  height: 22px;
  font-size: 24px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;
  padding-bottom: 10px;
}
.userdatetime{
  width: 150px;
  height: 14px;
  font-size: 24px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;
}
.guanzhu{
  height: 24px;
  width: 65px;
  border-radius: 10%;
  background: #facc9e;
}
.guantext{
  width: 80px;
  height: 22px;
  font-size: 18px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;
  padding: 3px;
  padding-left: 10px;
}
.messagecont{
  margin-left: 140px;
  margin-right: 30px;
}
.messagetext{
  font-size: 24px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;
}
.lovestar{
  margin-left: 300px;
}
.p1{
  width:25px;
  height: 25px;
}
.txt{
  width: 300px;
  height: 24px;
  font-size: 24px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #7F7C79;
  line-height: 1px;
}
</style>
