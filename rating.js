

function EMPTY(){}



chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
        chrome.tabs.sendMessage(tab.id, {text: 'PAGE_INIT'}, EMPTY);
    }
})
