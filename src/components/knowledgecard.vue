// 宠儿识别
<template>
  <div class="building">
    <!-- 首栏 -->
    <v-top></v-top>
    <!-- 识别 -->
    <div class="bottom">
      <div style="display: flex;flex-direction: column">
        <img :src="flags" class="flags">
        <img :src="pet" class="pet">
        <img :src="border" class="border">
      </div>
    </div>
  </div>
</template>
<script>
import vTop from '../components/topselect'
export default {
  name: "knowledgecard",
  components:{
        vTop
    },
  data() {
    return {
      user: {
        input: '',
        password: '',
      },
      flags:require("@/assets/img/flags.png"),
      border:require("@/assets/img/border.png"),
      pet:require('@/assets/img/userimg.png')
    }
  },
}
</script>

<style >
body {
  margin: 0;
  padding: 0;
}
.building{
  width: 1440px;
  height: 1072px;
  background: #f8e5d3;
}
.flags{
  width: 1248px;
  height: 615px;
  margin-left: 17px;
}
.border{
  width: 937px;
  height: 739px;
  position: absolute;
  margin-top: 14%;
  margin-left: 30%;
}
.pet{
  width: 259px;
  height: 348px;
  position: absolute;
  margin-top: 25%;
  margin-left: 10%;
}
</style>
