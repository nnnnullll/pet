<template>  
  <div class="registerbox">
    <!-- 首栏 -->
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
    <!-- <svg-icon icon-class="404" size="40"></svg-icon>
    <icon name="picture1_animals" :w="1440" :h="140"></icon> -->
    <!-- 注册 -->
    <img class="p1" src="../assets/imag/a1.png" alt="">
    <div class="line1"></div>
    <div class="line2"></div>
    <div class="head">注册</div>
     <el-form hide-required-asterisk :model="userinform" status-icon :rules="rules"  ref="userinform" class="ff">
      <el-form-item class="el-form-item__content" prop="name" >
        <el-input class="input1" placeholder="请输入用户名" maxlength="10" type="text"     v-model="userinform.name" ></el-input>
      </el-form-item>
      <el-form-item class="el-form-item__content" prop="password">
        <el-input class="input2" placeholder="请输入密码" maxlength="25" type="password" v-model="userinform.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="el-form-item__content" prop="checkword">
        <el-input class="input3" placeholder="请确认密码" maxlength="25" type="password" v-model="userinform.checkword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="el-form-item__content" prop="email">
        <el-input class="input4" placeholder="请输入邮箱" maxlength="25" type="email"    v-model="userinform.email" ></el-input>
      </el-form-item>
      <div class="input5"  @click="submitForm('userinform')"  ><div class="sub">提交</div></div>
    </el-form>
  </div>
</template>


<script>
const axios = require('axios');
import { mapMutations } from 'vuex';
export default {
  name:'petregister',
  data() {
    var checkname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
      setTimeout(() => {
        //这里加验证用户名唯一性
        callback();
      }, 1000);
    };
    var checkemail = (rule, value, callback) => {
      // var mail=document.getElementById("mail").value;
      if (!value) {
        return callback(new Error('邮箱不能为空'));
      }
      setTimeout(() => {
        var regex=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
        if (!regex.test(value)) {
          callback(new Error('邮箱格式错误'));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.userinform.checkword !== '') {
          this.$refs.userinform.validateField('checkword');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.userinform.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      imgUrl:require("@/assets/imag/img1.png"),
      userimg:require("@/assets/imag/userimg.png"),
      userinform: {
      //用户信息
      name:"",
      password: "",
      checkword: "",
      email:"",
    },
    rules: {
        // validator校验函数 对应上面的函数
        // trigger: 'blur' 失去焦点 校验是否为空  trigger: 'change'数据改变 校验手动选择框
        name: [
          { validator: checkname, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkword: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { validator: checkemail, trigger: 'blur' }
        ],
      }
    };
  },
  methods:{
    submitForm(formName) {
      const  _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('注册成功!');
          axios.post('http://localhost:8181/user/save',this.userinform).then(function(resp){
            console.log(resp)
          })
          this.$router.replace('/l')
        } else {
          console.log('信息错误，注册失败!');
          return false;
        }
      });
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

<style scoped>
.registerbox{
  width: 1440px;
  height: 800px;
}
.p1{
  position: absolute;
  top: 90px;
  left: 0px;
}
.head{
  position: absolute;
  top: 241px;
  left: 674px;
  width: 100px;
  height: 43px;
  font-size: 48px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;
}
.line1{
  position: absolute;
  top: 258px;
  left: 83px;
  width: 526px;
  height: 1px;
  background: #B6B6B6;
  border: 3px solid #B6B6B6;
  opacity: 0.25;
}
.line2{
  position: absolute;
  top: 258px;
  left: 831px;
  width: 526px;
  height: 1px;
  background: #B6B6B6;
  border: 3px solid #B6B6B6;
  opacity: 0.25;
}
.ff{
  position: absolute;
  top: 315px;
  left: 473px;
}
/* 覆盖element */
.input1>>>input{
  width: 495px;
  height: 60px;
  border: 3px solid #b9b9b9;
  border-radius: 10px;
  font-family:"ZTSJ-BaguetteFont";
  font-size:30px;
  color:  #424141;
}
.input2>>>input{
  width: 495px;
  height: 60px;
  border: 3px solid #b9b9b9;
  border-radius: 10px;
  font-family:"ZTSJ-BaguetteFont";
  font-size:30px;
  color:  #424141;
}
.input3>>>input{
  width: 495px;
  height: 60px; 
  border: 3px solid #b9b9b9;
  border-radius: 10px;
  font-family:"ZTSJ-BaguetteFont";
  font-size:30px;
  color:  #424141;
}
.input4>>>input{
  width: 495px;
  height: 60px;
  border: 3px solid #b9b9b9;
  border-radius: 10px;
  font-family:"ZTSJ-BaguetteFont";
  font-size:30px;
  color:  #424141;
}
.input5{
  width: 488px;
  height: 54px;
  border: 3px solid #b9b9b9;
  border-radius: 10px;
} 
.sub{
  padding-top: 8px;
  padding-left: 208px;
  width: 72px;
  height: 32px;
  font-size: 36px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #424141;
}
</style>

// 首栏
<style>
body {
  margin: 0;
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
.circle2img{
  margin-left: 5%;
  background: #f6deca;
  border-radius: 50%;
  width:4.8%;
  height: 4.8%;
}
.userimg{
  margin-left: 12px;
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
