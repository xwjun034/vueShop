<template>
    <div>
        <div style="width:100%;height:350px;">
            <my-banner :imgs="images"></my-banner>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import Banner from '@/components/banner';
Vue.use(Banner)
export default {
    data(){
        return{
            images:[]
        }
    },
    created(){
        // 异步状态
        setTimeout(()=>{
            this.images = [
                {image: require('@/assets/images/ban/banner1.jpg')},
                {image: require('@/assets/images/ban/banner2.jpg')},
               {image: require('@/assets/images/ban/banner3.jpg')}
            ]
        },300)
    }
}
</script>
<style lang="less">

</style>