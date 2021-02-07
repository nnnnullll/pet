<template>
  <div style="background: #fff4e8;width: 1440px;height: 900px;">
    <v-top></v-top>
<!--    <div>-->
<!--      <input type="file" name="fileUpload" id = "input_updata" @change="change($event)" ref="inputFile" >-->
<!--      <input type="submit" value="提交" id = "btn_updata" @click = "updata" multiple="multiple">-->
<!--    </div>-->
    <div>
      <div class="card" style="display: flex;flex-direction: row;justify-content: center;margin-top: 3%">
        <div class="LeftPart" style="width: 585px">
          <div style="display: flex;flex-direction: row;justify-content: center">
            <img :src="medical_record" class="MedicalRecord">
            <p class="Title" style="margin-right: 5%">医疗健康小本本</p>
          </div>

          <div class="ShowInfo" style="display: flex;flex-direction: column">
            <div style="display: flex;flex-direction: row">
              <p style="margin-bottom: 3.6%">姓名：{{Name}}</p>
            </div>

            <p style="margin-bottom: 3.6%">性别：{{Gender}}</p>
            <p style="margin-bottom: 3.6%">品种：{{Kind}}</p>
            <p style="margin-bottom: 3.6%">出生日期：{{Birth}}</p>
            <p style="margin-bottom: 3.6%">联系方式：{{Email}}</p>
            <div style="display: flex;flex-direction: row">
              <p style="margin-bottom: 3.6%">说明：{{Explain}}</p>
              <div class="Right-Bottom" style="display: flex;flex-direction: column;margin-left: 15%">
                <img :src="Seal" style="margin-left: 5%">
                <p style="margin-left: 9%">发证日期：{{GetDate}}</p>
              </div>
            </div>
          </div>

        </div>
        <div>
          <uploader :src="'/uploadimg'"></uploader>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import VTop from "@/components/topselect";
import axios from "axios";
import uploader from "@/components/Uploader"

export default {
  name: "MedicalCard",
  components: {VTop,uploader},
  data(){
    return{
      medical_record:require("@/assets/img/medical record.png"),
      Seal:require("@/assets/img/seal.png"),
      Profile:require("@/assets/img/cat.png"),
      Name:"心肝小宝贝喵喵",
      Gender:"男",
      Kind:"团宠喵",
      Email:"273146618@qq.com",
      Birth:"2000-02-09",
      Explain:"暂无",
      GetDate:"2020.2.5"
    }
  },
  methods: {
  update(e){
      let file = e.target.files[0];
      let param = new FormData(); //创建form对象
      param.append('file',file);//通过append向form对象添加数据
      console.log(param.get('file')); //FormData私有类对象通过get判断值是否传进去
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      }; //添加请求头
      axios.post('http://localhost:8000/uploadimg',param,config)
          .then(response=>{
            console.log(response.data);
          }).catch(err=>{console.log(err)})
    },

    // 触发时，将选择的上传文件复制给file，用于提交操作使用
    change(event){
      console.log('文件上传',event.target.files[0])
      this.file = event.target.files[0]
    },

    //  文件上传
    // 原理是通过from表单
    updata(){
      console.log('点击了文件上传')
      var data = new FormData();//重点在这里 如果使用 var data = {}; data.inputfile=... 这样的方式不能正常上传
      // 将需要添加的参数添加进表单中
      data.append("file",this.file)//获取需要上传的文件
      console.log(data)
      let headers = {headers: {"Content-Type": "multipart/form-data"}}//设置上传文件格式，为指定传输数据为二进制类型
      axios.post('/uploadimg',data,headers)
          .then(res => {
            console.log('上传成功',res)
            if(res.status){
              console.log('文件上传成功')
              console.log(res.data)
            }else{
              console.log('上传失败')
            }
          })
          .catch(err => {
            console.log('上传失败',err)
          })
    }
  }



}
</script>

<style >
body {
  margin: 0;
  padding: 0;
}
.el-dialog {
  border-radius: 6px;
  overflow: hidden;
}
.card{
  background: white;
  border: 1px solid #000000;
  width: 1249px;
  height: 680px;
  margin-left: 6%;
  font-size: 24px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;

}
.LeftPart{
  border-right: 1px solid #000000;
}
.MedicalRecord{
  width: 74px;
  height: fit-content;
  margin-top: 7px;
}
.Title{
  width: 210px;
  height: 30px;
  font-size: 30px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;
  margin-top: 4%;
  margin-left: 1%;
  text-align: center;
}
.ShowInfo{
  margin-left: 5%;
}
</style>
