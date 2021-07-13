<template>
  <div class="page">
    <div class="search-header">
      <div class="back" @click="goBack()"></div>
      <div class="search">请输入宝贝名称</div>
    </div>
    <div class="goods-main">
      <div ref="scroll-classify" class="classify-wrap">
        <div>
          <div class="classify-item" :class="{active:activeIndex==index}" v-for="(item,index) in cateGoryData" :key="index" @click="selectItem(index,item.cid)" >{{item.title}}</div>
        </div>
      </div>
      <div class="goods-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import isScroll from "@/assets/js/libs/iscroll";
import axios from 'axios';
import URL from "@/serviceAPI.config.js";
export default {
  data() {
    return {
      cateGoryData:[], // 侧边导航栏
      activeIndex:0
    };
  },
  created() {
    this.getCategory()
  },
  methods: {
    // 返回首页
    goBack() {
      this.$router.go(-1);
    },
    scrollPreventDefault(e) {
      e.preventDefault(); // 阻止时间默认行为
    },
    // 导航栏切换
    selectItem(index,cid){
      this.activeIndex=index
      this.getCategory(cid)
      this.$router.replace('/goods/classify-item?cid='+cid+'')
    },
    // 跳转
    replacePage(url,index){
      this.$router.replace(url)
      console.log(index)
      this.selectItem(index)
    },
    // 侧边导航栏数据
    getCategory(cid){
      axios({
        url:URL.getCategory,
        method:'get',
        data:{cid:cid}
      }).then((res)=>{
         this.cateGoryData = res.data.data;
      })
    }
  },
  mounted() {
    // 侧边导航栏滚动
    this.$refs["scroll-classify"].addEventListener(
      "touchmove",
      this.scrollPreventDefault
    );
    this.myScroll = new isScroll(this.$refs["scroll-classify"], {
      scrollX: false,
      scrollY: true,
      preventDefault: false,
    });
  },
};
</script>
<style lang="less" scope>
.page {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.search-header {
  width: 100%;
  height: 1rem;
  background: #ffffff;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  border-bottom: 1px solid #efefef;
}
.search-header .back {
  width: 0.8rem;
  height: 0.8rem;
  background-image: url("~@/assets/images/home/goods/back.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.search-header .search {
  width: 80%;
  height: 0.69rem;
  border: solid 1px #b2b2b2;
  border-radius: 0.1rem;
  font-size: 0.28rem;
  color: #626262;
  line-height: 0.69rem;
  padding-left: 0.2rem;
}

.goods-main {
  width: 100%;
  height: 92.5vh;
  display: flex;
  display: -webkit-flex;
}
.goods-main .classify-wrap {
  width: 1.72rem;
  height: 100%;
  overflow: hidden;
  margin-right: 3%;
  position: relative;
  z-index: 1;
}
.goods-main .classify-wrap .classify-item {
  width: 100%;
  height: 0.8rem;
  border-bottom: 1px solid #efefef;
  background-color: #ffffff;
  font-size: 0.28rem;
  text-align: center;
  line-height: 0.8rem;
  overflow: hidden;
}
.goods-main .classify-wrap .classify-item.active {
  color: #ff0000;
}
.goods-main .goods-content {
  width: 71%;
  height: 100%;
}
</style>