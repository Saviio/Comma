<style lang="scss" scoped>
    .tab-panel{
        display: block;
        height: 203px;
    }
</style>

<template lang="jade">
div.tab-panel(
    :class="{hide:!show}",
    v-show="show",
    transition="fadein")
    slot
</template>

<script>
export default {
    props:['header'],
    data() {
        return {
            index: 0
        }
    },
    computed:{
        show(){
            return this.$parent.active === this.index
        }
    },
    created(){
        this.$parent.tabset = [
            ...this.$parent.tabset, {
                header: this.header
            }
        ]
    },
    ready(){
        let $children = this.$parent.$children
        for(var i=0; i < $children.length; i++){
            if($children[i].$el === this.$el){
                this.index = i
                break
            }
        }
    }
}
</script>
