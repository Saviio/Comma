

var connect = require('./connect')
var appendToDOM = require('./appendToDOM')
var helper=require('./helper')

var DOM=document
var WIN=window
var BODY=DOM.body

var bookstore={
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
    }
}

function init(ref, acc){

    acc=acc || 0
    var type=null
    for(var i in bookstore){
        if(bookstore[i].re.test(window.location.href)){
            type=bookstore[i]
            break
        }
    }

    if(type!==null){
        var info = document.querySelectorAll(type.selector)
        if(info == null && acc<3){
            setTimeout(init(ref, acc++), 1000)
        } else if(info.length >= 1) {

            var ISBN = null
            for(var i = 0;i < info.length; i++){
                var ret=info[i].innerText.match(/ISBN[:|：]\W?(\d{10,})/)
                if(ret && ret.length > 0)
                    ISBN = ret[1]
            }

            if(ISBN != null){
                connect('GET','https://api.douban.com/v2/book/isbn/'+ISBN)
                .then(function(data){
                    ref['data'] = data
                    appendToDOM(data, type)
                },function(e){
                    appendToDOM(null, type)
                })
            }
        }
    }
}



function showDetail(ref){
    if(ref.data===null || ref.data===undefined)
        return

    var iframe='<iframe src="{{0}} style="{{1}}"></iframe>"'
}





exports.init=init
exports.showDetail=showDetail
