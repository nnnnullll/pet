
// 登录
<template xmlns:overflow="http://www.w3.org/1999/xhtml">

  <div class="building">
    <!-- 首栏 -->
    <v-top></v-top>
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
        <div style="display: flex;flex-direction: row;justify-content: center">
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
import vTop from '../components/topselect'
export default {
  components:{
        vTop
    },
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
      axios.post('http://localhost:8050/user/login',{
        username:_this.user.input,
        password:_this.user.password
      }).then((response)=>{
        console.log(response)
        if(response.data.token){
          var data=response.data;
          console.log(data.yhid);
          localStorage.setItem('yhid', JSON.stringify(data.yhid));
          var tmp = 'Bearer ' + data.token;
          // 将用户token保存到vuex中
          _this.changeLogin({ token: tmp});
          //localStorage.setItem('token',JSON.stringify(tmp))
          _this.$router.push('/home');
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
      this.$router.push('/petregister');
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

<style scoped>
body {
  margin: 0;
  padding: 0;
}
.building{
  width: 1440px;
  height: 900px;
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
  text-align:center;
}
.itemlabel2{
  width: 350px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  text-align:center;
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
