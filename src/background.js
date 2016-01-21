import { SHOW_ASIDE, PAGE_INIT, REMOVE_ASIDE } from './Action.js'

let noop = () => {}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.active) {
        chrome.tabs.sendMessage(tab.id, { type: PAGE_INIT }, noop)
    }
})

let asideExpanded = false
chrome.browserAction.onClicked.addListener((tab, changeInfo) => {
    if(!asideExpanded){
        chrome.tabs.sendMessage(tab.id, { type: SHOW_ASIDE }, noop)
    } else {
        chrome.tabs.sendMessage(tab.id, { type: REMOVE_ASIDE }, noop)
    }

    asideExpanded = !asideExpanded
})


chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    if(message === REMOVE_ASIDE || message === PAGE_INIT){
        asideExpanded = false
    }
})
