<template>
  <div ref="goods-classify-content" class="goods-content-main">
    <div>
      <div class="goods-wrap" v-for="(item, index) in categoryData" :key="index">
        <div class="classify-name">{{item.title}}</div>
        <div class="goods-items-wrap">
          <ul v-for="(item2, index2) in item.goods" :key="index2">
            <li>
              <img
                :src="item2.image"
              />
            </li>
            <li>{{ item2.title }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="no-data">没有相关商品！</div>
  </div>
</template>
<script>
import isScroll from "@/assets/js/libs/iscroll";
import axios from 'axios';
import URL from "@/serviceAPI.config.js";
export default {
  data() {
    return {
        categoryData:[], //商品
    };
  },
  created(){
      this.cid = this.$route.query.cid;
      this.$nextTick(()=>{
        this.getCategoryData(this.cid)
      })  
  },
  methods:{
     getCategoryData(cid){
         axios({
             url:URL.getCategoryGoods,
             method:'get',
             data:{cid:cid}
         }).then((res)=>{
             this.categoryData = res.data.data;
             console.log(this.categoryData)
         })
     } 
  }
};
</script>
<style lang="less">
.goods-content-main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  z-index: 1;
}
.goods-wrap {
  width: 100%;
  height: auto;
}
.goods-wrap .classify-name {
  font-size: 0.28rem;
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
  overflow: hidden;
}
.goods-wrap .goods-items-wrap {
  width: 100%;
  height: auto;
  background-color: #ffffff;
  padding-top: 0.2rem;
  overflow: hidden;
}
.goods-wrap .goods-items-wrap ul {
  width: 32%;
  height: auto;
  float: left;
  margin-left: 0.5%;
  margin-right: 0.5%;
  margin-bottom: 0.2rem;
}
.goods-wrap .goods-items-wrap ul li:nth-child(1) {
  width: 1.5rem;
  height: 1.5rem;
  overflow: hidden;
  margin: 0 auto;
  text-align: center;
}
.goods-wrap .goods-items-wrap ul li:nth-child(1) img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.goods-wrap .goods-items-wrap ul li:nth-child(2) {
  width: 90%;
  height: 0.8rem;
  font-size: 0.24rem;
  overflow: hidden;
  text-align: center;
  margin: 0 auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 0.2rem;
}
</style>