// 详细记录
<template>
    <!-- <div class="container"> -->
        <div class="box" :style ="pic" >
            <div>{{this.$route.params.jlid}}</div>
            <el-card  class="messagecard">
            <!-- 用户信息 -->
                <el-row  >
                    <el-col :span="4" class="userleft">
                        <el-avatar class="userurl" :size="100"  :src="messageinform.userUrl"></el-avatar>
                    </el-col >
                    <el-col :span="6" class="userright">
                        <el-row>
                            <el-col :span="10">
                                <div class="username">{{messageinform.username}}</div>
                            </el-col>
                            <el-col :span="4">
                                <div class="guanzhu" @click="guanZhu()">
                                <div  class="guantext"> {{guanzhu}}</div>
                                </div>
                            </el-col>
                        </el-row>
                        <div  class="userdatetime">{{messageinform.datatime}}</div> 
                    </el-col >
                </el-row>
                <!-- 记录内容 -->
                <div class="messagecont">
                    <div  class="textcont">
                    <!-- 文字内容 -->
                    <div class="messagetext">{{messageinform.passage}}</div>
                    </div>
                        <el-img  v-for="(photo) in photourl" :key="photo.key" 
                            style="width: 221px; height: 150px;padding:1px"
                            :src="photo"
                            :preview-src-list="photourl"
                            fit="cover">
                        </el-img>
                    <el-row  class="lovestar" >  
                        <el-col  :span="10" >
                            <div class="txt" style="font-weight:bold" >
                            <img @click="starplus()" class="p1" src="../assets/img/star.png" alt="">
                            {{messageinform.starnumber}}  {{messageinform.isstar}}
                            </div>
                        </el-col>
                        <el-col  :span="12" >
                            <div class="txt" style="font-weight:bold" >
                            <img @click="loveplus()" class="p1" src="../assets/img/love.png" alt="">
                            {{messageinform.lovenumber}}  {{messageinform.islove}}
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </div>
    <!-- </div> -->
</template>

<script>
const axios = require('axios');

export default {
    name: 'productdetailspage',
    data() {
        return {
            id:null,
            ph:{},
            guanzhu:"",
            messageinform:{
                messagenum:1,
                username:"用户名",
                userUrl:'',
                datatime:"2020-12-26",
                passage:"这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字",
                lovenumber:15,
                islove:"喜欢",
                starnumber:9,
                isstar:"收藏"
            },
            photourl: [
                    // 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    // 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                    // 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
                    // // 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                    // // 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                    // // 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                    // 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
                    // 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
                    // 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                ],
            pic: {
                backgroundImage: "url(" + require('../assets/img/petshome.png') + ")",
                width: '1440px',
                height: '685px',
                position: 'absolute',
                left: '0px',
                top:'0px',
            }
        }
    },
    activated:function(){
        console.log(this.$route.params.jlid)
        this.getJlData(this.$route.params.jlid)   
    },
    methods:{
        getJlData(e) { 
            const _this = this
            axios.get('http://localhost:8000/getShareByjlid',{
                params:{
                    jlid:e
                }
            }).then(res => {
                console.log(res.data)
                _this.messageinform.messagenum=res.data.jlid
                _this.messageinform.username=res.data.yhm
                // _this.messageinform.userUrl
                _this.messageinform.datatime=res.data.fbsj
                _this.messageinform.passage=res.data.wz
                // _this.messageinform.lovenumber
                // _this.messageinform.islove
                // _this.messageinform.starnumber
                // _this.messageinform.isstar
            })
            .catch(err => {
                console.log('错误：'+err)
            })
            axios.get('http://localhost:8000/getPhotoByjlid',{
                params:{
                    jlid:e
                }
            }).then(res => {
                console.log(res.data)
                _this.ph=res.data
                // console.log(_this.ph[0].zp)
                // console.log(_this.ph[1].zp)
                var i=0
                for(i=0;i<_this.ph.length;i++){
                    // console.log(_this.ph[i].zp)
                    _this.photourl[i]=_this.ph[i].zp
                    console.log(_this.photourl[i])
                }
                // console.log(_this.photourl)
                    
            })
            .catch(err => {
                console.log('错误：'+err)
            })
            
        }, 
        guanZhu() {
            axios.get('http://localhost:8000/isfollow',{//查成功
                params:{
                    zyhid:1,
                    fsid:2,
                }
            }).then(res => {
                console.log(res.data)
                if(res.data=="wu"){
                    axios.get('http://localhost:8000/addfollow',{
                        params:{
                            zyhid:1,
                            fsid:2,
                            qxgz:0
                        }
                    }).then(res => {
                        console.log(res.data)
                        if(res.data=="success"){
                            alert("关注成功")
                        } 
                    })
                    .catch(err => {
                        console.log('首关注环节错误：'+err)//
                    })
                } 
                else if(res.data=="1"){
                    axios.get('http://localhost:8000/upfollow',{
                        params:{
                            zyhid:1,
                            fsid:2,
                            qxgz:0
                        }
                    }).then(res => {
                        console.log(res.data)
                        if(res.data=="success"){
                            alert("关注成功")
                        } 
                    })
                    .catch(err => {
                        console.log('再关注环节错误：'+err)//
                    })

                }
                else{
                    axios.get('http://localhost:8000/upfollow',{
                        params:{
                            zyhid:1,
                            fsid:2,
                            qxgz:1
                        }
                    }).then(res => {
                        console.log(res.data)
                        if(res.data=="success"){
                            alert("取消关注成功")
                        } 
                    })
                    .catch(err => {
                        console.log('取关错误：'+err)
                    })
                }
            })
            .catch(err => {
                console.log('查错误：'+err)
            })
        },
        loveplus() {
            if(
                this.messageinform.islove=="已喜欢"){
                this.messageinform.lovenumber--;
                this.messageinform.islove="喜欢"
            }
            else{
                this.messageinform.lovenumber++;
                this.messageinform.islove="已喜欢"
            }
            // 这里还要改数据库点赞数增加
            // 如果没登录跳转到登录页面
        },
        starplus() {
            if(this.messageinform.isstar=="已收藏"){
                this.messageinform.starnumber--;
                this.messageinform.isstar="收藏"
            }
            else{
                this.messageinform.starnumber++;
                this.messageinform.isstar="已收藏"
            }
            // 这里还要改数据库点赞数增加
            // 如果没登录跳转到登录页面
        },
    }
}
  
</script>

<style scoped>
/* body {background-attachment:fixed;} */
.container{
    width: 1440px;
    height: 768px;
    /* background-attachment:fixed; */
    background-position:fixed
}
.box{
    width: 1440px;
    height: 768px;
    margin-top: 83px;
    background-attachment:fixed;
    background-position:fixed;
}
.messagecard{
    position: absolute;
    left: 270px;
    width: 900px;
    min-height: 520px;
    background: #FDF0E3;
}
.userright{
    margin-top:30px;
}
.userurl{
    margin-top: 5px;
    margin-left: 5px;
}
.username{
    width: 75px;
    height: 22px;
    font-size: 24px;
    font-family: ZTSJ-BaguetteFont;
    font-weight: 400;
    color: #000000;
    padding-bottom: 10px;
}
.userdatetime{
    width: 150px;
    height: 14px;
    font-size: 24px;
    font-family: ZTSJ-BaguetteFont;
    font-weight: 400;
    color: #000000;
}
.guanzhu{
    height: 24px;
    width: 50px;
    background: #fab990;
    border-radius: 10%;
}
.guantext{
    width: 80px;
    height: 22px;
    font-size: 18px;
    font-family: ZTSJ-BaguetteFont;
    font-weight: 400;
    color: #000000;
    padding: 3px
}
.messagecont{
    margin-left: 140px;
    margin-right: 30px;
}
.messagetext{
    font-size: 24px;
    font-family: ZTSJ-BaguetteFont;
    font-weight: 400;
    color: #000000;
}
.lovestar{
    margin-left: 300px;
}
.p1{
    width:25px;
    height: 25px;
}
.txt{
    width: 300px;
    height: 24px;
    font-size: 24px;
    font-family: ZTSJ-BaguetteFont;
    font-weight: 400;
    color: #7F7C79;
    line-height: 1px;
}
</style>