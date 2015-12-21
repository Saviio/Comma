<style lang="scss" scoped>
    .slider{
        position: relative;
        height: 100%;
        width: 100%;
        overflow: hidden;


        span{
            display: block;
            position: absolute;
            &:hover{
                cursor: pointer;
                opacity: 0.8;
            }
            top:40%;
            opacity:0.2;
            transition:opacity 200ms ease;
            z-index:50;
        }

        .left-arrow{
            left:5px;
        }

        .right-arrow{
            right:5px;
        }
    }

</style>

<template lang="jade">
div.slider
    span.left-arrow(v-on:click="prev", v-show="show")
        img(src="./svg/left.svg",width="12px",height="12px")
    span.right-arrow(v-on:click="next", v-show="show")
        img(src="./svg/right.svg",width="12px",height="12px")
    slot
</template>

<script>
export default {
    data() {
        return {
            contents: [],
            active: 0
        }
    },
    computed:{
        show(){
            return this.contents.length > 1
        }
    },
    methods: {
        next(index){
            this.active = this.active === this.contents.length -1 ? 0 : this.active + 1
        },
        prev(index){
            this.active = this.active === 0 ? this.contents.length - 1 : this.active - 1
        }
    }
}
</script>
