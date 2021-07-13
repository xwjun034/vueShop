<template>
    <div>
        <ul>
            <li v-for="(item,index) in datas" :key="index">
               <slot :row="{...item,$index:index}"></slot>
            </li>
        </ul>
        <slot name="user" :users="datas"></slot>
    </div>
</template>
<script>
export default {
    props:{
        datas:{
            type:Array,
            required:true
        }
    },
    mounted() {
        for(let i=0;i<this.datas.length;i++){
            this.datas[i].$index = i;
            let rowSlot = this.$scopedSlots.default({row:this.datas[i]})
            console.log(rowSlot)
        }
  },
}
</script>
<style lang="less">

</style>