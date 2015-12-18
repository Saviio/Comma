
var operation = require('./operation'),
    ITEM = {
        url  : null,
        payload : null
    }

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    switch(msg.type){
        case "SHOW_CARD":
            operation.showCard(ITEM)
            break
        case "REMOVE_CARD":
            break
        default:
            break
    }
})


operation.init(ITEM)
