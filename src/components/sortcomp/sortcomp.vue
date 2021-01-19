<template>
  <div>
    <el-container v-for="user in Sort" :key="id">
      <el-container>
        <el-aside width="200px">
          <div>
            <el-avatar  v-bind:circleurl="user.circleurl" :size="150">
              <el-image :src="user.circleurl"></el-image>
            </el-avatar>
          </div>
        </el-aside>
        <el-container >
          <el-container >
            <el-container >
              <el-row :gutter="20">
                <el-col :span="6" :offset="5" icon="el-icon-user-solid"><div class="grid-content"><p>用户名：</p></div></el-col>
                <el-col :span="6" :offset="2"><div class="grid-content"><p>{{user.username}}</p></div></el-col>
              </el-row>

            </el-container>
            <el-container>
              <el-row :gutter="20">
                <el-col :span="6" :offset="0"><div class="grid-content"><p>粉丝数：</p></div></el-col>
                <el-col :span="6" :offset="2"><div class="grid-content"><p>{{user.number}}</p></div></el-col>
              </el-row>
            </el-container>
            <div>
              <el-button class="a" v-bind:msg="msg" v-bind:flag="flag" v-bind:icon="iconData" style="border:none;" round type="primary" @click="follow">
                {{msg}}
              </el-button>
            </div>
          </el-container>
          <el-container>
            <el-main :style="defaultHeight">
              <p>
                {{user.info}}
              </p>
            </el-main>
          </el-container>
          <el-footer >

          </el-footer>
        </el-container>
      </el-container>
    </el-container>

  </div>
</template>

<script>
export default {
  name:"sortcomp",
  props:['tmp'],
  data(){
    return{
      msg:'',
      iconData:'el-icon-star-off',
      defaultHeight: {
        height: ""
      }
    }
  },
  methods:{
    follow:function () {
      if(this.flag==true){
        this.iconData = 'el-icon-star-on';
        this.msg="已关注";
        this.flag=false;
        alert("关注成功！");
      }else{
        this.iconData = 'el-icon-star-off';
        this.flag=true;
        this.msg="点击关注";
        alert("取消关注成功！");
      }
      this.$emit("getflag", this.flag,this.back);
      console.log(this.flag,this.id);
    }
  },
  mounted() {
    if(this.flag==true)
    {
      this.msg="点击关注"
      //this.iconData = 'el-icon-star-off';
    }
    else{
      this.msg="已关注"
      //this.iconData = 'el-icon-star-on';
    }
  },
  computed:{
    Sort:function(){
      var temp=this.tmp;
      return sortKey(temp,'number');
    }
  }
}
function sortKey(array,key){
  return array.sort(function(a,b){
    var x = a[key];
    var y = b[key];
    return ((x<y)?-1:(x>y)?1:0)
  })
}

</script>

<style scoped>
.a el-button{
  float: right;
  margin-right: 100px;
  margin-top: 13px;
}
</style>
