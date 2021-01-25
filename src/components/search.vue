<template>
  <div class="building">
    <div class="tab">
      <p class="webtitle">宠物的一生</p>
      <p @click="gotomain" class="webitem1">首页</p>
      <p @click="gotosection" class="webitem2">栏目</p>
      <img :src="imgUrl" class="img">
      <p class="webitem3">扫码小程序</p>
      <div class="circle2img" >
        <img :src="userimg"  class="userimg" >
      </div>
      <p class="webitem6" @click="gotologin">登陆</p>
      <p class="webitem7" @click="gotoregister">注册</p>
    </div>
    <div class="bottom">
      <div class="search" style="display: flex;flex-direction: row;justify-content: center">
        <input v-model="searchcontent" type="text" class="webitem4" ></input>
        <div class="webitem5" style="display: flex;flex-direction: row;justify-content: center" @click="search">
          <p class="text1">搜索</p>
          <img :src="searchicon">
        </div>
      </div>
      <div class="lead" style="display: flex;flex-direction: row;justify-content: center">
        <p @click="gotolan" class="lan">专栏</p>
        <p  class="user">用户</p>
        <img :src="laycat" class="laycat">
      </div>
      <div class="selectedline"></div>
      <div class="line"></div>
      <div class="resnum" style="display: flex;flex-direction: row;justify-content: center">共找到{{count}}位饲养员  |  按粉丝数排序</div>
      <div v-for="user in Sort" :key="id">
        <div>
          <usercomp  @getflag="getflag" :flag="user.flag" :circleurl="user.circleurl" :name="user.username" :num="user.number" :information="user.info" :count="user.count"></usercomp>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usercomp from "./Testcomp/Testcomp"
export default {
  name: "search",
  components: {
    usercomp,
  },
  data() {
    return {
      user: {
        input: '',
        password: '',
      },
      searchcontent:'',
      rules: {
        input: [{required: true, message: '账号不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
      },
      imgUrl:require("@/assets/img/img1.png"),
      userimg:require("@/assets/img/userimg.png"),
      searchicon:require("@/assets/img/searchicon.png"),
      laycat:require("@/assets/img/laycat.png"),
      count:5,
      users:[
        {username:'张三',
          number:132,
          count:10,
          flag:false,
          circleurl:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=757545797,2214471709&fm=11&gp=0.jpg",
          info:"今天天气真好，和主人逛gai~"
        },
        {username:'李四',
          number:412,
          count:8,
          flag:true,
          circleurl:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=757545797,2214471709&fm=11&gp=0.jpg",
          info:"啊今天睡了懒觉真开心"
        },
        {username:'王五',
          number:23,
          count:53,
          flag:true,
          circleurl:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1549131754,2955370505&fm=26&gp=0.jpg",
          info: "昨天下雨了汪汪汪汪汪汪～汪汪汪汪汪汪～汪汪汪汪汪汪～汪汪汪汪汪汪～汪汪汪汪汪汪～汪汪汪汪汪汪～汪汪汪汪汪汪～"
        },
        {username:'赵六',
          number:732,
          count: 946,
          flag:false,
          circleurl:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3562519436,2223863513&fm=26&gp=0.jpg",
          info:"热情随和，活波开朗！"
        },
      ],
    }
  },
  methods:{
    // 接收页面跳转得参数
    getRouterData() {
      // 接收top栏参数  
      console.log(this.$route.params.topsearch)
      //接收home页参数  因为栏用1 2 3 4 标志所以必须和top分开避免相同
      console.log( this.$route.params.homesearch)
    },
    gotoregister(){
      this.$router.push('/register');
    },
    gotologin(){
      this.$router.push('/content');
    },
    gotosection(){
      this.$router.push('/section');
    },
    gotomain(){
      this.$router.push('/main');
    },
    getflag:function(flag,id){
      this.users[id].flag = flag;
      console.log(this.users[id].flag,id);
    },
    getinfo:function (label){
      console.log(label);
      this.section=label;
      alert(this.section);
    },
    gotolan(){
      this.$router.push('/lan');
    },
    search(){

    }
  },
  mounted() {
    this.tmp=this.users;
    console.log(this.tmp);
  },
  created() {
    //this.searchcontent=this.$route.params.searchcontent;
  },
  computed:{
    Sort:function(){
      var temp=this.users;
      return sortKey(temp,'number');
    }
  }
}
function sortKey(array,key){
  return array.sort(function(a,b){
    var x = a[key];
    var y = b[key];
    return ((x<y)?-1:(x>y)?1:0)
  })
}
</script>

<style scoped>
body {
  margin: 0;
}
.building{
  width: 1400px;
  height: 1100px;
}
.tab{
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 1%;
}
.webtitle{
  flex: 0 0 196px;
  flex-shrink: 0;
  margin-right: 35px;
  margin-left: 27px;
  margin-top: 15px;
  width: 196px;
  height: 20px;
  font-size: 36px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #4FA1F4;
  opacity: 0.91;
}
.webitem1{
  flex: 0 0 46px;
  flex-shrink: 0;
  width: 46px;
  height: 23px;
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #030303;
  margin-right: 2%;
  margin-top: 2%;

}
.webitem2{
  flex: 0 0 46px;
  flex-shrink: 0;
  margin-right: 0.7%;
  margin-top:2%;
  width: 43px;
  height: 22px;
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;

}
.img{
  margin-left: 42px;
  margin-top: 19px;
  margin-right: 12px;
  margin-bottom: 13px;
  flex: 0 0 35px;
  width: 35px;
  height: 45px;
}
.webitem3{
  flex: 0 0 116px;
  flex-shrink: 0;
  margin-top: 2%;
  margin-right: 4%;
  width: 116px;
  height: 23px;
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;

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
.webitem4{
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

.webitem6{
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #030303;
  margin-right: 1%;
  margin-left: 0.5%;
  margin-top: 2%;
  position: absolute;
  right: 10%;
}
.webitem7{
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #030303;
  margin-top: 2%;
  position: absolute;
  right: 7%;
}
.circle2img{
  margin-left: 5%;
  background: #f6deca;
  border-radius: 50%;
  width:4.8%;
  height: 4.8%;
}
.search{
  margin-top: 1%;
}
.userimg{
  position: absolute;
  right: 16%;
}
.line{
  width: 768px;
  height: 2px;
  opacity: 0.55;
  background: #000000;
  position: absolute;
  left: 24%;
}
.lan{
  width: 48px;
  height: 23px;
  font-size: 24px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;
  margin-right: 14%;
  margin-left: 6%;
}
.user{
  width: 48px;
  height: 22px;
  font-size: 24px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #66ABF5;
  margin-right:3%;
}
.selectedline{
  width: 101px;
  height: 4px;
  background:  #66ABF5;
  position: absolute;
  left: 51%;
}
.lead{
  padding-top:2% ;
}
.resnum{
  font-size: 18px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #a9a8a8;
  position: absolute;
  left: 25%;
  margin-bottom: 0.5%;
  margin-top: 1%;
}
</style>
