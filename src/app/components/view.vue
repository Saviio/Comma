<style lang="scss" scoped>
.blur {
    filter: blur(10px);
}

#header{
    position: relative;
    height: 250px;
    overflow: hidden;
    box-shadow: 0px 1px 50px #000 inset,0 .5px 10px rgba(0, 0, 0, 0.63);
    border-radius: 4px;
}

#backgound{
    height: 250px;
    width: 100%;
    background-position:center;
    position: absolute;
    z-index: 1;
}

#mask{
    height: 260px;
    position:absolute;
    top: 0px;
    z-index: 10;
    width: 100%;
    opacity: 0.35;
    background-color: black;
}

#pic{
    left: 20px;
    height: 160px;
    width: 110px;
    background-color: #fff;
    position: absolute;
    z-index: 20;
    top:25px;
    box-shadow: 0px 2px 7px #272727;
    img{
        width: 100%;
        height: 100%;
    }
}


#info{
    height: 160px;
    width: 130px;
    position: absolute;
    right: 10px;
    top: 25px;
    z-index: 20;
    font-size: 12px;
    color: #fff;
    padding-top: 5px;
    ul{
        margin: 0px;
        padding: 0px;
        list-style: none;
        li{
            margin-bottom: 6px;
            width: 130px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-shadow: 0px 1px 1px #333333;
            color:#F7F7F7;
        }
    }
}
</style>

<template lang="jade">
div#header
    div#mask
    div#backgound(class="blur",:style="{ backgroundImage: 'url('+image+')'}")
    div#pic(v-if="image != './img/placeholder.png'")
        img(:src="image")
    div#info
        ul
            li(v-for="item in info", track-by="$index")
                {{item.label}} : {{item.value}}
</template>

<script>
export default {
    props:['info', 'image']
}
</script>
