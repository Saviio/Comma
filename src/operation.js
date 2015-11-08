

var connect = require('./connect')
var appendToDOM = require('./appendToDOM')
var helper=require('./helper')

var DOM=document
var WIN=window
var BODY=DOM.body

function init(ref, delay){
    var info = document.querySelectorAll('#parameter2 li')
    if(info == null && !delay)
        setTimeout(init(ref,true),1000)
    else if(info.length>=1) {
        var param=[].filter.call(info,function(evt){
            return evt.innerText.indexOf('ISBN')>-1
        })[0]

        if(param==undefined)
            return

        var ISBN=param.innerText.split('：').pop()

        connect('GET','https://api.douban.com/v2/book/isbn/'+ISBN)
        .then(function(data){
            ref['data'] = data
            appendToDOM(data)
        },function(e){
            appendToDOM(null)
        })
    }
}

function showDetail(ref){
    if(ref.data===null || ref.data===undefined)
        return

    var iframe='<iframe src="{{0}} style="{{1}}"></iframe>"'

}





exports.init=init
exports.showDetail=showDetail
