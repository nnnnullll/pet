<template>
  <!-- 这个视图组件的名字叫register -->
  
  <div  class="register">
    <el-row :gutter="20" style="padding-top:15px">  
        <el-col  :span="7"  class="g-content b-purple"></el-col>
        <el-col  :span="11"  class="g-content b-purple">
          <el-form  hide-required-asterisk :model="userinform" status-icon :rules="rules"  ref="userinform" label-width="100px" class="demo-dynamic">
            <!-- label输入框前的词 prop属性设置需要校验的字段名 和v-model一致 -->
            <!-- 上传头像 -->
            <el-form-item label="头像" >
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="userinform.imageUrl" :src="userinform.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon">点击上传</i>
              </el-upload>
            </el-form-item>  
            <!-- 用户名 密码 确认密码 邮箱 -->
            <el-form-item  label="用户名" prop="username">
              <el-input style="width:250px"  type="text" maxlength="10" v-model="userinform.username" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input style="width:250px"  type="password" v-model="userinform.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input style="width:250px" type="password" v-model="userinform.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input style="width:250px"  type="email" v-model="userinform.email" ></el-input>
            </el-form-item>
            <!-- 宠物身份卡 -->
          
            <el-card class="box-card" v-for="(petinfo, index) in userinform.petsinform" :key="petinfo.key" >
              <div  slot="header" class="clearfix">
                 <el-row :gutter="20" style="padding-top:15px">  
                  <el-col  :span="20"  class="g-content b-purple"><span>宠物身份卡{{index+1}}</span></el-col>
                  <el-col  :span="3"  class="g-content b-purple"><el-button size="small" @click.prevent="removepetinfo(petinfo)">✖</el-button></el-col>
                 </el-row>
              </div>
              <el-row :gutter="20" style="padding-top:15px">  
                <el-col  :span="13"  class="g-content b-purple">
                  <div class="petinfo" style=" display: fex; flex-direction: row;">
                    <div class="petleft">         
                      <el-form-item label="名字" :prop="'petsinform.' + index + '.petname'"
                        :rules="[
                          { required: true, message: '请输入宠物名字', trigger: 'blur' }
                        ]"
                      >
                        <el-input placeholder="请输入内容" style="width:150px" v-model="petinfo.petname"></el-input>
                      </el-form-item>
                      <el-form-item label="性别"  :prop="'petsinform.' + index + '.petsex'" 
                        :rules="{ required: true, message: '性别不能为空', trigger: 'blur'}"
                      >
                        <el-radio-group style="width:150px" v-model="petinfo.petsex">
                          <el-radio label="男"></el-radio>
                          <el-radio label="女"></el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="出生日期" :prop="'petsinform.' + index + '.petdata'" 
                        :rules="{ required: true, message: '请选择出生日期', trigger: 'blur'}"
                      >
                        <el-col :span="11">
                          <el-date-picker type="date" placeholder="选择日期" style="width:150px" v-model="petinfo.petdata" ></el-date-picker>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="种族" :prop="'petsinform.' + index + '.petclass'" 
                        :rules="{ required: true, message: '请选择种族', trigger: 'blur'}"
                      >
                        <el-select style="width:150px" v-model="petinfo.petclass" placeholder="请选择种族">
                          <el-option label="猫" value="cat"></el-option>
                          <el-option label="狗" value="dog"></el-option>
                          <el-option label="兔子" value="rabbit"></el-option>
                          <el-option label="狐狸" value="fox"></el-option>
                          <el-option label="鱼" value="fish"></el-option>
                        </el-select>
                      </el-form-item>        
                    </div>
                  </div>
                </el-col>
                <el-col  :span="6"  class="g-content b-purple">
                  <div class="petphoto">
                    <el-form-item label="头像" >
                      <el-upload
                        class="avatar-uploader1"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="petinfo.petUrl" :src="domian.petUrl" class="avatar1">
                        <i v-else class="el-icon-plus avatar-uploader-icon1">点击上传</i>
                      </el-upload>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-card>
            <!-- 按钮 -->
            <el-row :gutter="20" style="padding-top:15px">  
              <el-col  :span="20"  class="g-content b-purple"><el-button @click="addpetinfo">新增宠物卡片</el-button></el-col>
              <el-col  :span="3"  class="g-content b-purple"><el-button type="primary" @click="submitForm('userinform')"  >提交</el-button></el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-col  :span="6"  class="g-content b-purple"></el-col>
    </el-row>
    
  </div>
</template>

<script>
// 抛出
export default {
  name:'register',
  data() {
      var checkUsername = (rule, value, callback) => {
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
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.userinform.checkPass !== '') {
            this.$refs.userinform.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.userinform.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      
      return {
        userinform: {
          //用户信息
          imageUrl:'',
          username:'',
          pass: '',
          checkPass: '',
          age: '',
          imageUrl: '',
          email:'',
          petsinform: [{
            petUrl:'',
            petname:'',
            petsex:'',
            petdata:'',
            petclass:''
          }]
        },
        rules: {
          // validator校验函数 对应上面的函数
          // trigger: 'blur' 失去焦点 校验是否为空  trigger: 'change'数据改变 校验手动选择框
          username: [
            { validator: checkUsername, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ],
          email: [
            { validator: checkemail, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
     
      // 上传头像相关函数
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //宠物卡片
      removepetinfo(item) {
        var index = this.userinform.petsinform.indexOf(item)
        if (index !== -1) {
          this.userinform.petsinform.splice(index, 1)
        }
      },
      addpetinfo() {
        this.userinform.petsinform.push({
          petname:'',
          petsex:'',
          key: Date.now()
        });
      }
    }
  }
</script>

<style scoped>
/* 人头像 */
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 15px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
/* 宠物头像 */
  .avatar-uploader1 .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader1 .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon1 {
    font-size: 16px;
    color: #8c939d;
    width: 80px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .avatar1 {
    width: 60px;
    height: 60px;
    display: block;
  }
/* 卡片 */
  .text {
    font-size: 15px;
  }

  .item {
    margin-bottom: 5px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 550px;
    padding-bottom: 0px;
  }
  /* 布局 */
  .el-row {
    margin-bottom: 1px;   
  }
  .el-col {
    border-radius: 4px;
  }
  .row-bg {
    padding: 1px 0;
    background-color: white;
  }

  .b-purple-dark {
    background:   white;
  }
  .b-purple {
    background:   white;
  }
  .b-purple-light {
    background:  white;
  }
  .g-content {
    border-radius: 4px;
    min-height: 10px;
  }
</style>
  
  
