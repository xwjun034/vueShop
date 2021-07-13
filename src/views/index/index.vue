<template>
  <div class="page">
    
    <div :class="{ header: true, scroll: isScrollTop }">
      <div class="classify-icon" @click="goclassify()"></div>
      <div class="search-wrap" @click="searchShow.show=true">
        <div class="search-icon"></div>
        <div class="text">请输入宝贝名称</div>
      </div>
      <div class="login">登录</div>
    </div>
    <div class="banner-wrap">
      <div class="swiper-container" ref="swiper-container">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item, index) in bannData"
            :key="index"
          >
            <img :src="item.image" alt="" />
          </div>
        </div>
        <div class="swiper-pagination" ref="swiper-pagination"></div>
      </div>
    </div>
    <div class="quick-nav">
      <ul class="item" v-for="(item, index) in navs" :key="index">
        <li>
          <img v-lazy="item.image" />
        </li>
        <li>{{ item.title }}</li>
      </ul>
    </div>
    <template v-for="(item, index) in goods">
      <div class="goods-main" :key="index" v-if="(index + 1) % 2 !== 0">
        <div :class="'classify-name color-' + index">
          —— {{ item.title }} ——
        </div>
        <div class="goods-row-1">
          <div class="goods-column" @click="$router.push('/goods/details/?gid='+(item.items && item.items[0].gid))">
            <div class="goods-title">
              {{ item.items && item.items[0].title }}
            </div>
            <div class="goods-tip">精品打折</div>
            <div class="goods-price bg-color-0">
              {{ item.items && item.items[0].price }}元
            </div>
            <div class="goods-image">
              <img
                v-lazy="item.items && item.items[0].image"
                :alt="item.items && item.items[0].title"
              />
            </div>
          </div>
          <div class="goods-column">
            <div
              class="goods-list"
              v-for="(item, index) in item.items.slice(1, 3)"
              :key="index" @click="$router.push('/goods/details/?gid='+item.gid)"
            >
              <div class="goods-list-title">
                {{ item.title }}
              </div>
              <div class="goods-list-tip">品质精挑</div>
              <div class="goods-list-image">
                <img :src="item.image" :alt="item.title" />
              </div>
            </div>
          </div>
        </div>
        <div class="goods-row-2">
          <div
            class="goods-list"
            v-for="(item, index) in item.items.slice(3, 7)"
            :key="index" @click="$router.push('/goods/details/?gid='+item.gid)"
          >
            <div class="goods-title">
              {{ item.title }}
            </div>
            <div class="goods-image">
              <img :src="item.image" :alt="item.title" />
            </div>
            <div class="price">¥{{ item.price }}</div>
            <div class="price line">¥{{ item.price * 2 }}</div>
          </div>
        </div>
      </div>
      <div class="goods-main" v-else :key="index">
        <div class="classify-name color-1">—— {{ item.title }} ——</div>
        <div class="goods-row-1">
          <div
            class="goods-column-2"
            v-for="(item2, index2) in item.items.slice(0, 2)"
            :key="index2" @click="$router.push('/goods/details/?gid='+item2.gid)"
          >
            <div class="goods-title">{{ item2.title }}</div>
            <div class="goods-tip">火爆开售</div>
            <div class="goods-image">
              <img
                :src="item2.image"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="goods-row-2">
          <div
            class="goods-list"
            v-for="(item2, index2) in item.items.slice(2, 6)"
            :key="index2" @click="$router.push('/goods/details/?gid='+item2.gid)"
          >
            <div class="goods-title">{{ item2.title }}</div>
            <div class="goods-image">
              <img
                :src="item2.image"
                alt=""
              />
            </div>
            <div class="price">¥{{ item2.price }}</div>
            <div class="price line">¥{{ item2.price * 2 }}</div>
          </div>
        </div>
      </div>
    </template>
    <div class="goods-recom-nav">
      <div class="line"></div>
      <div class="recom-wrap">
        <div class="icon"></div>
        <div class="text">为您推荐</div>
      </div>
      <div class="line"></div>
    </div>
    <div class="goods-recom">
      <div class="goods-list" v-for="(item, index) in recomGoods" :key="index" @click="$router.push('/goods/details/?gid='+item.gid)">
        <div class="goods-image">
          <img
            :src="item.image"
            :alt="item.title"
          />
        </div>
        <div class="goods-title">{{ item.title }}</div>
        <div class="goods-price">¥{{ item.price }}</div>
      </div>
    </div>
    <my-search :show="searchShow" />
    <slotTm :datas="users" >
      <template #default="scope">
          姓名：{{scope.row.name}}
          <button type="button" @click="del(scope.row.$index)">删除</button>
      </template>
      <template #user="scope">
         <span v-for="(item,index) in scope.users" :key="index">{{item.name}}<br/></span>
      </template>
    </slotTm>
    <div class="button" @click="deleted()">删除</div>
    <form action="http://www.lucklnk.com" target="_black">
      <div class="button">提交</div>
    </form>
    <!-- <my-confirm></my-confirm> -->
  </div>
</template>
<script>
import Vue from "vue";
import Swiper from "@/assets/js/libs/swiper";
import axios from "axios";
import URL from "@/serviceAPI.config.js";
import mySearch from "@/components/search";
import slotTm from "@/components/slotTm";
import Confirm from "@/components/confirm";
Vue.use(Confirm) // 使用组件

export default {
  data() {
    return {
      isScrollTop: false,
      bannData: [], //banner
      navs: [],
      goods: [],
      recomGoods: [],
      searchShow:{show:false},
      users:[
        {name:'张三',age:14},
        {name:'王五',age:20}
      ]
    };
  },
  created() {
    this.isScroll = true; //只执行一次变色 提高性能
    window.addEventListener("scroll", this.eventScrollTop);
    this.getBanner();
    this.getNavs();
    this.getGoods(); // 商品
    this.getRecomGoods(); // 推荐商品
  },
  mounted() {
   
  },
  methods: {
    eventScrollTop() {
      let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollTop >= 100) {
        if (this.isScroll) {
          this.isScroll = false;
          this.isScrollTop = true;
        }
      } else {
        if (!this.isScroll) {
          this.isScroll = true;
          this.isScrollTop = false;
        }
      }
    },
    // banner
    getBanner() {
      axios({
        url: URL.getBan,
        method: "get",
      }).then((res) => {
        this.bannData = res.data.data;
      });
    },
    // 导航
    getNavs() {
      axios({
        url: URL.getNav,
        method: "get",
      }).then((res) => {
        this.navs = res.data.data;
      });
    },
    // 商品
    getGoods() {
      axios({
        url: URL.getGoods,
        method: "get",
      }).then((res) => {
        this.goods = res.data.data;
        console.log(res)
      });
    },
    // 推荐商品
    getRecomGoods() {
      axios({
        url: URL.getRecomGoods,
        method: "get",
      }).then((res) => {
        this.recomGoods = res.data.data
      });
    },
    // 商品分类
    goclassify(){
       this.$router.push('/goods/classify')
    },
    // 删除
    del(index){
      this.users.splice(index,1)
    },
    deleted(){
      this.$confirm("确认要删除吗？",[
        {
          text:'取消',
          onPress:()=>{
            console.log('取消')
          }
        },
        {
          text:"确认",
          onPress:()=>{
            console.log('确认')
          }
        }
      ])
    }
  },
  watch: {
    bannData() {
      this.$nextTick(() => {
        new Swiper(this.$refs["swiper-container"], {
          autoplay: 3000,
          pagination: this.$refs["swiper-pagination"],
          paginationClickable: true,
          autoplayDisableOnInteraction: false,
        });
      });
    },
  },
  components:{
    mySearch, // 注册组件
    slotTm
  }
};
</script>
<style >
@import "~@/assets/css/common/swiper.css";
.page {
  width: 100%;
  min-height: 100%;
  margin-bottom: 1.5rem;
}
.header {
  width: 100%;
  height: 1rem;
  position: fixed;
  z-index: 10;
  left: 0px;
  top: 0px;
  background: linear-gradient(rgba(1, 1, 1, 0.2), hsla(0, 0%, 100%, 0));
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0.3rem;
  box-sizing: border-box;
}
.header.scroll {
  background: linear-gradient(#eb1625, hsla(0, 0%, 100%, 0));
}
.header .classify-icon {
  width: 0.6rem;
  height: 0.6rem;
  background-image: url("~@/assets/images/common/class.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.header .search-wrap {
  width: 5.26rem;
  height: 0.52rem;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  display: flex;
  align-items: center;
}
.header .search-wrap .search-icon {
  width: 0.44rem;
  height: 0.44rem;
  background-image: url("~@/assets/images/common/search.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}
.header .search-wrap .text {
  font-size: 0.32rem;
  color: #ffffff;
}
.header .login {
  width: auto;
  height: 0.44rem;
  font-size: 0.32rem;
  color: #ffffff;
}
.banner-wrap {
  width: 100%;
  height: 3.66rem;
}
.banner-wrap img {
  width: 100%;
  height: 100%;
}
.quick-nav {
  width: 100%;
  height: 1.6rem;
  background-color: #ffffff;
  margin-top: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 0.2rem;
  box-sizing: border-box;
}
.quick-nav .item {
  width: 1.4rem;
}
.quick-nav .item li:nth-child(1) {
  width: 0.8rem;
  height: 0.8rem;
  margin: 0 auto;
}
.quick-nav .item li:nth-child(1) img {
  width: 100%;
  height: 100%;
}
.quick-nav .item li:nth-child(2) {
  font-size: 0.28rem;
  color: #7b7f82;
  text-align: center;
  margin-top: 0.2rem;
}
.goods-main {
  width: 100%;
  height: 7.36rem;
  background-color: #ffffff;
  margin-top: 0.2rem;
}
.goods-main .classify-name {
  width: 100%;
  height: 0.64rem;
  border-bottom: 1px solid #efefef;
  font-size: 0.32rem;
  text-align: center;
  line-height: 0.64rem;
}
.goods-main .classify-name.color-0 {
  color: #f73b61;
}
.goods-main .classify-name.color-1 {
  color: #fe6719;
}
.goods-main .classify-name.color-2 {
  color: #5fc600;
}
.goods-main .goods-row-1 {
  width: 100%;
  height: 3.5rem;
  border-bottom: 1px solid #efefef;
  display: flex;
  overflow: hidden;
}
.goods-main .goods-row-1 .goods-column,
.goods-main .goods-row-1 .goods-column-2 {
  width: 50%;
  height: 100%;
  border-right: 1px solid #efefef;
  position: relative;
}
.goods-main .goods-row-1 .goods-column .goods-title {
  width: 95%;
  height: 0.32rem;
  overflow: hidden;
  position: absolute;
  left: 0.2rem;
  top: 0.2rem;
  font-size: 0.28rem;
  font-weight: bold;
}
.goods-main .goods-row-1 .goods-column .goods-tip {
  width: auto;
  height: auto;
  font-size: 0.28rem;
  color: #cb385d;
  position: absolute;
  left: 0.2rem;
  top: 0.6rem;
}
.goods-main .goods-row-1 .goods-column .goods-price {
  width: auto;
  height: 0.4rem;
  border-radius: 10px;
  position: absolute;
  right: 1rem;
  top: 0.6rem;
  color: #ffffff;
  font-size: 0.28rem;
}
.goods-main .goods-row-1 .goods-column .goods-price.bg-color-0 {
  background-color: #f21d4f;
}
.goods-main .goods-row-1 .goods-column .goods-price.bg-color-2 {
  background-color: #5fc600;
}
.goods-main .goods-row-1 .goods-column .goods-image {
  width: 3rem;
  height: 2rem;
  position: absolute;
  left: 0.35rem;
  bottom: 0.3rem;
}
.goods-main .goods-row-1 .goods-column .goods-image img {
  width: 100%;
  height: 100%;
}
.goods-main .goods-row-1 .goods-column .goods-list {
  width: 100%;
  height: 50%;
  border-bottom: 1px solid #efefef;
  position: relative;
}
.goods-main .goods-row-1 .goods-column .goods-list-title {
  width: 2.04rem;
  height: 0.32rem;
  overflow: hidden;
  font-size: 0.28rem;
  font-weight: bold;
  position: absolute;
  z-index: 1;
  left: 0.2rem;
  top: 0.2rem;
}
.goods-main .goods-row-1 .goods-column .goods-list-tip {
  width: auto;
  height: auto;
  font-size: 0.24rem;
  color: #7b7f82;
  position: absolute;
  left: 0.2rem;
  top: 0.6rem;
}
.goods-main .goods-row-1 .goods-column .goods-list-image {
  width: 1.2rem;
  height: 1.2rem;
  position: absolute;
  right: 0.2rem;
  top: 0.2rem;
}
.goods-main .goods-row-1 .goods-column .goods-list-image img {
  width: 100%;
  height: 100%;
}

.goods-main .goods-row-1 .goods-column-2 .goods-title {
  width: 95%;
  height: 0.32rem;
  overflow: hidden;
  font-size: 0.28rem;
  font-weight: bold;
  text-align: center;
  margin: 0 auto;
  margin-top: 0.2rem;
}
.goods-main .goods-row-1 .goods-column-2 .goods-tip {
  width: auto;
  height: auto;
  font-size: 0.28rem;
  color: #7b7f82;
  text-align: center;
  margin-top: 0.1rem;
}
.goods-main .goods-row-1 .goods-column-2 .goods-image {
  width: 1.8rem;
  height: 2rem;
  margin: 0 auto;
  margin-top: 0.1rem;
}
.goods-main .goods-row-1 .goods-column-2 .goods-image img {
  width: 100%;
  height: 100%;
}
.goods-main .goods-row-2 {
  width: 100%;
  height: 3.2rem;
  overflow: hidden;
  display: flex;
}
.goods-main .goods-row-2 .goods-list {
  width: 25%;
  height: 100%;
  border-right: #efefef 1px solid;
}
.goods-main .goods-row-2 .goods-title {
  width: 100%;
  height: 0.4rem;
  overflow: hidden;
  font-size: 0.28rem;
  font-weight: bold;
  text-align: center;
  margin-top: 0.2rem;
}
.goods-main .goods-row-2 .goods-image {
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 auto;
  margin-top: 0.2rem;
}
.goods-main .goods-row-2 .goods-image img {
  width: 100%;
  height: 100%;
}
.goods-main .goods-row-2 .price {
  width: 100%;
  height: auto;
  text-align: center;
  font-size: 0.28rem;
  color: #d32a4e;
  margin-top: 0.1rem;
}
.goods-main .goods-row-2 .price.line {
  color: #7b7f82;
  text-decoration: line-through;
  margin-top: 0px;
}
.goods-recom-nav {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.goods-recom-nav .line {
  width: 35%;
  height: 1px;
  background-color: #d4d4d4;
}
.goods-recom-nav .recom-wrap {
  width: 1.8rem;
  height: 0.44rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.goods-recom-nav .recom-wrap .icon {
  width: 0.4rem;
  height: 0.4rem;
  background-image: url("~@/assets/images/home/index/recom.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.goods-recom-nav .recom-wrap .text {
  width: auto;
  height: auto;
  font-size: 0.32rem;
  font-weight: bold;
}
.goods-recom {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px 0.2rem;
  box-sizing: border-box;
  flex-wrap: wrap;
}
.goods-recom .goods-list {
  width: 48%;
  height: 4.5rem;
  background-color: #ffffff;
  margin-top: 0.2rem;
}
.goods-recom .goods-list .goods-image {
  width: 2.8rem;
  height: 2.8rem;
  margin: 0 auto;
  margin-top: 0.2rem;
}
.goods-recom .goods-list .goods-image img {
  width: 100%;
  height: 100%;
}
.goods-recom .goods-list .goods-title {
  width: 96%;
  height: 0.8rem;
  padding:0 2%;
  overflow: hidden;
  font-size: 0.28rem;
  margin-top: 0.1rem;
}
.goods-recom .goods-list .goods-price {
  width: auto;
  height: auto;
  font-size: 0.32rem;
  color: #d32a4e;
  margin-top: 0.1rem;
  padding:0 2%;
}
</style>