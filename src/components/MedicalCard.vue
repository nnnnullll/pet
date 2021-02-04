<template>
  <div>
    <v-top></v-top>
    <div>
<!--      <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update"/>-->
      <input type="file" name="fileUpload" id = "input_updata" @change="change($event)" ref="inputFile" >
      <input type="submit" value="提交" id = "btn_updata" @click = "updata">

      <!-- 文件上传 -->
    </div>

  </div>

</template>

<script>
import VTop from "@/components/topselect";
import axios from "axios";
export default {
  name: "MedicalCard",
  components: {VTop},
  data(){
  },

  methods: {
    update(e){
      let file = e.target.files[0];
      let param = new FormData(); //创建form对象
      param.append('file',file);//通过append向form对象添加数据
      console.log('11111');
      console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers:{'Content-Type':'multipart/form-data'} //这里是重点，需要和后台沟通好请求头，Content-Type不一定是这个值
      }; //添加请求头
      axios.post('http://localhost:8000/save',param,config)
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
      data.append("参数1",1)//参数一
      data.append("参数二",0)//参数二
      console.log(data)
      let headers = {headers: {"Content-Type": "multipart/form-data"}}//设置上传文件格式，为指定传输数据为二进制类型
      this.$http.post('http://localhost:8000/saveimg',data,headers)
          .then(res => {
            console.log('上传成功',res)
            if(res.status){
              console.log('文件上传成功')
              console.log(res.bodyText)
              // setInterval(() => {
              //   this.$router.go(0)
              // }, 1000);
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

<style scoped>

</style>