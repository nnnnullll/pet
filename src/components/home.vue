// 首页
<template>
    <div class="homebox">
        <v-top></v-top>
        <img class="longpets" src="../assets/img/longpets.png" alt="">
        <div class="homelogos">
            <img class="homelogo1" src="../assets/img/logoliulang.png" alt="">
            <img class="homelogo2" src="../assets/img/logokepu.png" alt="">
            <img class="homelogo3" src="../assets/img/logohospital.png" alt="">
        </div>
        

    </div>
</template>

<script>
import vTop from '../components/topselect'
export default {
    components:{
        vTop
    },
    
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