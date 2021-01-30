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
          <button class="btngroup1">综合排序</button>
          <button class="btngroup1">最多点击</button>
          <button class="btngroup1">最新发布</button>
        </div>
        <div>
          <button class="btngroup2">萌宠日常</button>
          <button class="btngroup2">喂养贴士</button>
          <button class="btngroup2">学习训练</button>
          <button class="btngroup2">DIY课堂</button>
        </div>
        <div>
          <button class="btngroup3">狗狗</button>
          <button class="btngroup3">猫咪</button>
          <button class="btngroup3">兔子</button>
          <button class="btngroup3">仓鼠</button>
        </div>
      </div>

    <div class="bottom">
      <div class="box"  >
        <div>{{this.$route.params.jlid}}</div>
        <el-card  class="messagecard" v-for="(item,index) in messageinform" :key="index">
          <!-- 用户信息 -->
          <el-row  >
            <el-col :span="4" class="userleft">
              <el-avatar class="userurl" :size="100"  :src="item.userUrl"></el-avatar>
            </el-col >
            <el-col :span="6" class="userright">
              <el-row>
                <el-col :span="10">
                  <div class="username">{{item.username}}</div>
                </el-col>
                <el-col :span="4">
                  <div class="guanzhu" @click="guanzhu()">
                    <div  class="guantext"> +关注</div>
                  </div>
                </el-col>
              </el-row>
              <div  class="userdatetime">{{item.datatime}}</div>
            </el-col >
          </el-row>
          <!-- 记录内容 -->
          <div class="messagecont">
            <div  class="textcont">
              <!-- 文字内容 -->
              <div class="messagetext">{{item.passage}}</div>
            </div>
            <el-image  v-for="(photo) in photourl" :key="photo.key"
                     style="width: 221px; height: 150px;padding:1px"
                     :src="photo"
                     :preview-src-list="photourl"
                     fit="cover"/>
            <el-row  class="lovestar" >
              <el-col  :span="10" >
                <div class="txt" style="font-weight:bold" >
                  <img @click="starplus()" class="p1" src="../assets/img/star.png" alt="">
                  {{item.starnumber}}  {{item.isstar}}
                </div>
              </el-col>
              <el-col  :span="12" >
                <div class="txt" style="font-weight:bold" >
                  <img @click="loveplus()" class="p1" src="../assets/img/love.png" alt="">
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
      id:null,
      ph:{},
      messageinform:[
          {
      },{},{},{}
      ],
      photourl: [
      ],
      //////
      user: {
        input: '',
        password: '',
      },
      searchcontent:'',
      imgUrl:require("@/assets/img/img1.png"),
      userimg:require("@/assets/img/userimg.png"),
      searchicon:require("@/assets/img/searchicon.png"),
      laycat:require("@/assets/img/laycat.png"),
      num:4,
      //users表示后端返回的模糊查询的四个用户信息，包括用户名、粉丝数、动态数、最近一条动态和最近三张照片
      users:[
        {username:'张三',
          num:132,
          count:10,
          flag:true,
          circleurl:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=757545797,2214471709&fm=11&gp=0.jpg",
          info:"今天天气真好，和主人逛gai~",
          photo:[],
        },
        {username:'李四',
          num:412,
          count:8,
          flag:true,
          circleurl:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=757545797,2214471709&fm=11&gp=0.jpg",
          info:"啊今天睡了懒觉真开心",
          photo:[]
        },
        {username:'王五',
          num:23,
          count:53,
          flag:true,
          circleurl:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1549131754,2955370505&fm=26&gp=0.jpg",
          info: "昨天下雨了汪汪汪汪汪汪～汪汪汪汪汪汪～汪汪汪汪汪汪～汪汪汪汪汪汪～汪汪汪汪汪汪～汪汪汪汪汪汪～汪汪汪汪汪汪～",
          photo: []
        },
        {username:'赵六',
          num:732,
          count: 946,
          flag:true,
          circleurl:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3562519436,2223863513&fm=26&gp=0.jpg",
          info:"热情随和，活波开朗！",
          photo: []
        },
      ],
      recordid:[],
      useridtmp:[],
      nav: [
        {title: '用户',path: '/search'},
        {title: '专栏', path: '/lan'}
      ],
      navIndex: 1
    }
  },
  methods:{
    search () {
      //模糊查找记录名&用户名与查询内容相关的
      let searchText = this.$refs.searchval.value
      console.log(searchText)
      if (searchText =='') {
        return
      } else {
        axios.post('http://localhost:8000/sharesearch',
            {
              wz: searchText,
              //zyhid:localStorage.getItem("yhid")
            })
            .then((res) => {
              var len=res.data.shareinfo.length
              if (res.status == 200) {
                //this.$emit用于向父组件传值
                console.log("res.data:"+res.data);
                for (let i=0; i<(len>3?3:len); i++){
                  this.recordid[i]=res.data.shareinfo[i].jlid;
                  let tmp=this.recordid[i];
                  const _this = this
                  axios.get('http://localhost:8000/getShareByjlid',{
                      params:{
                        jlid:tmp
                      }
                    }).then(res => {
                    console.log(res.data)
                    _this.messageinform[i].messagenum=res.data.jlid
                    _this.messageinform[i].username=res.data.yhm
                    _this.messageinform[i].datatime=res.data.fbsj
                    _this.messageinform[i].passage=res.data.wz
                    })
                        .catch(err => {
                          console.log('错误：'+err)
                        })
                    axios.get('http://localhost:8000/getPhotoByjlid',{
                      params:{
                        jlid:tmp
                      }
                    }).then(res => {
                      _this.ph=res.data
                      var j=0
                      for(j=0;j<_this.ph.length;j++){
                        _this.photourl[j]=_this.ph[j].zp
                        // console.log(_this.photourl[j])
                      }
                    })
                        .catch(err => {
                          console.log('错误：'+err)
                        })
                  console.log("看这里！！！！！：")
                  console.log(this.messageinform)
                  ///////////////
                  // axios.get('http://localhost:8000/isfollow',{//查成功
                  //   params:{
                  //     zyhid:localStorage.getItem('yhid'),
                  //     fsid:tmp
                  //   }
                  // }).then(res => {
                  //   console.log(res.data)
                  //   if(res.data=="wu"){
                  //     this.users[i].flag=false;
                  //   }
                  //   else if(res.data=="1"){
                  //     this.users[i].flag=false;
                  //   }
                  //   else{
                  //     this.users[i].flag=true;
                  //   }
                  // })
                  //     .catch(err => {
                  //       console.log('查错误：'+err)
                  //     })
                  ///////////////
                  // axios.post('http://localhost:8000/share?yhid='+tmp).then((response)=>{
                  //   console.log(response)
                  //   if(response){
                  //     var data=response.data;
                  //     this.users[i].count=data
                  //   }
                  //   else{
                  //     alert('查询失败，请重试！')
                  //   }
                  //   axios.post('http://localhost:8000/follow?zyhid='+tmp).then((response)=>{
                  //     console.log(response)
                  //     if(response){
                  //       var data=response.data;
                  //       this.users[i].num=data
                  //     }
                  //     else{
                  //       alert('查询失败，请重试！')
                  //     }
                  //   }).catch(function (error) { // 请求失败处理
                  //     console.log("---查询出错---！"+error);
                  //   })
                  // }).catch(function (error) { // 请求失败处理
                  //   console.log("---查询出错---！"+error);
                  // })

                }
              }
            })
            .catch((err) => {
              console.log(err)
            })
        this.$forceUpdate()
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
    guanzhu() {
      console.log(this)
      // 这里要改数据库关注
      // 如果没登录跳转到登录页面
    },
    loveplus() {
      if(
          this.messageinform.islove=="已喜欢"){
        this.messageinform.lovenumber--;
        this.messageinform.islove="喜欢"
      }
      else{
        this.messageinform.lovenumber++;
        this.messageinform.islove="已喜欢"
      }
      // 这里还要改数据库点赞数增加
      // 如果没登录跳转到登录页面
    },
    starplus() {
      if(this.messageinform.isstar=="已收藏"){
        this.messageinform.starnumber--;
        this.messageinform.isstar="收藏"
      }
      else{
        this.messageinform.starnumber++;
        this.messageinform.isstar="已收藏"
      }
      // 这里还要改数据库点赞数增加
      // 如果没登录跳转到登录页面
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
    },
    /**
     * 检索当前路径
     * @param path
     */
    checkRouterLocal(path) {
      // 查找当前路由下标高亮
      this.navIndex = this.nav.findIndex(item => item.path === path);
    }
  },
  mounted:function(){
    console.log(this.$route.params.jlid)
    this.getJlData(this.$route.params.jlid)
  },
  watch: {
    "$route"() {
      // 获取当前路径
      let path = this.$route.path;
      // 检索当前路径
      this.checkRouterLocal(path);
    }
  },
  computed:{
    Sort:function(){
      var temp=this.users;
      return temp
      //return sortKey(temp,'num');
    }
  }
}
</script>

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
  width: 50px;
  background: #fab990;
  border-radius: 10%;
}
.guantext{
  width: 80px;
  height: 22px;
  font-size: 18px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;
  padding: 3px
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
