// 头部选择栏组件
<template>
    <div class="tab">
      <img :src="topUrl" class="toplogo">
      <p @click="top_goto('home')" class="webitem1">首页</p>
      <p @click="top_goto('pethome')" class="webitem15">流浪之家💕</p>
      <p @click="top_goto('knowledgecard')" class="webitem15">宠物识别🔍</p>
      <p @click="top_goto('hospital')" class="webitem15">医疗资源💊</p>
      <img :src="imgUrl" class="img">
      <p class="webitem3">扫码小程序</p>
      <input type="text" class="webitem4" ref="topsearchval" id="topinput"></input>
      <div class="webitem5" @click="top_gotosearch">
        <p  class="text1">搜索</p>
      </div>
      <img :src="userimg" @click="top_gotouser()" class="userimg" >
      <p v-if="islogin==0" class="webitem6" @click="top_goto('content')">登陆</p>
      <p  v-if="islogin==0" class="webitem7" @click="top_goto('petregister')">注册</p>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
const axios=require('axios');
export default {
  name:'v-top',
  data() {
    return {
      topUrl:require("@/assets/img/toplogo.png"),
      imgUrl:require("@/assets/img/img1.png"),
      userimg:require("@/assets/img/userimg.png"),
      islogin:0,
    }
  },
  activated:function(){
    if(localStorage.getItem("yhm")){
      this.islogin=1
      axios.get('http://localhost:8000/user/getUserByNamelog/'+JSON.parse(localStorage.getItem('yhm')))
        .then(res=>{
          console.log("头像："+res.data)
          this.userimg=res.data.tx
        }).catch(err => {
          console.log('错误！！！！：'+err)
      })
    }
  },
  methods: {
    top_gotouser(){
      if(localStorage.getItem('yhid')){
        this.$router.push('/userhistory');
      }
      else{
        this.$router.push('/content');
      }
    },
    top_goto(e){
      this.$router.push('/'+e);
    },
    top_gotosearch(){
      var e=document.getElementById("topinput");
      console.log(e.value);
      this.$router.push({
        name: 'Search',
        path:"/search",
        params: {
          topsearch: e.value,
        }
            })
      this.$refs.topsearchval.value="";

    },
  }
}
</script>

<style scope>
.tab{
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 5px;
  background-color: white;
}
.toplogo{
  margin-right: 1%;
  margin-left: 27px;
  margin-top: 15px;
  width: 146px;
  height: 38px;
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
  margin-right: 1%;
  margin-top: 1.75%;

}
.webitem15{
  flex: 0 0 125px;
  flex-shrink: 0;
  margin-right: 1%;
  margin-top:1.75%;
  width: 125px;
  height: 22px;
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;

}
.webitem2{
  flex: 0 0 46px;
  flex-shrink: 0;
  margin-right: 1%;
  margin-top:2%;
  width: 43px;
  height: 22px;
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;

}
.img{
  margin-top: 19px;
  margin-bottom: 13px;
  flex: 0 0 35px;
  width: 35px;
  height: 45px;
}
.webitem3{
  flex: 0 0 116px;
  flex-shrink: 0;
  margin-top: 2%;
  margin-right: 1%;
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
  margin-top: 15%;
  margin-left: 10%;
}
.webitem4{
  flex: 0 0 300px;
  flex-shrink: 0;
  margin-top: 1.5%;
  width: 300px;
  height: 41px;
  background: #B6B6B6;
  opacity: 0.1;
  box-sizing: border-box;

}
.webitem5{
  width: 61px;
  height: 41px;
  background: #F5EEEE;
  margin-top: 1.5%;
  margin-right: 1.5%;

}
.userimg{
  width:75px;
  height: 75px;
  margin-right: 1%;
  border-radius: 50%;
}
.webitem6{
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #030303;
  margin-right: 1%;
  margin-top: 2%;
}
.webitem7{
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #030303;
  margin-top: 2%;
}

</style>

