<style lang="scss" scope>
    ul {
        list-style: none;
        padding:0px;
        margin:0px;
        li{
            display: inline-block;
            a{
                color: #fff;
                margin-right: 15px;
                text-shadow: 0px 1px 3px #333333;
                transition: color 200ms ease;
                margin-right: 15px;
                text-decoration: none;
                font-size:12px;
                &:visited{
                    color:#fff;
                }
                &:hover{
                    user-select:none;
                    color:#FF8525;
                }
            }
        }
    }
</style>

<template lang="jade">
div
    ul
        li( v-for="tab in tabset",
            track-by="$index",
            :class="{active: $index === active}",
            @click.prevent="choose($index, tab)")
            a(href="javascript:;")
                {{tab.header}}
    div.tab
        slot
</template>

<script>
export default {
    data() {
        return {
            tabset: [],
            active: 0
        }
    },
    methods: {
        choose(index, el){
            this.active = index
        }
    }
}
</script>
