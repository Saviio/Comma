<style lang="sass" src="./app.scss" ></style>

<template lang="jade">
div#app
    div#btn-close(v-on:click="close") ×
    view(:info="info", :image="image")
    tabs(id="tab", :dbid="fetchReviews")
        tab(header="简介")
            div(v-if="payload != null")
                div#topic
                    div.title
                        {{payload.title}}
                    span.rating
                        {{payload.rating.average}}分
                div#summary
                    {{{transform(summary)}}}
            div.notfound(v-else)
                img(src="./img/notfound.png")
        tab(header="书评", id="reviews", v-if!="reviews.length > 0")
            slider
                slider-item(v-for="review in reviews", track-by="$index")
                    div.review
                        div.avatar
                            img(:src="review.author.avatar", width="47px", height="47px")
                        div.sep
                            div.point
                            div.point
                            div.point
                        div.content(v-on:click="openTab(review.alt)")
                                {{{transform(review.summary)}}}
</template>

<script>
import view from './components/view.vue'
import tabs from './components/tabs.vue'
import tab from './components/tab.vue'
import slider from './components/slider.vue'
import sliderItem from './components/sliderItem.vue'
import { rules, assert } from './rules.js'



export default {
    data() {
        return {
            reviews: []
        }
    },
    props:['payload', 'dbid', 'url', 'close'],
    components: {
        sliderItem,
        slider,
        view,
        tabs,
        tab
    },
    computed:{
        summary(){
            let summary = this.payload.summary
            let charcount = 2
            let index = 0

            while(charcount / 19 <= 8 && index < summary.length){
                if(/[a-z0-9]/i.test(summary[index])) charcount+=0.5
                else if(summary[index] === '\n') charcount+= 21
                else charcount+=1
                index++
            }

            return  summary.substr(0, index) + '...'
        },
        info(){
            let list = []
            if(!this.payload) return list
            for(let key in rules){
                rules[key].forEach(r => {
                    let value = this.payload[r.name]
                    if(!assert(r, value)) return
                    list = [
                        ...list, {
                            label: r.label,
                            value: r.computed
                                ?  r.computed(value)
                                :  value
                        }
                    ]
                })
            }
            return list.slice(0, 6)
        },
        image(){
            let images = this.payload && this.payload.images
            return images && images.large
                ? images.large
                : './img/placeholder.png'
        },
        fetchReviews(){
            let reviewAPI = `https://api.douban.com/v2/book/${this.dbid}/reviews`
            fetch(reviewAPI)
                .then(res => res.ok
                        ? res.json().then(json => json.reviews)
                        : [])
                .then(reviews => this.reviews = reviews)

            return this.dbid
        }
    },
    methods:{
        transform(src){
            return src.replace(/[\r\n|\n]?(.*)[\r\n|\n]?/g, ($0,$1) =>
                        $1 !== "" ? "<p class='paragraph'>" + $1 + "</p>" : "")
        },
        openTab(url){
            window.open(url)
        }
    }
}
</script>
