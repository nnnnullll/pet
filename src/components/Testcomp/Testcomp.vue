<template>
  <div>
    <div class="showuser" style="display: flex;flex-direction: row">
      <img class="usersimg" :src="circleurl">
      <div class="box">
        <div class="userinfo" style="display: flex;flex-direction: row">
          <div class="name">{{name}}</div>
          <button  class="btn" v-bind:msg="msg" v-bind:flag="flag" round type="primary" @click="follow">
            {{msg}}
          </button>
        </div>
        <div class="detail" style="display: flex;flex-direction: row;">
          <div class="moment">动态数：{{count}}条</div>
          <div class="fansnum">粉丝数：{{num}}</div>
        </div>
        <div class="background">
          <div class="momenttext">最近动态：{{information}}</div>
          <div class="imgs" style="display: flex;flex-direction: row;">
            <img :src="photo[0]" class="shareimg1">
            <img :src="photo[1]" class="shareimg2">
            <img :src="photo[2]" class="shareimg3">
          </div>
      </div>

    </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"usercomp",
  props:['name','num','count','information','circleurl','flag','id','photo'],
  data(){
    return{
      msg:'',
      //iconData:'el-icon-star-off',
      defaultHeight: {
        height: ""
      }
    }
  },
  methods:{
    follow:function () {
      if(this.flag==true){
        //this.iconData = 'el-icon-star-on';
        this.msg="已关注";
        this.flag=false;
      }else{
        //this.iconData = 'el-icon-star-off';
        this.flag=true;
        this.msg="+关注";
      }
      this.$emit("getflag",this.id,this.flag);
    }
  },
  mounted() {
    if(this.flag==true)
    {
      this.msg="+关注"
      //this.iconData = 'el-icon-star-off';
    }
    else{
      this.msg="已关注"
      //this.iconData = 'el-icon-star-on';
    }
  }
}

</script>
<style>
.usersimg{
  width: 150px;
  height: 150px;
  background: #FACD89;
  border-radius: 50%;
  margin-left:10% ;
}
.name{
  width: 105px;
  height: 18px;
  font-size: 18px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;
  margin-top: 0.2%;
}
.moment{
  padding-top: 0.5%;
  padding-bottom: 0.5%;
  width: 130px;
  height: 15px;
  font-size: 16px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #A0A0A0;
}
.fansnum{
  padding-top: 0.5%;
  padding-bottom: 0.5%;
  width: 130px;
  height: 15px;
  font-size: 16px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #A0A0A0;
}
.btn{
  width: 75px;
  height: 25px;
  background: #308DC2;
  border-radius: 10px;
  font-size: 18px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #FFFFFF;
}
.shareimg1{
  width: 217px;
  height: 109px;
  padding-left: 5%;
}
.shareimg2{
  width: 217px;
  height: 109px;
  margin-left: 5%;
}
.shareimg3{
  width: 217px;
  height: 109px;
  margin-left: 5%;
}
.momenttext{
  padding-top: 1%;
  padding-bottom: 1%;
  font-size: 14px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;
  width: 900px;
  height: 20px;
  text-align: left;
  margin-left: 5px;
}
.background{
  width: 968px;
  height: 165px;
  background: #f6deca;
  margin-left: 5.8%;
}
.userinfo{
  padding-left: 2.8%;
}
.detail{
  padding-left: 4.5%;
}
.showuser{
  margin-top: 3%;
}

</style>



