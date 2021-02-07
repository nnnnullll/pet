<template>
  <div class="vue-uploader" style="width:663px;height: 680px;">
    <div  >
      <img src="https://ss2.baidu.com/6ON1bjeh1BF3odCf/it/u=32455353,1132199528&fm=15&gp=0.jpg" style="margin-left:25%;width: 280px;height: fit-content">
      <div v-if="files.length==0"style="margin-left: 30%" >下方选择图片合成pdf</div>
      <div v-else style="margin-left: 33%">至多选择4张图片</div>
    </div>

    <div class="file-list" style="width: 663px">
      <section v-for="(file, index) of files" class="file-item draggable-item">
        <img style="margin-left: 20px" :src="file.src" alt="" ondragstart="return false;">
        <span class="file-remove" @click="remove(index)" >+</span>
      </section>
      <section v-if="status == 'ready'&&files.length<4" class="file-item">
        <div @click="add" style="margin-top: 40px;" class="add">
          <span>+</span>
        </div>
      </section>
    </div>
    <section v-if="files.length != 0" class="upload-func">
        <section v-if="uploading" :width="(percent * 100) + '%'">{{(percent * 100) + '%'}}</section>
        <button v-if="status == 'ready'" @click="submit" class="SubmitBtn">上传</button>
        <button v-if="status == 'finished'" @click="finished">完成</button>
    </section>
    <input type="file" accept="image/*" @change="fileChanged" ref="file" multiple="multiple">
  </div>
</template>
<script>
import axios from "axios";

export default {
  name:'uploader',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      status: 'ready',
      files: [],
      uploading: false,
      percent: 0
    }
  },
  methods: {
    //从后端获取并更新左侧表格信息
    update(){

    },
    add() {
      this.$refs.file.click()//调用file的click事件
    },
    submit() {
      if (this.files.length === 0) {
        console.warn('no file!');
        return
      }
      let formData = new FormData()
      //当点击上传按钮时，将会遍历所有选中的文件，并添加到自定义的FormData中
      this.files.forEach((item) => {
        // console.log(item)
         formData.append("file", item.file)
      })
      let headers = {headers: {"Content-Type": "multipart/form-data"}}//设置上传文件格式，为指定传输数据为二进制类型
      axios.post('/uploadimg',formData,headers)
          .then(res => {
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
    },
    finished() {
      this.files = []
      this.status = 'ready'
    },
    remove(index) {
      this.files.splice(index, 1)
    },
    fileChanged() {
      const list = this.$refs.file.files
      for (let i = 0; i < list.length; i++) {
        if (!this.isContain(list[i])) {
          const item = {
            file: list[i]
          }
          this.html5Reader(list[i], item)
          this.files.push(item)
        }
      }
      this.$refs.file.value = ''
    },
    // 将图片文件转成BASE64格式
    html5Reader(file, item){
      const reader = new FileReader()
      reader.onload = (e) => {
        this.$set(item, 'src', e.target.result)
      }
      reader.readAsDataURL(file)
    },
    isContain(file) {
      return this.files.find((item) => item.name === file.name && item.size === file.size)
    }
  }
}
</script>
<style>
.vue-uploader{
}
.vue-uploader .file-list {
  padding: 10px 0px;
}
.vue-uploader .file-list:after {
  content: '';
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
  font-size: 0;
}
.vue-uploader .file-list .file-item {
  float: left;
  position: relative;
  width: 320px;
  text-align: center;
}
.vue-uploader .file-list .file-item img{
  width: 320px;
  height:fit-content;
  border: 1px solid #ececec;
}
.vue-uploader .file-list .file-item .file-remove {
  position: absolute;
  right: 12px;
  display: none;
  top: 4px;
  width: 14px;
  height: 14px;
  color: white;
  cursor: pointer;
  line-height: 12px;
  border-radius: 100%;
  transform: rotate(45deg);
  background: rgba(0, 0, 0, 0.5);
}
.vue-uploader .file-list .file-item:hover .file-remove {
  display: inline;
}
.vue-uploader .file-list .file-item {
  margin: 0;
  /*height: 697px;*/
  word-break: break-all;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.vue-uploader .add {
  width: 80px;
  height: 80px;
  margin-left: 10px;
  float: left;
  text-align: center;
  line-height: 80px;
  border: 1px dashed #ececec;
  font-size: 30px;
  cursor: pointer;
}
.vue-uploader .upload-func {
  display: flex;
  padding: 10px;
  margin: 0px;
  /*border-top: 1px solid #ececec;*/
}
.vue-uploader .upload-func .progress-bar {
  flex-grow: 1;
}
.vue-uploader .upload-func .progress-bar section {
  margin-top: 5px;
  background: #00b4aa;
  border-radius: 3px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  transition: all .5s ease;
}
.vue-uploader .upload-func .operation-box {
  flex-grow: 0;
  padding-left: 10px;
}
.vue-uploader .upload-func .operation-box button {
  padding: 4px 12px;
  color: #fff;
  background: #007ACC;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}
.vue-uploader > input[type="file"] {
  display: none;
}
.SubmitBtn{
  padding: 4px 12px;
  color: #fff;
  background: #007ACC;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
</style>