// 首页
<template>
    <div class="homebox">
        <!-- 首栏 -->
        <v-top></v-top>
        <!-- 插画 -->
        <img class="longpets" :src="longpets" >
        <!-- logo栏 -->
        <div class="homelogos">
            <!-- 分栏 -->
            <img @click="home_goto('pethome')" class="homelogo1" :src="logo1" >
            <img @click="home_goto('knowledgecard')" class="homelogo23" :src="logo2">
            <img @click="home_goto('hospital')" class="homelogo23" :src="logo3">
            <!-- 分区 -->
            <div class="homelans">
                <img @click="home_gotosearch('1')" class="homelan1" :src="lan1"> <!-- 萌宠日常 -->
                <img @click="home_gotosearch('2')" class="homelan2" :src="lan2"> <!-- 学习训练 -->
            </div>
            <div class="homelans">
                <img @click="home_gotosearch('3')" class="homelan3" :src="lan3"> <!-- 喂养贴士 -->
                <img @click="home_gotosearch('4')" class="homelan4" :src="lan4"> <!-- DIY课堂 -->
            </div>
            <!-- 分类 -->
            <div class="homefenqus">
                <div class="homefenqus1">
                    <div  v-for="lan in lans1" :key="lan.key">
                        <span @click="home_gotosearch(lan)">{{lan}}</span>
                    </div>
                </div>
                <div class="homefenqus1">
                    <div  v-for="lan in lans2" :key="lan.key">
                        <span @click="home_gotosearch(lan)">{{lan}}</span>
                    </div>
                    <el-popover
                        placement="bottom"
                        min-width="150"
                        trigger="click">
                        <div class="homefenqus2_col">
                            <div v-for="(lan3,index) in lans3" :key="lan3.key">
                                <div class="homefenqu2_row">
                                    <div  v-for="lan in lans3[index]" :key="lan.key">
                                        <div class="fenqu2lan" @click="home_gotosearch(lan)">{{lan}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span slot="reference">更多</span>
                    </el-popover>
                </div>
            </div>
            <img @click="home_goto('book')" class="book" :src="book">
        </div>
        <div class="homebuttom">
            <div class="homeleft">
                <!-- 轮播 --> 
                <div class="homepicsbox">
                    <el-carousel :interval="4000" type="card" arrow="hover" height="250px" autoplay="autoplay" ref="carousel">
                    <el-carousel-item v-for="lunbo in lunbolist" :key="lunbo">
                        <img :src="lunbo">
                    </el-carousel-item>
                    </el-carousel>
                </div>
                <!-- 推荐 -->
                <div class="hometuijianbox">
                    <div class="tuijiantitlebox">
                        <img class="title1" :src="title1">
                        <img class="title15" :src="title15">
                    </div>
                    <div @click="home_gotolog(tuijian.jlid)" v-for="(tuijian,index) in tuijianlist_pic"  :key="tuijian.key" >
                        <div  class="tuijianitembox_pic">
                            <img class="tuijianpic" :src="tuijian.url">
                            <div class="tuijianright">
                                <div class="tuijiantextbox">
                                    <div class='tuijiantext'>{{tuijian.txt}}</div>
                                </div>
                                <div class="tuijianinfobox">
                                    <img class="tuijianuserurl" :src="tuijian.userurl">
                                    <div class="tuijianinfotxt">{{tuijian.username}}</div>
                                    <div class="tuijianinfotxt">{{tuijian.datatim}}</div>
                                </div>
                                <div class="rightbottombox">
                                    <img class="tuijianstar" :src="star">
                                    <div>收藏</div>
                                    <img  class="tuijianlove" :src="love">
                                    <div>喜欢</div>
                                </div>
                            </div>
                        </div>
                        <div class="tuijianline"></div>
                    </div>
                    <div @click="home_gotolog(tuijian2.jlid)" v-for="tuijian2 in tuijianlist_video"  :key="tuijian2.key" >
                        <div  class="tuijianitembox_video">
                            <div class="tuijianvideo">
                                <video-player class="video-player vjs-custom-skin"
                                    muted
                                    ref="videoPlayer"
                                    :playsinline="true"
                                    :options="playerOptions">
                                </video-player>
                            </div>
                            <div class="tuijianright2">
                                <div class="tuijiantextbox2">
                                    <div class='tuijiantext'>{{tuijian2.txt}}</div>
                                </div>
                                <div class="tuijianinfobox2">
                                    <img class="tuijianuserurl" :src="tuijian2.userurl">
                                    <div class="tuijianinfotxt">{{tuijian2.username}}</div>
                                    <div class="tuijianinfotxt">{{tuijian2.datatim}}</div>
                                </div>
                                <div class="rightbottombox2">
                                    <img class="tuijianstar" :src="star">
                                    <div>收藏</div>
                                    <img  class="tuijianlove" :src="love">
                                    <div>喜欢</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 热榜 -->
            <div class="homerebangbox">
                <img class="title2" :src="title2">
                <div class="hotbox">
                    <div @click="home_gotolog(hot.hotid)" v-for="(hot,index) in hotlist" :key="hot.key" class="hotitem">
                        <span class="hotid">{{index+1}}</span>
                        <img  class="hotpic" :src="hot.hotpic">
                        <div class="hottextbox">
                            <div class='hottext'>{{hot.hottext}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import vTop from '../components/topselect'
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
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
            lan1:require("@/assets/img/home_lan_richang.png"),
            lan2:require("@/assets/img/home_lan_xunlian.png"),
            lan3:require("@/assets/img/home_lan_tieshi.png"),
            lan4:require("@/assets/img/home_lan_diy.png"),
            book:require("@/assets/img/home_title_book.png"),
            title2:require("@/assets/img/home_title_hot.png"),
            title1:require("@/assets/img/home_title_tuijian.png"),
            title15:require("@/assets/img/home_title_huan.png"),
            star:require("@/assets/img/star.png"),
            love:require("@/assets/img/love.png"),
            lans1:['猫咪','兔子','狗狗','仓鼠','乌龟'],
            lans2:['鱼类','鸟类','昆虫','爬宠'],
            lans3:[
                ['猫咪','兔子','狗狗','仓鼠','乌龟'],
                ['猫咪','兔子','狗狗','仓鼠','乌龟'],
                ['猫咪','兔子','狗狗','仓鼠','乌龟'],
                ['猫咪','兔子','狗狗','仓鼠','乌龟'],
                ['猫咪','兔子','狗狗','仓鼠','乌龟'],
                ['猫咪','兔子'],
            ],
            lunbolist:[
                'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
                'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
            ],
            hotlist:[
                {
                    hotid:12,
                    hotpic:'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                    hottext:'示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文'
                },
                {
                    hotid:23,
                    hotpic:'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                    hottext:'文字示例文字示例文字示例文字示例文字示例文'
                },
                {
                    hotid:11,
                    hotpic:  'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
                    hottext:'字例文字示例文字示例文'
                },
                {
                    hotid:14,
                    hotpic: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                    hottext:'示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文'
                },
                {
                    hotid:2,
                    hotpic:'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                    hottext:'示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文'
                },
                {
                    hotid:1,
                    hotpic:'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                    hottext:'示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文'
                },
                {
                    hotid:3,
                    hotpic: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                    hottext:'示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文'
                },
                {
                    hotid:4,
                    hotpic:'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
                    hottext:'示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文'
                },
                 {
                    hotid:8,
                    hotpic:'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
                    hottext:'示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文'
                },
                {
                    hotid:9,
                    hotpic:'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                    hottext:'示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文'
                },
            ],
            tuijianlist_pic:[
                {
                    jlid:1,
                    url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    txt:'测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
                    userurl:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    username:'用户名',
                    datatim:'2020-12-01',
                    starnum:'',
                    lovenum:'',
                },
                {
                    jlid:12,
                    url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    txt:'测试',
                    userurl:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    username:'用户名',
                    datatim:'2020-12-01',
                    starnum:'',
                    lovenum:'',
                },
                {
                    jlid:1,
                    url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    txt:'测试',
                    userurl:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    username:'用户名',
                    datatim:'2020-12-01',
                    starnum:'',
                    lovenum:'',
                }
            ],
            tuijianlist_video:[
                {
                    jlid:13,
                    txt:'测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
                    userurl:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    username:'用户名',
                    datatim:'2020-12-01',
                    starnum:'',
                    lovenum:'',
                },
            ] ,
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
                    src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' //url地址
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
      watch: {
        '$route'(to,from){
            console.log(to);
            // this.getJlData();//换成你的方法
            this.$router.go(0);

        }
    },
    methods:{
        home_goto(e){
            this.$router.push('/'+e);
        },
        home_gotosearch(e){
            console.log(e),
            this.$router.push({
                name: 'search',
                params: {
                homesearch: e,
                }
            })
        },
        home_gotolog(e){
            console.log(e),
            this.$router.push({
                name: 'Petlog',
                params: {
                    jlid: e,
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
.homebox{
    width: 1440px;
    height: 1360px;
    font-size: 21px;
    font-family: ZTSJ-BaguetteFont;
    font-weight: 400;
    color: #000000;
}
/* 上  */
.longpets{
    margin-top:4px;
}
/* LOGOS 1192 126+20*/
.homelogos{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    height: 126px;
    width: 1192px;
    margin-left: 124px;
}
.homelogo1{
    margin-top: 0px;
    width:93px;
    height:106px
}
.homelogo23{
    margin-top: 0px;
    width:93px;
    height:106px
}
.homelans{
    margin-top: 0px;
    width: 150px;
    height: 103px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.homefenqus{
    width: 300px;
    height: 103px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.homefenqus1{
    width: 300px;
    height: 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.homefenqus2_col{
    min-width: 250px;
    display: flex;
    flex-direction: col;
}
.homefenqus2_row{
    min-width: 250px;
    display: flex;
    flex-direction: row;
}
.fenqu2lan{
    padding: 5px;
}
.book{
    widows: 105px;
    height: 126px;
    margin-top: 0px;
}
/* 下 1192*/
.homebuttom{
    margin-top: 10px;
    width: 1192px;
    margin-left: 124px;
    display: flex;
    flex-direction: row;
}
/* 左711 */
.homeleft{
    width: 721px;
    margin-left: 0px;
    display: flex;
    flex-direction: column;
}
/* 轮播图 711*/
.homepicsbox{
    width: 721px;
    height: 250px;
    background:white;
}
/* 推荐 */
/* 推荐title */
.hometuijianbox{
    margin-top: 10px;
    width: 721px;
    height: 619px;
}
.tuijiantitlebox{
    display: flex;
    flex-direction: row;
    width: 721px;
    height: 79px;
    justify-content: space-between;
}
.title1{
    width: 242px;
    height: 79px;
}
.title15{
    width: 139px;
    height: 40px;
    margin-top: 27px;
}
/* 推荐图片 */
.tuijianitembox_pic{
    width: 711px;
    height: 126px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
}
.tuijianpic{
    width: 178px;
    height: 116px;
}
/* 左右间隔20px */
.tuijianright{
    width: 513px;
    height: 116px;
    display: flex;
    flex-direction: column;
}
.tuijiantextbox{
    width: 513px;
}
.tuijiantext {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    word-wrap:break-word;
    word-break:break-all; 
}
.tuijianinfobox{
    margin-top: 5px;
    height: 40px;
    width: 220px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 18px;
}
.tuijianuserurl{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.tuijianinfotxt{
    margin-top: 10px;
}
.rightbottombox{
    width: 130px;
    height: 21px;
    margin-left: 360px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 18px;
}
.tuijianstar{
    width: 21px;
    height: 21px;
}
.tuijianlove{
    width: 21px;
    height: 21px;
}
.tuijianline{
    width: 721px;
    height: 1px;
    background: #E4DBD4;
}
/* 推荐视频 */
.tuijianitembox_video{
    margin-top: 10px;
    width: 711px;
    height: 194px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.tuijianvideo{
    width: 338px;
    height: 194px;
    background-color: white;
}

/* 左右间隔20px */
.tuijianright2{
    width: 353px;
    height: 116px;
    display: flex;
    flex-direction: column;
}
.tuijiantextbox2{
    width: 353px;
}
.tuijianinfobox2{
    margin-top: 5px;
    height: 40px;
    width: 220px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 18px;
}
/* 视频宽度比照片宽170  370-170=200 */
.rightbottombox2{
    width: 130px;
    height: 21px;
    margin-left: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 18px;
}
/* 热榜471+10 */
.homerebangbox{
    margin-left: 40px;
    width: 431px;
    height: 975px;
    display: flex;
    flex-direction: column;
}
.title2{
    width: 204px;
    height: 50px;
}
.hotbox{
    margin-top: 20px;
    width: 431px;
    height: 877px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.hotitem{
    width: 431px;
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.hotid{
    width: 10px;
    height: 70px;
}
.hotpic{
    width:130px;
    height: 80px;
    object-fit: cover;
}
.hottextbox{
    margin-top: 5px;
    width: 247px;
    height: 55px;
}
.hottext {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    word-wrap:break-word;
    word-break:break-all; 
}
</style>