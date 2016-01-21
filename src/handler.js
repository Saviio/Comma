
import { append } from './utils.js'
import { REMOVE_ASIDE, PASSING_DATA , PAGE_INIT } from './Action.js'

const DOM  = document
const WIN  = window
const BODY = DOM.body
const ISBNAPI = 'https://api.douban.com/v2/book/isbn/'
const DOUBANPAGE = 'http://book.douban.com/subject/'
const ASIDE_ID = '__commaPlugin__'

let ref = { url: null, payload: null, id: null }

let website = {
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
    },
    dangdang:{
        name:'dangdang',
        re:/https?:\/\/.*\.dangdang\.com/,
        selector:'.pro_content > ul.key > li',
        container:'.pinglun'
    }
}

function fetchData(type){
    var info = [].slice.call(DOM.querySelectorAll(type.selector))
    if(info.length >= 1) {
        var title = DOM.querySelector('title').textContent
        if(title.indexOf('书评') === -1 && title.indexOf('图书') === -1) return

        var i = null
        while(i = info.pop()){
            var ret = i.innerText.match(/ISBN[:|：]\W?(\d{10,})/)
            if(!ret || ret.length < 1) continue

            fetch(ISBNAPI + ret[1])
                .then(res => res.ok ? res.json() : null)
                .then(data => {
                    if(data !== null){
                        ref.payload = data
                        ref.url = DOUBANPAGE + data.id
                        ref.id = data.id
                    }

                    append(data, type)
                })
            chrome.extension.sendMessage(PAGE_INIT)
            break
        }
    }
}

export function init(acc){
    acc = acc || 0
    var type = null
    for(var i in website){
        if(website[i].re.test(WIN.location.href)){
            type = website[i]
            break
        }
    }

    if(type === null) return

    void function(t){
        /interactive|complete/i.test(DOM.readyState)
        ? fetchData(type)
        : DOM.addEventListener('DOMContentLoaded', e => fetchData(type, e))
    }()

}

export function removeAside(e){
    if(e === REMOVE_ASIDE || e.data.type === REMOVE_ASIDE){
        let iframe = DOM.querySelector(`#${ASIDE_ID}`)
        WIN.removeEventListener('message', removeAside)
        WIN.removeEventListener('load', asideLoad)
        iframe.style.right = '-300px'
        setTimeout(() => BODY.removeChild(iframe), 500)
        chrome.extension.sendMessage(REMOVE_ASIDE)
    }
}

export function removeAsideForce(){
    return removeAside(REMOVE_ASIDE)
}

export function asideLoad(){
    let iframe = DOM.querySelector(`#${ASIDE_ID}`)
    iframe.style.right = '40px'
    iframe.contentWindow.postMessage({ type: PASSING_DATA, passing: ref }, '*')
}

export function showAside(){
    var extensionOrigin = 'chrome-extension://' + chrome.runtime.id

    if (!location.ancestorOrigins.contains(extensionOrigin) && DOM.querySelector(`#${ASIDE_ID}`) === null) {
        var iframe = DOM.createElement('iframe')
        iframe.src = chrome.runtime.getURL('app/index.html')
        iframe.id = ASIDE_ID

        iframe.style.cssText = `
            position:fixed;top:60px;right:-200px;z-index:1000;
            display:block;width:300px;height:500px;border:none;
            transition:right 240ms ease-out;
        `
        iframe.addEventListener('load', asideLoad)
        BODY.appendChild(iframe)
        WIN.addEventListener('message', removeAside)
    }
}
