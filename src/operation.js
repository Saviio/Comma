

var connect = require('./connect')
var append  = require('./append')
var helper  = require('./helper')

var DOM  = document
var WIN  = window
var BODY = DOM.body

var website={
    amazon:{
        name:'amazon',
        re:/https?:\/\/.*\.amazon\.c[om|n]/,
        selector:'.bucket > .content > ul > li',
        container:'#dynamicDeliveryMessage_feature_div'
    },
    jd:{
        name:'jd',
        re:/https?:\/\/.*\.jd\.com/,
        selector:'#parameter2 li',
        container:'#summary'
    },
    dangdang:{
        name:'dangdang',
        re:/https?:\/\/.*\.dangdang\.com/,
        selector:'.pro_content > ul.key > li',
        container:'.pinglun'
    }
}

function init(ref, acc){

    acc = acc || 0
    var type = null
    for(var i in website){
        if(website[i].re.test(WIN.location.href)){
            type = website[i]
            break
        }
    }

    if(type === null) return


    var info = DOM.querySelectorAll(type.selector)
    if(info == null && acc<3){
        setTimeout(init(ref, acc++), 1000)
    } else if(info.length >= 1) {
        for(var i = 0; i < info.length; i++){
            var ret = info[i].innerText.match(/ISBN[:|：]\W?(\d{10,})/)
            if(ret && ret.length > 0){
                var ISBN = ret[1]
                connect('GET','https://api.douban.com/v2/book/isbn/' + ISBN)
                    .then(function(data){
                        ref['data'] = data
                        append(data, type)
                    },function(e){
                        append(null, type)
                    })
                break
            }
        }
    }
}


function showDetail(ref){
    if(ref.data === null || ref.data === undefined) return
    
    var iframe = '<iframe src="{{0}} style="{{1}}"></iframe>"'
}





exports.init = init
exports.showDetail = showDetail
