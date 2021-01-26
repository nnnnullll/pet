// 宠物识别
<template xmlns:android="http://www.w3.org/1999/xhtml">
  <div class="building">
    <!-- 首栏 -->
    <v-top></v-top>
    <!-- 识别 -->
    <div class="bottom">
      <div class="information" style="display: flex;flex-direction: column;">
        <div style="display: flex;flex-direction: row;justify-content: center;">
          <img :src="love" class="love1">
          <p class="title">你想了解的我</p>
          <img :src="love" class="love2">
        </div>
        <p class="pz">我的品种名字：{{pz}}</p>
        <p class="bm">别名：{{bm}}</p>
        <p class="zl">种类：{{zl}}</p>
        <p class="tx">体型：{{tx}}</p>
        <p class="xgtz">性格特征：{{xgtz}}</p>
        <p class="jj">简介：{{jj}}</p>
      </div>
      <div style="display: flex;flex-direction: column;">
        <img :src="flags" class="flags">
        <button class="petbtn" @click="submitForm">👣宠物识别</button>
        <img :src="pet" class="pet">
        <img :src="border" class="border">
      </div>
    </div>
  </div>
</template>
<script>
const axios=require('axios');
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
      pet:require('@/assets/img/userimg.png'),
      love:require('@/assets/img/love.png'),
      pz:"心肝小宝贝喵喵",
      bm:"囡囡",
      zl:"团宠喵",
      tx:"小巧",
      xgtz:"温顺可爱、友善机灵",
      jj:"喵喵是我们网页设计团队的心头宝，几乎一眼间\n" +
          "就抓到了团队成员的心。它是我们的团宠喵，它也叫囡\n" +
          "囡。它有耐心且拥有健美形态，拥有定期运动意识，饲\n" +
          "喂食物和兽医体检就可以，非常令人省心。属于匀称、\n" +
          "有力、活泼的喵星人，\n" +
          "喵的身体各部位配合合理，腿既不太长也不笨拙，表情\n" +
          "友善，个性热情、机警、自信而且不怕生，性格讨人喜\n" +
          "欢。",
    }
  },
  methods:{
    submitForm(){
      let _this = this;
      var data;
      axios.post('http://localhost:8050/knowledge',{
        pz:"狗"
      }).then((response)=>{
        console.log(response)
        if(response){
          data=response.data;
          console.log(data);
          alert('查询成功');
          this.pz=data.pz,
              this.bm=data.bm,
              this.xgtz=data.xgtz,
              this.jj=data.jj
        }
        else{
          alert('查询失败，请重试！')
        }
      }).catch(function (error) { // 请求失败处理
        console.log("---查询出错---！"+error);
      });
    },
  }
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
  height: 348px;
  position: absolute;
  margin-top: 25%;
  margin-left: 10%;
}
.petbtn{
  width: 294px;
  height: 55px;
  background: #308DC2;
  opacity: 0.9;
  border-radius: 10px;
  position: absolute;
  margin-top: 18%;
  margin-left: 11.5%;
  font-size: 30px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #FFFFFF;
}
.love1{
  width: 40px;
  height: 42px;
}
.love2{
  width: 40px;
  height: 42px;
}
.information{
  position: absolute;
  margin-left: 55%;
  margin-top: 20%;
}
.pz{
  width: 513px;
  height: 21px;
  font-size: 21px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #737373;
}
.bm{
  width: 513px;
  height: 20px;
  font-size: 21px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #737373;
}
.zl{
  width: 513px;
  height: 21px;
  font-size: 21px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #737373;
}
.tx{
  width: 513px;
  height: 20px;
  font-size: 21px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #737373;
}
.xgtz{
  width: 513px;
  height: 21px;
  font-size: 21px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #737373;
}
.jj{
  width: 513px;
  height: 283px;
  font-size: 21px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #737373;
}
.title{
  width: 126px;
  height: 21px;
  font-size: 21px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #737373;
}
</style>
