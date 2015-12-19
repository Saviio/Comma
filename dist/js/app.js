var source = null
var card = {
    el:'#app',
    data: {
        payload:{
            image:'https:\/\/img1.doubanio.com\/lpic\/s28342657.jpg',
            author:[],
            publisher:'北京联合出版公司',
            subtitle:'梵高书信、画作、珍贵手稿',
            pubdate:'2016-1',
            translator:["57°N艺术小组"],
            pages:'416',
            title:'梵高手稿',
            rating:'8.0',
            summary:"梵高一生中写过很多信，大多数都是寄给弟弟提奥的，也有不少是写给家人和其他艺术家的，如保罗•高更与埃米尔•伯纳德。梵高一生中也画了很多画，而基本上每一幅都被他在信中用如诗般优美的语言细细描述过。\n【内容简介】\n自学画画的梵高，对自己的不足十分了解，但正如他在信中所言，只要坚持下去费解哎快乐到死解放路可打算减肥了侃大山交罚款了大数据量咖啡骄傲的顺口溜放假了侃大山"
        }
    },
    computed:{
        translators:function(){
            return this.payload.translator.join(' / ')
        },
        authors:function(){
            return this.payload.author.join(' / ')
        },
        abstract:function(){
            var summary = this.payload.summary
            if(summary && summary.length >= 124) {
                summary = summary.substr(0, 124) + '...'
            }

            return  summary.replace(/\n?(.*)\n?/g,function($0,$1){return "<p>" + $1 + "</p>"})
        }
    },
    methods:{
        close:function(){
            source.postMessage({type:'CLOSE_CARD',data:null}, '*')
        }
    }
}

new Vue(card)


window.addEventListener('message', function(e){
    if(e.data.payload == null) return
    card.data.payload = e.data.payload
    if(!source) source = e.source
    console.log(e.data)
})
