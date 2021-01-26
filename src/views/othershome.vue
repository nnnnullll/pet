<template>
  <div class="othershomebox">
    <!-- 布局 -->
    <el-row :gutter="20" style="padding-top:15px">  
      <!-- 右 -->
      <el-col  :span="2"  class="g-content b-purple"></el-col>
      <!-- 中 -->
      <el-col  :span="20"  class="g-content b-purple">
        <!-- 用户上栏 -->
        <el-row :gutter="20" style="padding-top:15px">  
          <!-- 头像 -->
          <el-col style="padding-left:30px" :span="2.5"><el-avatar :size="70" :src="userUrl"></el-avatar></el-col>
          <!-- 用户名 粉丝数 -->
          <el-col :span="2.5"><div class="grid-content bg-purple"> 
            <div style="font-size:20px;padding-top:5px" class="username">{{username}}</div>
            <div  style="font-size:20px;padding-top:5px" class="fennumber">粉丝数{{fennumber}}个</div> 
          </div></el-col>
          <!-- 关注按钮 -->
          <el-col :span="4"><div class="grid-content bg-purple"> 
            <div style="font-size:20px;padding-top:5px" class="username">
              <el-button @click="guanzhu(username)">+关注</el-button>
            </div>
          </div></el-col>
        </el-row>
        <!-- 分割线 -->
        <el-divider ></el-divider>
        <el-row :gutter="20" style="padding-top:15px">  
          <!-- 记录卡 -->
          <el-col  :span="16"  class="g-content b-purple">
            <el-card class="boxinner-card" v-for="(messageinfo,index) in messageinform" :key="messageinfo.key" >
              <!-- 用户信息 -->
              <el-row :gutter="20" style="padding-top:15px">  
                <el-col style="padding-left:20px" :span="2.5"><el-avatar :size="50" :src="userUrl"></el-avatar></el-col>
                <el-col :span="4"><div class="grid-content bg-purple"> 
                  <div style="font-size:15px;padding-top:5px" class="username">{{username}}</div>
                  <div  style="font-size:10px;padding-top:5px" class="fennumber">{{messageinfo.datatime}}</div> 
                </div></el-col>
              </el-row>
              <!-- 记录内容 -->
              <div class="demo-image__preview">
                <div  class="text item">
                  <!-- {{messageinfo.passage}} -->
                  <!-- 文字内容 -->
                  <div>
                    <div class='container' :class="messageinfo.fold? 'fold' : 'unfold'">{{messageinfo.passage}}</div>
                    <div style="color:blue" v-show="messageinfo.big">
                      <span @click='handleFold(index)' v-show="messageinfo.fold">点击展开</span>
                      <span @click='handleFold(index)' v-show="!messageinfo.fold">收起</span>
                    </div>
                  </div>
                </div>
                <el-image  v-for="(photo) in messageinfo.photourl" :key="photo.key" 
                  style="width: 100px; height: 100px;padding:1px"
                  :src="photo"
                  :preview-src-list="messageinfo.photourl"
                  fit="cover">
                </el-image>
              </div>
              <!-- 按钮 -->
              <el-row :gutter="20" style="padding-top:15px">  
                <el-col  :span="13"  class="grid-content bg-purple"></el-col>
                <el-col  :span="4.5"  class="grid-content bg-purple">
                  <el-button @click="starplus(index)" ><div style="font-weight:bold;color:rgb(223, 172, 7)" >⭐{{messageinfo.starnumber}}  {{messageinfo.isstar}}</div></el-button>
                </el-col>
                <el-col  :span="4.5"  class="grid-content bg-purple">
                  <el-button @click="loveplus(index)" ><div style="font-weight:bold;color:rgb(230, 78, 78)" >❤{{messageinfo.lovenumber}}  {{messageinfo.islove}}</div></el-button>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <!-- 宠物卡 -->
          <el-col  :span="4"  class="g-content b-purple">
            <el-card class="pet-card" v-for="(petinfo) in petinform" :key="petinfo.key" >
              <!-- 用户信息 -->
              <el-row :gutter="20" style="padding-top:15px">  
                <el-col style="padding-left:20px" :span="2.5"><el-avatar :size="50" :src="petinfo.petUrl"></el-avatar></el-col>
                <el-col style="padding-left:20px" :span="2.5"><div >{{petinfo.petname}}</div><div >品种:{{petinfo.petclass}}</div></el-col>
                <el-col style="padding-left:20px" :span="2.5"><div >{{petinfo.petsex}}<div >{{petinfo.petdata}}</div></div></el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <!-- 左 -->
      <el-col  :span="2"  class="g-content b-purple"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name:'othershome',
  data() {
    return {
      userUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      username:"用户名",
      fennumber:"12",
      messageinform:[{
        passage:"这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字",
        big:true,
        fold : true,
        datatime:"2020-12-26",
        photourl: [
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
        ],
        lovenumber:15,
        islove:"喜欢",
        starnumber:9,
        isstar:"收藏"},
        {
        passage:"这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字",
        big:false,
        fold : true,
        datatime:"2020-12-26",
        photourl: [
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
        ],
        lovenumber:15,
        islove:"喜欢",
        starnumber:9,
        isstar:"收藏"},
        {
        passage:"这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字这是一段示例文字",
        big:true,//要存入时数据库判断它的长度是否超过一个值
        fold : true,
        datatime:"2020-12-26",
        photourl: [
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
        ],
        lovenumber:15,
        islove:"喜欢",
        starnumber:9,
        isstar:"收藏"},

      ],
      petinform: [{
        petUrl:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        petname:"喵喵",
        petsex:"女",
        petdata:"2020-12-14",
        petclass:"猫"
      },
      {
        petUrl:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        petname:"喵喵",
        petsex:"女",
        petdata:"2020-12-04",
        petclass:"猫"
      }]
    }   
  },
  methods:{
    handleFold(index) {
      this.messageinform[index].fold = !this.messageinform[index].fold;
    },
    guanzhu(username) {
      console.log(username)
      // 这里要改数据库关注
      // 如果没登录跳转到登录页面
    },
    loveplus(index) {
       if(
        this.messageinform[index].islove=="已喜欢"){
        this.messageinform[index].lovenumber--;
        this.messageinform[index].islove="喜欢"
      }
      else{
        this.messageinform[index].lovenumber++;
        this.messageinform[index].islove="已喜欢"
      }
      // 这里还要改数据库点赞数增加
      // 如果没登录跳转到登录页面
    },
    starplus(index) {
      if(this.messageinform[index].isstar=="已收藏"){
        this.messageinform[index].starnumber--;
        this.messageinform[index].isstar="收藏"
      }
      else{
        this.messageinform[index].starnumber++;
        this.messageinform[index].isstar="已收藏"
      }
      // 这里还要改数据库点赞数增加
      // 如果没登录跳转到登录页面
    },
  }
}
</script>

<style >
/* card */
  .text {
    font-size: 14px;
  }
  .item {
    padding: 10px 0;
  }
  .boxinner-card {
    width: 680px;
  }
/* petcard */
  .pet-card {
    width: 330px;
  }
/* 用户栏 */
  .el-row {
    margin-bottom: 1px;   
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: white;
  }
  .bg-purple {
    background: white;
  }
  .bg-purple-light {
    background: white;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 50px;
  }
  .row-bg {
    padding: 1px 0;
    background-color: white;
  }

  .b-purple-dark {
    background:  white;
  }
  .b-purple {
    background:  white;
  }
  .b-purple-light {
    background:  white;
  }
  .g-content {
    border-radius: 4px;
    min-height: 50px;
  }
.container {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.container.fold {
  -webkit-line-clamp: 2;
}
.container.unfold {
  -webkit-line-clamp: 100;
}
</style>