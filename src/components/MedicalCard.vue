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
            <p class="Title" style="margin-right: 5%;">医疗健康小本本</p>
          </div>
          <div>
            <el-select   v-for="(arrItem,key) in selectList" v-on:change="getIndex" :key="key" v-model="selectArr[key]"
                       filterable placeholder="请选择宠物" value-key="value" @focus="position=key"
                       style="margin-left:32%;width: 200px;margin-top: 8px;margin-bottom: 12px" >
              <el-option v-for="item in arrItem" :key="item.label" :label="item.label"
                         :value="item">
              </el-option>
            </el-select>
            <div v-if="flag==1" class="ShowInfo" style="display: flex;flex-direction: column">
              <div style="display: flex;flex-direction: row">
                <p style="margin-bottom: 3%">姓名：{{Name}}</p>
              </div>
              <p style="margin-bottom: 3%">性别：{{Gender}}</p>
              <p style="margin-bottom: 3%">品种：{{Kind}}</p>
              <p style="margin-bottom: 3%">出生日期：{{Birth}}</p>
              <p style="margin-bottom: 3%">联系方式：{{Email}}</p>
              <div style="display: flex;flex-direction: row">
                <p style="margin-bottom: 3%">说明：{{Explain}}</p>
                <div class="Right-Bottom" style="display: flex;flex-direction: column;margin-left: 15%">
                  <img :src="Seal" style="margin-left: 5%">
                  <p style="margin-left: 9%">发证日期：{{GetDate}}</p>
                </div>
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
      yhid:0,
      medical_record:require("@/assets/img/medical record.png"),
      Seal:require("@/assets/img/seal.png"),
      Profile:require("@/assets/img/cat.png"),
      Name:"心肝小宝贝喵喵",
      Gender:"男",
      Kind:"团宠喵",
      Email:"273146618@qq.com",
      Birth:"2000-02-09",
      Explain:"暂无",
      GetDate:"2020.2.5",
      position: null,
      cwid:[],
      selectArr: [],
      selectList: [[]],
      index:0,
      flag:0
    }
  },
  methods: {
    getIndex(index){
      this.flag=1
      console.log("index.value:")
      console.log(index.value)
      this.index=index.value
      this.getCardInfo();
    },
    addOptions() {
      // console.log(item);  // item为当前选中项的对象
      axios.post("/petlist?yhid="+this.yhid).then(res=>{
        for(var i=0;i<res.data.length;i++){
          this.cwid[i]=res.data[i].cwid;
          if(i==0)
          {this.index=res.data.cwid;}
          let tmp={
            value:res.data[i].cwid,
            label:res.data[i].xm
          }
          this.selectList[0].push(tmp);
          // this.selectList[0][i].value=res.data[i].cwid;
          // this.selectList[0][i].label=res.data[i].xm;
        }
          }).catch(err=>{
            console.log(err)
          })
    },
    getCardInfo(){
      console.log("value:"+this.index)
      axios.post('/HealthCard',{
        yhid:this.yhid,
        cwid:this.index
      }).then(res=>{
        console.log(res.data)
        this.Name=res.data.Name;
        this.Gender=res.data.Gender;
        this.Kind=res.data.Kind;
        this.Birth=res.data.Birth;
        this.Email=res.data.Email;
      }).catch((err=>{
        console.log(err)
      }))
    },

    update(e){
      let file = e.target.files[0];
      let param = new FormData(); //创建form对象
      param.append('file',file);//通过append向form对象添加数据
      console.log(param.get('file')); //FormData私有类对象通过get判断值是否传进去
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      }; //添加请求头
      axios.post('/uploadimg',param,config)
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
  },
  mounted() {
    this.yhid=localStorage.getItem("yhid")
    this.addOptions();
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
  width: 70px;
  height: fit-content;
  margin-top: 2px;
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
