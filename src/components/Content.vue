
<template xmlns:overflow="http://www.w3.org/1999/xhtml">

  <div class="building">
    <div class="tab">
      <p class="webtitle">宠物的一生</p>
      <p @click="gotomain" class="webitem1">首页</p>
      <p @click="gotosection" class="webitem2">栏目</p>
      <img :src="imgUrl" class="img">
      <p class="webitem3">扫码小程序</p>
      <input type="text" class="webitem4"></input>
      <div class="webitem5" @click="search">
        <p class="text1">搜索</p>
      </div>
      <div class="circle2img" >
        <img :src="userimg"  class="userimg" >
      </div>
      <p class="webitem6" @click="gotologin">登陆</p>
      <p class="webitem7" @click="gotoregister">注册</p>
    </div>

    <div class="bottom">
      <div class="circle" >
        <img :src="gifUrl" class="gif" >
      </div>
      <div style="display:flex;flex-direction:column;" ref="user" class="box">
        <div class="itemlabel1">
          <el-input placeholder="用户" class="elinput__innerTransparent" type="text" v-model="user.input"
                    clearable></el-input>
        </div>
        <div class="itemlabel2">
          <el-input placeholder="密码" type="password" v-model="user.password"
                    show-password clearable></el-input>
        </div>
        <div>
          <el-button class="btn1" @click="submitForm(user)">提交</el-button>
          <el-button class="btn2" @click="gotoregister">注册</el-button>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import { mapMutations } from 'vuex';
const axios=require('axios');
export default {
  data() {
    return {
      user: {
        input: '',
        password: '',
      },
      rules: {
        input: [{required: true, message: '账号不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
      },
      imgUrl:require("@/assets/img/img1.png"),
      userimg:require("@/assets/img/userimg.png"),
      gifUrl:require("@/assets/img/welcome.gif"),
      pet:require("@/assets/img/userimg.png"),
    }
  },
  methods: {
    changeuserimg(){
      localStorage.setItem('userimg',require("@/assets/img/img1.png"))
      let tmp=localStorage.getItem('userimg');
      if(tmp){
        this.userimg=tmp;
      }
    },
    ...mapMutations(['changeLogin']),
    submitForm(user){
      let _this = this;
      console.log(user);
      axios.post('/api/user/login',{
        username:_this.user.input,
        password:_this.user.password
      }).then((response)=>{
        console.log(response)
        if(response.data.token){
          var data=response.data;
          console.log(data);
          var tmp = 'Bearer ' + data.token;
          // 将用户token保存到vuex中
          _this.changeLogin({ token: tmp});
          _this.$router.push('/login');
          alert('登陆成功');
        }
        else{
          alert('登陆失败，请重试！')
        }
      }).catch(function (error) { // 请求失败处理
        console.log("---出错---！"+error);
      });

    },
    clearForm(info){
      this.$refs[info].resetFields()
    },
    search(){
      this.$router.push('/search');
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
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
.building{
  width: 1440px;
  height: 900px;
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
  margin-top: 15%;
  margin-left: 10%;
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
  width: 61px;
  height: 41px;
  background: #F5EEEE;
  margin-top: 1.5%;

}

.circle2{
  width: 70px;
  height: 70px;
  background: #F8C291;
  opacity: 0.75;
  border-radius: 50%;
  margin-left: 79px;
}
.bottom{
  width: 1440px;
  height: 823px;
  background: #F8C291;
  opacity: 0.35;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 1%;
}
.gif{
  width: 189px;
  height: 214px;
}
.itemlabel1{
  width: 350px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;

}

.itemlabel2{
  width: 350px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
}
.circle{
  width: 238px;
  height: 238px;
  background: #43b2ff;
  opacity: 0.97;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  margin-top: 10%;
  margin-bottom: 1%;
}
.circle2img{
  margin-left: 5%;
  background: #f6deca;
  border-radius: 50%;
  width:4.8%;
  height: 4.8%;
}
.text2{
  width: 48px;
  height: 22px;
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;
  margin-right: 1%;
  margin-top: 29px;
}
.text3{
  width: 48px;
  height: 22px;
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;
  margin-right: 1%;
  margin-top: 29px;
}
.btn1{
  width: 140px;
  height: 50px;
  background: #4FA1F4;
  border-radius: 10px;
  color: #ffffff;
}
.btn2{
  width: 140px;
  height: 50px;
  background: #4FA1F4;
  border-radius: 10px;
  color: #ffffff;
}
.el-input__inner::placeholder {
  color: #ffffff;
  text-align:center;
}
/* 谷歌 */
.el-input__inner::-webkit-input-placeholder {
  color: #ffffff;
  text-align:center;
}
/* 火狐 */
.el-input__inner:-moz-placeholder {
  color: #ffffff;
  text-align:center;
}
.webitem6{
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #030303;
  margin-right: 1%;
  margin-left: 0.5%;
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

<style scoped>
.itemlabel1>>>input{
  color: #ffffff;
  background-color: #4FA1F4 !important;
}
.itemlabel2>>>input{
  color: #ffffff;
  background-color: #4FA1F4 !important;
}
.el-input__inner::placeholder {
  color: #ffffff;
  text-align:center;
}
/* 谷歌 */
.el-input__inner::-webkit-input-placeholder {
  color: #ffffff;
  text-align:center;
}
/* 火狐 */
.el-input__inner:-moz-placeholder {
  color: #000000;
  text-align:center;
}
.el-input__inner {
  background-color: #4FA1F4 ;
  border: 1px solid #2f2f34;
  width: 90%;
}
</style>
