<template>
    <div>
        <subHeader title="购物车" :isBack="$route.query.from==='details'?true:false" />
    </div>
</template>
<script>
import subHeader from '@/components/sub_header';
export default {
    data(){
        return{

        }
    },
    components:{
        subHeader, // 注册组件
    }
}
</script>
<style lang="less">
  
</style>