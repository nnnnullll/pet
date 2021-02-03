<template>
  <div>
    <v-top></v-top>
    <div>
      <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="getFile($event)" />
      <button @change="submitForm($event)">上传文件</button>
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
    file:""
  },
  methods:{
    getFile(event) {
      this.file = event.target.files[0];
      console.log(this.file);
    },
      submitForm (event){
      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('age', this.age)
      formData.append('file', this.file)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post('/myupload', formData, config).then(function (res) {
        if (res.status === 200) {
          /*这里做处理*/
          console.log(res)
        }
      })
    }
  },

}
</script>

<style scoped>

</style>