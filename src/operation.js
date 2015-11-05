

var connect = require('./connect')
var appendToDOM = require('./appendToDOM')

function init(ref){
    var info = document.querySelectorAll('#parameter2 > li')
    if(info != null && info.length > 2){
        var ISBN = info[1].innerText.split('：').pop()

        connect('GET','https://api.douban.com/v2/book/isbn/'+ISBN)
        .then(function(data){
            ref['data'] = data
            appendToDOM(data)
        },function(e){
            appendToDOM(null)
        })
    }
}





exports.init=init
