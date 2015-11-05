
var
     BOOK_ENTITY = null
    ,connect = require('./connect')
    ,appendToDOM = require('./appendToDOM')

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'PAGE_INIT') {
        sendResponse(true)
    }

    switch(msg.type){
        case "SHOW_DETAIL":
            console.log('SHOW_DETAIL')
            break;
        case "PAGE_INIT":
            console.log('PAGE_INIT')
            break;
        default:
            break;
    }
})


function init(){
    var info = document.querySelectorAll('#parameter2 > li')
    if(info != null && info.length > 2){
        var ISBN = info[1].innerText.split('：').pop()
        connect('GET','https://api.douban.com/v2/book/isbn/'+ISBN)
        .then(function(data){
            BOOK_ENTITY = data
            appendToDOM(data)
        },function(e){
            appendToDOM(null)
        })
    }
}


init()
