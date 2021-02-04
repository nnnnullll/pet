<template>
    <div class="logbox">
        <!-- 首栏 -->
        <v-top class="top"></v-top>
        <div class="logmainbox"  >
            <div class="logcard">
                <div class="loguserinfobox">
                    <img @click="log_gotouser" class="userimag" :src="messageinform.userUrl">
                    <div class="infoleft">
                        <div class="infoup">
                            <span @click="log_gotouser" class="username">{{messageinform.username}}</span>
                            <span @click="guanZhu" class="guanzhu">{{guanzhu}}</span>
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
            messageinform:{
                messagenum:0,
                username:"",
                datatime:"",    
                passage:"",
                userid:"",
                userUrl:'',
                lovenumber:0,
                starnumber:0,
                islove:"喜欢",
                isstar:"收藏",
                photourl: [],
            },
            ph:{}
        }
    },
    activated:function(){
        this.id=this.$route.params.jlid
        this.getJlData()     
    },
    methods:{
        async getJlData() {
            const _this = this
            await axios.get('http://localhost:8000/getShareByjlid',{
                params:{
                    jlid:_this.id
                }
                }).then(async res => {
                    _this.messageinform.photourl=[]
                    _this.messageinform.messagenum=res.data.jlid
                    _this.messageinform.username=res.data.yhm
                    _this.messageinform.datatime=res.data.fbsj
                    _this.messageinform.passage=res.data.wz
                    _this.messageinform.userid=res.data.yhid
                    await axios.get('http://localhost:8000/getPhotoByjlid',{
                    params:{
                        jlid:_this.id
                    }
                    }).then(async res => {
                        _this.ph=res.data
                        var j=0 
                        for(j=0;j<_this.ph.length;j++){
                            _this.messageinform.photourl[j]=res.data[j].zp
                        }
                        await axios.post('http://localhost:8000/likecount?jlid='+_this.id)
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
                        // 关注初始化
                        if(localStorage.getItem("yhid")){
                            const _this=this
                            axios.get('http://localhost:8000/isfollow',{//查成功
                                params:{
                                    zyhid:_this.messageinform.userid,
                                    fsid:localStorage.getItem("yhid"),
                                }
                            }).then(res => {
                                if(res.data=="wu"){
                                    _this.guanzhu="+关注"
                                } 
                                else if(res.data=="1"){
                                    _this.guanzhu="+关注"
                                }
                                else{
                                    _this.guanzhu="已关注"
                                }
                            }).catch(err => {
                            console.log('错误！！！！：'+err)
                            })
                        }
                        else{
                            _this.guanzhu="+关注"
                        }
                        // 喜欢初始化
                        if(localStorage.getItem("yhid")){
                            const _this=this
                            axios.get('http://localhost:8000/islike',{//查成功
                                params:{
                                    yhid:localStorage.getItem("yhid"),
                                    jlid:this.messageinform.messagenum
                                }
                            }).then(res => {
                                if(res.data=="wu"){
                                    _this.messageinform.islove="喜欢"
                                } 
                                else if(res.data=="1"){
                                    _this.messageinform.islove="喜欢"
                                }
                                else{
                                    _this.messageinform.islove="已喜欢"
                                }
                            }).catch(err => {
                            console.log('错误！！！！：'+err)
                            })
                        }
                        else{
                            _this.messageinform.islove="喜欢"
                        }
                        // 收藏初始化
                        if(localStorage.getItem("yhid")){
                            const _this=this
                            axios.get('http://localhost:8000/isstar',{//查成功
                                params:{
                                    yhid:localStorage.getItem("yhid"),
                                    jlid:this.messageinform.messagenum
                                }
                            }).then(res => {
                                if(res.data=="wu"){
                                    _this.messageinform.isstar="收藏"
                                } 
                                else if(res.data=="1"){
                                    _this.messageinform.isstar="收藏"
                                }
                                else{
                                    _this.messageinform.isstar="已收藏"
                                }
                            }).catch(err => {
                            console.log('错误！！！！：'+err)
                            })
                        }
                        else{
                            _this.messageinform.isstar="收藏"
                        }
                    }).catch(err => {
                        console.log('错误！！！！：'+err)
                    })
                }).catch(err => {
                    console.log('错误111：'+err)
                })
                console.log(this.messageinform)
        },   
        guanZhu() {
            const _this=this
            if(localStorage.getItem("yhid")){
                axios.get('http://localhost:8000/isfollow',{//查成功
                    params:{
                        zyhid:_this.messageinform.userid,
                        fsid:localStorage.getItem("yhid"),
                    }
                }).then(res => {
                    console.log(res.data)
                    if(res.data=="wu"){
                        axios.get('http://localhost:8000/addfollow',{
                            params:{
                                zyhid:_this.messageinform.userid,
                                fsid:localStorage.getItem("yhid"),
                                qxgz:0
                            }
                        }).then(res => {
                            console.log(res.data)
                            if(res.data=="success"){
                                alert("关注成功")
                                _this.guanzhu="已关注"
                            } 
                        })
                        .catch(err => {
                            console.log('首关注环节错误：'+err)//
                        })
                    } 
                    else if(res.data=="1"){
                        axios.get('http://localhost:8000/upfollow',{
                            params:{
                                zyhid:_this.messageinform.userid,
                                fsid:localStorage.getItem("yhid"),
                                qxgz:0
                            }
                        }).then(res => {
                            console.log(res.data)
                            if(res.data=="success"){
                                alert("关注成功")
                                _this.guanzhu="已关注"
                            } 
                        })
                        .catch(err => {
                            console.log('再关注环节错误：'+err)//
                        })
                    }
                    else{
                        axios.get('http://localhost:8000/upfollow',{
                            params:{
                                zyhid:_this.messageinform.userid,
                                fsid:localStorage.getItem("yhid"),
                                qxgz:1
                            }
                        }).then(res => {
                            console.log(res.data)
                            if(res.data=="success"){
                                alert("取消关注成功")
                                _this.guanzhu="+关注"
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
        loveplus(index) {
            if(localStorage.getItem("yhid")){
                axios.get('http://localhost:8000/islike', {
                params:{
                    yhid:localStorage.getItem("yhid"),
                    jlid:this.messageinform.messagenum
                }
                }).then(res => {
                console.log(res.data)
                if(res.data=="wu"){
                    axios.get('http://localhost:8000/addlike',{
                    params:{
                        yhid:localStorage.getItem("yhid"),
                        jlid:this.messageinform.messagenum
                    }
                    }).then(res => {
                        console.log(res.data)
                        if(res.data=="success"){
                            this.messageinform.love=false;
                            this.messageinform.islove="已喜欢"
                            this.messageinform.lovenumber++
                        }
                    }).catch(err => {
                        console.log('首关注环节错误：'+err)//
                        })
                }
                else if(res.data=="1"){
                    axios.get('http://localhost:8000/uplike',{
                    params:{
                        yhid:localStorage.getItem("yhid"),
                        jlid:this.messageinform.messagenum,
                        sc:0
                    }
                    }).then(res => {
                        console.log(res.data)
                        if(res.data=="success"){
                            this.messageinform.love=false;
                            this.messageinform.islove="已喜欢"
                            this.messageinform.lovenumber++
                        }
                    }).catch(err => {
                        console.log('再关注环节错误：'+err)//
                        })
                }
                else{
                    axios.get('http://localhost:8000/uplike',{
                    params:{
                        yhid:localStorage.getItem("yhid"),
                        jlid:this.messageinform.messagenum,
                        sc:1
                    }
                    }).then(res => {
                    console.log(res.data)
                    if(res.data=="success"){
                        this.messageinform.love=true;
                        this.messageinform.islove="喜欢"
                        this.messageinform.lovenumber--
                    }
                    }).catch(err => {
                        console.log('取关错误：'+err)
                    })
                }
                }).catch(err => {
                    console.log('查错误：'+err)
                })
            }
            else{
                this.$router.push({
                name: 'content',
                })
            }
        },
        starplus(index) {
            if(localStorage.getItem("yhid")){
                axios.get('http://localhost:8000/isstar', {
                params:{
                    yhid:localStorage.getItem("yhid"),
                    jlid:this.messageinform.messagenum
                }
                }).then(res => {
                console.log(res.data)
                if(res.data=="wu"){
                        axios.get('http://localhost:8000/addstar',{
                        params:{
                            yhid:localStorage.getItem("yhid"),
                            jlid:this.messageinform.messagenum
                        }
                    }).then(res => {
                    console.log(res.data)
                    if(res.data=="success"){
                        this.messageinform.star=false;
                        this.messageinform.isstar="已收藏"
                        this.messageinform.starnumber++
                    }
                    })
                        .catch(err => {
                        console.log('首关注环节错误：'+err)//
                        })
                }
                else if(res.data=="1"){
                    axios.get('http://localhost:8000/upstar',{
                        params:{
                            yhid:localStorage.getItem("yhid"),
                            jlid:this.messageinform.messagenum,
                            sc:0
                    }
                    }).then(res => {
                    console.log(res.data)
                    if(res.data=="success"){
                        this.messageinform.star=false;
                        this.messageinform.isstar="已收藏"
                        this.messageinform.starnumber++
                    }
                    }).catch(err => {
                        console.log('再关注环节错误：'+err)//
                    })
                }
                else{
                    axios.get('http://localhost:8000/upstar',{
                    params:{
                        yhid:localStorage.getItem("yhid"),
                        jlid:this.messageinform.messagenum,
                        sc:1
                    }
                    }).then(res => {
                        console.log(res.data)
                        if(res.data=="success"){
                            this.messageinform.star=true;
                            this.messageinform.isstar="收藏"
                            this.messageinform.starnumber--
                        }
                    }).catch(err => {
                        console.log('取关错误：'+err)
                    })
                }
                }).catch(err => {
                    console.log('查错误：'+err)
                })
            }
            else{
                this.$router.push({
                name: 'content',
                })
            }
        },
        log_gotouser(){
            const _this=this
            this.$router.push({
                name: 'otheruser',
                params: {
                    yhm: _this.messageinform.username
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
    height: 700px;
    font-size: 21px;
    font-family: ZTSJ-BaguetteFont;
    font-weight: 400;
    color: #000000;
}
.logmainbox{
    width:100%;
    height:100%;
    position:relative;
    top:0px;
    left:0;
    right:0;
    bottom:0;
    background-image:url("../assets/img/petshome.png");
    background-repeat:repeat;
    background-attachment:fixed;
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
    width: 400px;
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
    height: 140px;
    padding:1px;
    object-fit: cover;
}
.logfoot{
    width: 350px;
    margin-left: 520px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: row;
}
</style>
