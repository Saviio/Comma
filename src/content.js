import * as handler from './handler.js'
import { SHOW_ASIDE, REMOVE_ASIDE } from './Action.js'


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg.type === SHOW_ASIDE){
        handler.showAside()
    } else if(msg.type === REMOVE_ASIDE){
        handler.removeAsideForce()
    }
})


handler.init()
