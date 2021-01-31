<template>
    <div class="logbox">
        <!-- 首栏 -->
        <v-top></v-top>
        <div class="logmainbox"  :style ="pic">
            <div class="logcard">
                <div class="loguserinfobox">
                    <img @click="loggotohome" class="userimag" :src="messageinform.userUrl">
                    <div @click="loggotohome" class="infoleft">
                        <div class="infoup">
                            <span class="username">{{messageinform.username}}</span>
                            <span @click="guanZhu()" class="guanzhu">{{guanzhu}}</span>
                        </div>
                        <span class="datetime">{{messageinform.datatime}}</span>
                    </div> 
                </div>
                <div class="messagecont">{{messageinform.passage}}</div>
                <div class="messageimgs">
                    <img fit="cover" class="messageimg" v-image-preview v-for="(photo) in messageinform.photourl" :key="photo.key"  :src="photo">  
                </div>
                <div class="logfoot">
                    <div class="txt" style="font-weight:bold" >
                        <img @click="starplus()" class="p1" src="../assets/img/star.png" alt="">
                        {{messageinform.starnumber}}  {{messageinform.isstar}}
                    </div>     
                        <div class="txt" style="font-weight:bold" >
                        <img @click="loveplus()" class="p1" src="../assets/img/love.png" alt="">
                        {{messageinform.lovenumber}}  {{messageinform.islove}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vTop from '../components/topselect'
const axios = require('axios');
export default {
    name: "Petlog2",
    components:{
        vTop
    },
    data(){
        return{
            id:0,
            guanzhu:"关注",
            pic: {
                backgroundImage: "url(" + require('../assets/img/petshome.png') + ")",
                width: '1440px',
                height: '675px',
            },
            messageinform:{
                messagenum:0,
                username:"",
                datatime:"",    
                passage:"",
                userUrl:'',
                lovenumber:0,
                starnumber:0,
                islove:"喜欢",
                isstar:"收藏",
                photourl: [],
            },
        }
    },
    activated:function(){
        console.log(this.$route.params.jlid)
        this.getJlData(this.$route.params.jlid)     

    },
    methods:{
        getJlData(e) {
            const _this = this
            _this.id=e,
            axios.get('http://localhost:8000/getShareByjlid',{
                params:{
                    jlid:_this.id
                }
                }).then(res => {
                    _this.messageinform.messagenum=res.data.jlid
                    _this.messageinform.username=res.data.yhm
                    _this.messageinform.datatime=res.data.fbsj
                    _this.messageinform.passage=res.data.wz
                    axios.get('http://localhost:8000/getPhotoByjlid',{
                    params:{
                        jlid:_this.id
                    }
                    }).then(res => {
                        _this.ph=res.data
                        var j=0
                        for(j=0;j<_this.ph.length;j++){
                            console.log(res.data[j].zp)
                            _this.messageinform.photourl[j]=res.data[j].zp
                        }
                        axios.post('http://localhost:8000/likecount?jlid='+_this.id)
                        .then(res=>{
                            _this.messageinform.lovenumber=res.data;
                        }).catch(err => {
                            console.log('错误！！！！：'+err)
                        })
                        axios.post('http://localhost:8000/starcount?jlid='+_this.id)
                        .then(res=>{
                            _this.messageinform.starnumber=res.data;
                        }).catch(err => {
                            console.log('错误！！！！：'+err)
                        })
                        axios.get('http://localhost:8000/user/getUserByNamelog/'+_this.messageinform.username)
                        .then(res=>{
                            _this.messageinform.userUrl=res.data.tx;
                        }).catch(err => {
                            console.log('错误！！！！：'+err)
                        })
                    }).catch(err => {
                        console.log('错误！！！！：'+err)
                    })
                }).catch(err => {
                    console.log('错误111：'+err)
                })
            console.log("看这里！！！！！：")
            console.log(this.messageinform)
        },   
        guanZhu() {
            if(localStorage.getItem("yhid")){
                axios.get('http://localhost:8000/isfollow',{//查成功
                    params:{
                        zyhid:localStorage.getItem("yhid"),
                        fsid:2,
                    }
                }).then(res => {
                    console.log(res.data)
                    if(res.data=="wu"){
                        axios.get('http://localhost:8000/addfollow',{
                            params:{
                                zyhid:localStorage.getItem("yhid"),
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
                                zyhid:localStorage.getItem("yhid"),
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
                                zyhid:localStorage.getItem("yhid"),
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
            }
            else{
                this.$router.push({
                name: 'content',
            })
            }
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
        loggotohome(){
            const _this=this
            this.$router.push({
                name: 'user',
                params: {
                    yhid: _this.yhid,
                }
            })
        },
    }

}
</script>

<style scoped>
body {
    margin: 0;
}
.logbox{
    width: 1440px;
    height: 768px;
    font-size: 21px;
    font-family: ZTSJ-BaguetteFont;
    font-weight: 400;
    color: #000000;
}
.logmainbox{
    width: 1440px;
    height: 675px
}
.logcard{
    width: 900px;
    min-height: 520px;
    background: #FDF0E3;
    margin-left: 270px;
}
.loguserinfobox{
    width: 300px;
    height: 100px;
    display: flex;
    flex-direction: row;
    margin-left: 23px;
}
.infoleft{
    display: flex;
    flex-direction: column;
}
.infoup{
    display: flex;
    flex-direction: row;
}
.userimag{
    margin-top: 17px; 
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
.username{
    margin-top: 47px;
    margin-left: 15px;
}
.guanzhu{
    background-color:#f8cb9e ;
    margin-top: 47px;
    margin-left: 15px;
    border-radius: 15px;
}
.datetime{
    margin-top: 15px;
    margin-left: 15px;
}
.messagecont{
    margin-top: 30px;
    margin-left: 138px;
    margin-right: 100px;
}
.messageimgs{
    width: 662px;
    margin-left: 138px;
    margin-right: 100px;
    margin-top: 10px;
}
.messageimg{
    width: 218px; 
    height: 150px;
    padding:1px;
    object-fit: cover;
}
.logfoot{
    width: 350px;
    margin-left: 520px;
    display: flex;
    flex-direction: row;
}
</style>
