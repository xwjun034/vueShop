<template>
  <div class="page">
    <div class="reviews-main">
      <div class="reviews-title">商品评价（{{total}}）</div>
      <div class="reviews-wrap">
        <div class="reviews-list" v-for="(item,index) in reviewsData" :key="index">
          <div class="uinfo">
            <div class="head">
              <img :src="item.head" />
            </div>
            <div class="nickname">{{item.nickname}}</div>
          </div>
          <div class="reviews-content">
            {{item.content}}
          </div>
          <div class="reviews-date">{{item.times}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      gid:this.$route.query.gid?this.$route.query.gid:'',
      page:1,
      reviewsData:[],
      total:0,
    }
  },
  created(){
    this.getReviewsData()   
  },
  methods:{
    getReviewsData(){
        this.axios({
           url:'http://vueshop.glbuys.com/api/home/reviews/index?gid='+this.gid+'&token=1ec949a15fb709370f&page='+this.page,
           method:'GET'
        })
        .then((res)=>{
           this.reviewsData = res.data.data;
           this.total = res.data.pageinfo.total;
        })
        .catch((err)=>{
           console.log('err',err)
        })
      } 
  }
};
</script>
<style lang="less">
.page {
  margin-top: 1.2rem;
}
.reviews-main{width:100%;background-color: #FFFFFF;margin-top:0.5rem;overflow:hidden;padding-bottom: 0.5rem}
    .reviews-main .reviews-title{color:#7b7f82;font-size:0.32rem;width:90%;margin:0 auto;margin-top:0.2rem;}
    .reviews-main .reviews-wrap{width:90%;margin:0 auto;}
    .reviews-main .reviews-wrap .reviews-list{width:100%;margin-top:0.4rem;}
    .reviews-main .reviews-list .uinfo{width:100%;display:flex;display:-webkit-flex;height:0.6rem;align-items: center;-webkit-align-items: center;}
    .reviews-main .reviews-list .uinfo .head{width:0.6rem;height:0.6rem;margin-right:0.2rem;}
    .reviews-main .reviews-list .uinfo .head img{width:100%;height:100%;border-radius: 100%;}
    .reviews-main .reviews-list .uinfo .nickname{width:auto;font-size:0.28rem;}
    .reviews-main .reviews-list .reviews-content{width:100%;margin:0 auto;font-size:0.28rem;margin-top:0.2rem;}
    .reviews-main .reviews-list .reviews-date{width:auto;font-size:0.28rem;color:#7b7f82;margin-top:0.2rem;}
    .reviews-main .reviews-more{width:2.44rem;height:0.56rem;border:solid 1px #D50A17;line-height:0.56rem;text-align:center;font-size:0.28rem;margin:0 auto;margin-top:0.5rem;border-radius: 0.1rem;}
</style>