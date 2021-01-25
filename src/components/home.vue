// 首页
<template>
    <div class="homebox">
        <v-top></v-top>
        <img class="longpets" :src="longpets" >
        <div class="homelogos">
            <img class="homelogo1" :src="logo1" >
            <img class="homelogo2" :src="logo2">
            <img class="homelogo3" :src="logo3">
        </div>
        

    </div>
</template>

<script>
import vTop from '../components/topselect'
export default {
    components:{
        vTop
    },
    data(){
        return{
            longpets:require("@/assets/img/longpets.png"),
            logo1:require("@/assets/img/home_logo_liulang.png"),
            logo2:require("@/assets/img/home_logo_kepu.png"),
            logo3:require("@/assets/img/home_logo_hospital.png"),
        }
    }
    
}
</script>

<style scoped>
body {
  margin: 0;
}
.homebox{
  
  width: 1440px;
  height: 1100px;
}
.longpets{
  margin-top:4px;
}


.homelogos{
    margin-top: 10px;
    height: 126px;
    width: 1440px;
}
.homelogo1{
    margin-left: 87px;
    margin-right: 2%;
    width:93px;
    height:106px
}
.homelogo2{
    margin-right: 2%;
    width:93px;
    height:106px
}
.homelogo3{
    margin-right: 2%;
    width:93px;
    height:106px
}
</style>