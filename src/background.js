

function noop(){}


chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
        chrome.tabs.sendMessage(tab.id, { type: 'PAGE_INIT' }, noop)
    }
})


chrome.browserAction.onClicked.addListener(function(tab, changeInfo){
    chrome.tabs.sendMessage(tab.id, { type:'SHOW_CARD' }, noop)
})
