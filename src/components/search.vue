<template>
  <div class="building">
    <v-top></v-top>
    <div class="bottom">
      <div class="search" style="display: flex;flex-direction: row;justify-content: center">
        <input class="s-search-text" type="text" placeholder="猜你喜欢" id="s-search-text" ref="searchval">
        <div class="webitem5" style="display: flex;flex-direction: row;justify-content: center" @click="search">
          <p class="text1">搜索</p>
          <img :src="searchicon">
        </div>
      </div>

      <div class="lead" style="display: flex;flex-direction: row;justify-content: center">
        <div class="nav-box" >
          <!-- 导航列表 -->
          <li class="nav-item"
              v-for="(item, index) in nav"
              @click="routerLink(index, item.path)"
              :key="index">
            <!-- 判断高亮表 -->
            <p :class=" navIndex === index ? 'item-cn item-cn-active' : 'item-cn'">
              {{ item.title }}
            </p>
          </li>
        </div>
        <img :src="laycat" class="laycat">
      </div>
      <div class="line"></div>
      <div class="resnum" style="display: flex;flex-direction: row;justify-content: center">共找到4位饲养员  |  按相关度排序 </div>
      <div v-for="(user,index) in Sort" :key="index">
          <usercomp  @getflag="getflag" :id="index" :flag="user.flag" :photo="user.photo" :circleurl="user.circleurl" :name="user.username" :num="user.num" :information="user.info" :count="user.count"></usercomp>
      </div>
    </div>
  </div>
</template>

<script>
const axios=require('axios');
import usercomp from "./Testcomp/Testcomp"
import vTop from "@/components/topselect";
export default {
  name: "search",
  components: {
    usercomp,
    vTop
  },
  data() {
    return {
      user: {
        input: '',
        password: '',
      },
      searchcontent:'',
      imgUrl:require("@/assets/img/img1.png"),
      userimg:require("@/assets/img/userimg.png"),
      searchicon:require("@/assets/img/searchicon.png"),
      laycat:require("@/assets/img/laycat.png"),
      num:4,
      id:'',
      //users表示后端返回的模糊查询的四个用户信息，包括用户名、粉丝数、动态数、最近一条动态和最近三张照片
      users:[
        {username:'张三',
          num:132,
          count:10,
          flag:true,
          circleurl:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=757545797,2214471709&fm=11&gp=0.jpg",
          info:"今天天气真好，和主人逛gai~",
          photo:[],
        },
        {username:'李四',
          num:412,
          count:8,
          flag:true,
          circleurl:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=757545797,2214471709&fm=11&gp=0.jpg",
          info:"啊今天睡了懒觉真开心",
          photo:[]
        },
        {username:'王五',
          num:23,
          count:53,
          flag:true,
          circleurl:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1549131754,2955370505&fm=26&gp=0.jpg",
          info: "昨天下雨了汪汪汪汪汪汪～汪汪汪汪汪汪～汪汪汪汪汪汪～汪汪汪汪汪汪～汪汪汪汪汪汪～汪汪汪汪汪汪～汪汪汪汪汪汪～",
          photo: []
        },
        {username:'赵六',
          num:732,
          count: 946,
          flag:true,
          circleurl:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3562519436,2223863513&fm=26&gp=0.jpg",
          info:"热情随和，活波开朗！",
          photo: []
        },
      ],
      useridtmp:[],
      nav: [
        {title: '用户',path: '/search'},
        {title: '专栏', path: '/lan'}
      ],
      navIndex: 0
    }
  },
  methods:{
    // 接收页面跳转得参数
    getRouterData() {
      // 接收top栏参数  
      console.log(this.$route.params.topsearch)
      //接收home页参数  因为栏用1 2 3 4 标志所以必须和top分开避免相同
      console.log( this.$route.params.homesearch)
    },
    getflag:function(id,flag){
      this.users[id].flag=flag;
    },
    getinfo:function (label){
      console.log(label);
      this.section=label;
      alert(this.section);
    },
    gotolan(){
      this.$router.push('/lan');
    },
    search () {
      let searchText = this.$refs.searchval.value
      console.log(searchText)
      if (searchText =='') {
        return
      } else {
        // this.closeState = true
        // this.searchState.showsug = true
        // this.searchState.searchtext = this.$refs.searchval.value
        // this.$emit('searchstate', this.searchState)
        axios.post('http://localhost:8000/user/search',
            {
              username: searchText,
              zyhid:localStorage.getItem("yhid")
            })
            .then((res) => {
              //console.log(res)
              if (res.status == 200) {
                //this.$emit用于向父组件传值
                console.log(res.data)
                for (let i=0; i<3; i++){
                  this.users[i].username=res.data.user[i].yhm;
                  this.users[i].info=res.data.share[i];
                  //this.users[i].flag=res.data.follow[i];
                  var k=0,j;
                  for(j=0;j<res.data.photo[i].length;j++){
                    if(res.data.photo[i][j].zp){
                      this.users[i].photo[k]=res.data.photo[i][j].zp;
                      k++;
                    }
                  }
                  let tmp=res.data.user[i].yhid;
                  this.useridtmp[i]=res.data.user[i].yhid;
                  ///////////////
                  axios.get('http://localhost:8000/isfollow',{//查成功
                    params:{
                      zyhid:localStorage.getItem('yhid'),
                      fsid:tmp
                    }
                  }).then(res => {
                    console.log(res.data)
                    if(res.data=="wu"){
                      this.users[i].flag=false;
                    }
                    else if(res.data=="1"){
                      this.users[i].flag=false;
                    }
                    else{
                      this.users[i].flag=true;
                    }
                  })
                      .catch(err => {
                        console.log('查错误：'+err)
                      })
                  ///////////////
                  axios.post('http://localhost:8000/share?yhid='+tmp).then((response)=>{
                    console.log(response)
                    if(response){
                      var data=response.data;
                      this.users[i].count=data
                    }
                    else{
                      alert('查询失败，请重试！')
                    }
                    axios.post('http://localhost:8000/follow?zyhid='+tmp).then((response)=>{
                      console.log(response)
                      if(response){
                        var data=response.data;
                        this.users[i].num=data
                      }
                      else{
                        alert('查询失败，请重试！')
                      }
                    }).catch(function (error) { // 请求失败处理
                      console.log("---查询出错---！"+error);
                    })
                  }).catch(function (error) { // 请求失败处理
                    console.log("---查询出错---！"+error);
                  })

                }
              }
            })
            .catch((err) => {
              console.log(err)
            })
        this.$forceUpdate()
      }
    },
    guanZhu() {
      axios.get('http://localhost:8000/isfollow',{//查成功
        params:{
          zyhid:localStorage.setItem('yhid'),
          fsid:tmp
        }
      }).then(res => {
        console.log(res.data)
        if(res.data=="wu"){
          axios.post('http://localhost:8000/addfollow',{
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
          axios.post('http://localhost:8000/upfollow',{
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
          axios.post('http://localhost:8000/upfollow',{
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
    //通过当前yhid查询数据库中发布动态数和粉丝数
    find(){
      let _this = this;
      var tmp=localStorage.getItem("yhid")
      console.log(tmp)
      axios.post('http://localhost:8000/share?yhid='+tmp).then((response)=>{
          console.log(response)
          if(response){
            var data=response.data;
            console.log(data);
            alert('查询成功');
            _this.num=data
            console.log(_this.num)
          }
          else{
            alert('查询失败，请重试！')
          }
        }).catch(function (error) { // 请求失败处理
          console.log("---查询出错---！"+error);
        })
      axios.post('http://localhost:8000/follow?zyhid='+tmp).then((response)=>{
        console.log(response)
        if(response){
          var data=response.data;
          console.log(data);
          alert('查询成功');
          _this.fans=data
          console.log(_this.fans)
        }
        else{
          alert('查询失败，请重试！')
        }
      }).catch(function (error) { // 请求失败处理
        console.log("---查询出错---！"+error);
      })
    },
    /**
     * 路由跳转
     * @param index
     * @param link
     */
    routerLink(index, path) {
      // 点击哪个路由就赋值给自定义的下下标
      this.navIndex = index;
      // 路由跳转
      this.$router.push(path)
    },

    /**
     * 检索当前路径
     * @param path
     */
    checkRouterLocal(path) {
      // 查找当前路由下标高亮
      this.navIndex = this.nav.findIndex(item => item.path === path);
    }
  },
  mounted() {

  },
  watch: {
    "$route"() {
      // 获取当前路径
      let path = this.$route.path;
      // 检索当前路径
      this.checkRouterLocal(path);
    }
  },
  computed:{
    Sort:function(){
      var temp=this.users;
      return temp
      //return sortKey(temp,'num');
    }
  }
}
function sortKey(array,key){
  return array.sort(
      function(a,b){
        var x = a[key];
        var y = b[key];
        return ((x>y)?-1:(x<y)?1:0)
  })
}
</script>

<style scoped>
body {
  margin: 0;
}
.building{
  width: 1440px;
  height: 1300px;
}
.tab{
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 1%;
}
.webtitle{
  flex: 0 0 196px;
  flex-shrink: 0;
  margin-right: 35px;
  margin-left: 27px;
  margin-top: 15px;
  width: 196px;
  height: 20px;
  font-size: 36px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #4FA1F4;
  opacity: 0.91;
}
.webitem1{
  flex: 0 0 46px;
  flex-shrink: 0;
  width: 46px;
  height: 23px;
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #030303;
  margin-right: 2%;
  margin-top: 2%;

}
.webitem2{
  flex: 0 0 46px;
  flex-shrink: 0;
  margin-right: 0.7%;
  margin-top:2%;
  width: 43px;
  height: 22px;
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;

}
.img{
  margin-left: 42px;
  margin-top: 19px;
  margin-right: 12px;
  margin-bottom: 13px;
  flex: 0 0 35px;
  width: 35px;
  height: 45px;
}
.webitem3{
  flex: 0 0 116px;
  flex-shrink: 0;
  margin-top: 2%;
  margin-right: 4%;
  width: 116px;
  height: 23px;
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;

}
.text1{
  flex: 0 0 45px;
  width: 45px;
  height: 23px;
  font-size: 22px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #2E3232;
  flex-shrink: 0;
  margin-top: 10%;
  margin-left: 5%;
}
.s-search-text{
  flex: 0 0 373px;
  flex-shrink: 0;
  margin-top: 1.5%;
  width: 373px;
  height: 41px;
  background: #B6B6B6;
  opacity: 0.3;
  box-sizing: border-box;
}
.webitem5{
  width: 86px;
  height: 41px;
  background: #F4F4F4;
  margin-top: 1.5%;

}

.webitem6{
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #030303;
  margin-right: 1%;
  margin-left: 0.5%;
  margin-top: 2%;
  position: absolute;
  right: 10%;
}
.webitem7{
  font-size: 23px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #030303;
  margin-top: 2%;
  position: absolute;
  right: 7%;
}
.circle2img{
  margin-left: 5%;
  background: #f6deca;
  border-radius: 50%;
  width:4.8%;
  height: 4.8%;
}
.search{
  margin-top: 1%;
}
.userimg{
  position: absolute;
  right: 16%;
}
.line{
  width: 768px;
  height: 2px;
  opacity: 0.55;
  background: #000000;
  position: absolute;
  left: 24%;
}
.lan{
  width: 48px;
  height: 23px;
  font-size: 24px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;
  margin-right: 14%;
  margin-left: 6%;
}
.user{
  width: 48px;
  height: 22px;
  font-size: 24px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #66ABF5;
  margin-right:3%;
}
.selectedline{
  width: 101px;
  height: 4px;
  background:  #66ABF5;
  position: absolute;
  left: 51%;
}
.lead{
  padding-top:2% ;
}
.resnum{
  font-size: 18px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #a9a8a8;
  position: absolute;
  left: 25%;
  margin-bottom: 0.5%;
  margin-top: 1%;
}



.nav-box {
  display: flex;
}

.nav-item {
  text-align: center;
  padding: 0 32px;
  position: relative;
  display: inline-block;
  font-size: 14px;
  line-height: 25px;
}

/*导航普通状态*/
.item-cn {
  color: #1c2438;
  font-weight: 800;
  width: 50px;
  height: 23px;
  font-size: 24px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;

}


/*导航高亮*/
.item-cn-active {
  color: #2d8cf0;
  width: 50px;
  height: 23px;
  font-size: 24px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;

}

.nav-item:hover .item-cn {
  color: #2d8cf0;
}
.nav-item:after {
  position: absolute;
  right: 0;
  top: 20px;
  content: '';
  width: 1px;
  height: 16px;
  background-color: #f8f8f8;
}
.nav-item:after:last-child {
  width: 0;
}


</style>
