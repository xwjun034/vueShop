<template>
    <div class="banner-wrap" @mouseover="stop()" @mouseout="paly()">
        <transition name="banner">
             <div class="slide" v-for="(item,index) in imgData" v-show="item.checked" :key="index"><img :src="item.image" /></div>
        </transition>
        <div class="spot-wrap">
            <div :class="{spot:true,active:item.checked}" v-for="(item,index) in imgData" :key="index" @click="changeImg(index)"></div>
        </div>
    </div>
</template>
<script>
export default {
    name:'my-banner',
    data(){
        return{
            imgData:[]
        }
    },
    props:{
        imgs:{
            type:Array,
            require:true
        }
    },
    created(){
        this.play();
    },
    destroyed(){ // 页面离开时销毁定时器
      this.stop();
    },
    methods:{
        // 点击事件
       changeImg(index){
           this.index = index;
           if(this.imgData.length>0){
               for(let i=0;i<this.imgData.length;i++){
                   if(this.imgData[i].checked){
                       this.imgData[i].checked = false;
                       break;
                   }  
               }
              this.imgData[this.index].checked = true; 
              this.$set(this.imgData,this.index,this.imgData[this.index]); // 解决数据更新 视图更新 this.$set("数组"，"下标"，"值")
              // console.log(this.imgData[index])
           }
       },
       // 停止动画
       stop(){
           clearInterval(this.timer)
       },
       // 启动动画
       play(){
           // 自动轮播
        this.index = 0;
        this.timer=setInterval(()=>{
            if(this.index<this.imgData.length - 1){
                this.index++;
            }else{
                this.index = 0;
            }
            this.changeImg(this.index)
        },3000)
       }
    },
    watch:{
        // 异步监听
       imgs:{
           handler(val){
               this.imgData = [...val]; //使用浅拷贝解决引用类型问题
               if(this.imgData.length>0){
                   for(let i=0;i<this.imgData.length;i++){
                       console.log(val)
                       if(i===0){
                           this.imgData[i].checked = true; // 添加checked 状态
                       }else{
                           this.imgData[i].checked = false;
                       } 
                   }
               }   
           }
       } 
    }
}
</script>
<style lang="less">
 .banner-wrap{width: 100%;height:100%;position: relative;z-index: 1;}
 .banner-wrap .slide{width: 100%;height: 100%;position:absolute;z-index: 1;left:0;top:0;}
 .banner-wrap .slide img{width: 100%;height: 100%;}
 .spot-wrap{position:absolute;bottom:8%;left:50%;transform:translateX(-50%);z-index: 1;}
 .spot-wrap .spot{width:30px;height:8px;background-color:rgba(0,0,0,0.6);display:inline-block;margin:0px 3px;cursor: pointer;}
 .spot-wrap .spot.active{background-color:rgba(255,255,255,0.6);}
 .banner-enter-active,.banner-enter-active{transition: all 1s;}
 .banner-enter{opacity: 0;}
 .banner-enter-to{opacity: 1;}
 .banner-leave{opacity: 1;}
 .banner-leave-to{opacity: 0;}
</style>