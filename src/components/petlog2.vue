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
                <div class="tuijianvideo">
                    <video-player class="video-player vjs-custom-skin"
                        muted
                        ref="videoPlayer"
                        :playsinline="true"
                        :options="playerOptions">
                   </video-player>
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
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
export default {
    name: "Petlog2",
    components:{
        vTop,
        videoPlayer
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
            ph:{},
            playerOptions: {
                playbackRates : [ 0.5, 1.0, 1.5, 2.0 ], //可选择的播放速度
                autoplay : 'muted', //如果true,浏览器准备好时开始回放。
                //muted : true, // 默认情况下将会消除任何音频。
                loop : true, // 视频一结束就重新开始。
                preload : 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language : 'zh-CN',
                aspectRatio : '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid : false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    type: "video/mp4", // 类型
                    src: '' //url地址
                }],
                poster: '', // 封面地址
                notSupportedMessage : '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar : {
                    timeDivider : true,//当前时间和持续时间的分隔符
                    durationDisplay : true,//显示持续时间
                    remainingTimeDisplay : false,//是否显示剩余时间功能
                    fullscreenToggle : true  //全屏按钮
                }
            }, 
        }
    },
    activated:function(){
        this.id=this.$route.params.jlid
        this.getJlData()     
    },
    methods:{
        getJlData() {
            const _this = this
            axios.get('http://localhost:8000/getShareByjlid',{
                params:{
                    jlid:_this.id
                }
                }).then(res => {
                    _this.messageinform.messagenum=res.data.jlid
                    _this.messageinform.username=res.data.yhm
                    _this.messageinform.datatime=res.data.fbsj
                    _this.messageinform.passage=res.data.wz
                    _this.messageinform.userid=res.data.yhid
                    axios.get('http://localhost:8000/getVideoByjlid',{
                    params:{
                        jlid:_this.id
                    }
                    }).then(res => {
                        console.log(res.data)
                        _this.ph=res.data
                        _this.playerOptions.sources[0].src=res.data.sp
                        _this.playerOptions.poster=res.data.fm
                        // console.log(_this.playerOptions.sources.src)
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
                        // 关注初始化
                        if(localStorage.getItem("yhid")){
                            const _this=this
                            axios.get('http://localhost:8000/isfollow',{//查成功
                                params:{
                                    zyhid:_this.messageinform.userid,
                                    fsid:localStorage.getItem("yhid"),
                                }
                            }).then(res => {
                                console.log(res.data)
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
                                console.log(res.data)
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
                                console.log(res.data)
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
            console.log("看这里！！！！！：")
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
                    yhm: _this.messageinform.username,
                    yhid: _this.messageinform.userid,
                    tx:_this.messageinform.userUrl
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
.tuijianvideo{
    margin-left: 138px;
    margin-right: 100px;
    margin-top: 10px;
    width: 662px;
    height: 372px;
    background-color: white;
}
.logfoot{
    width: 350px;
    margin-top: 10px;
    margin-left: 520px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: row;
}
</style>
