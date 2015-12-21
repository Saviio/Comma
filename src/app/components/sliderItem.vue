<style lang="scss" scoped>
    .sliderItem{
        height: 100%;
        position: absolute;
        width: 100%;
        top: 0px;
    }

    .sideIn-enter{
        animation:sideIn 0.3s ease-out;
    }

    .sideIn-leave{
        animation:sideOut 0.3s ease-out;
    }

    @keyframes sideIn{
        0% {
            right:-300px;
        }
        100%{
            right:0px;
        }
    }

    @keyframes sideOut{
        0% {
            left:0px;
        }
        100%{
            left:-300px;
        }
    }
</style>

<template lang="jade">
div.sliderItem(:class="{hide:!show}",
    v-show="show",
    transition="sideIn")
    slot
</template>

<script>
    export default{
        data(){
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
            this.$parent.contents = [
                ...this.$parent.contents, this.$el
            ]
        },
        ready(){
            let $children = this.$parent.$children
            for(var i = 0; i < $children.length; i++){
                if($children[i].$el === this.$el){
                    this.index = i
                    break
                }
            }
        }
    }
</script>
