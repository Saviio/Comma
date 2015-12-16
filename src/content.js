
var operation = require('./operation'),
    ITEM = {
        url  : null,
        data : null
    }

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'PAGE_INIT') {
        sendResponse(true)
    }

    switch(msg.type){
        case "SHOW_DETAIL":
            operation.showDetail(ITEM)
            break
        case "PAGE_INIT":
            //console.log('PAGE_INIT')
            break
        case "DETAIL_CLOSE":
            break
        default:
            break
    }
})


operation.init(ITEM)
