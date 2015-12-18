

var connect = require('./connect')
var append  = require('./append')
var helper  = require('./helper')

var DOM  = document
var WIN  = window
var BODY = DOM.body

var website={
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

function init(ref, acc){

    acc = acc || 0
    var type = null
    for(var i in website){
        if(website[i].re.test(WIN.location.href)){
            type = website[i]
            break
        }
    }

    if(type === null) return


    var info = DOM.querySelectorAll(type.selector)
    if(info == null && acc<3){
        setTimeout(init(ref, acc++), 1000)
    } else if(info.length >= 1) {
        var i = null
        while(i = info.pop()){
            var ret = i.innerText.match(/ISBN[:|：]\W?(\d{10,})/)
            if(!ret || ret.length < 1) continue

            connect('GET','https://api.douban.com/v2/book/isbn/' + ret[1])
                .then(function(data){
                    ref.payload = data
                    ref.url = 'https://api.douban.com/v2/book/isbn/' + ret[1]
                    append(data, type)
                },function(e){
                    append(null, type)
                })
            break
        }
    }
}


function showCard(ref){
    if(ref.payload == null) return
    var extensionOrigin = 'chrome-extension://' + chrome.runtime.id

    if (!location.ancestorOrigins.contains(extensionOrigin) && document.querySelector('#__shudianerplugin__') === null) {
        var iframe = document.createElement('iframe')
        iframe.src = chrome.runtime.getURL('bookcard.html')
        iframe.id = '__shudianerplugin__'

        iframe.style.cssText =    'position:fixed;'
                                + 'top:60px;'
                                + 'right:-200px;'
                                + 'display:block;'
                                + 'width:300px;'
                                + 'height:500px;'
                                + 'z-index:1000;'
                                + 'border:none;'
                                + 'transition:right 350ms ease-out;'

        document.body.appendChild(iframe)

        iframe.onload = function() {
            iframe.style.right = '40px'
            iframe.contentWindow.postMessage(ref, '*')
        }

        var listener = function(e){
            
        }
    }
    //var iframe = '<iframe src="{{0}} style="{{1}}"></iframe>"'
}





exports.init = init
exports.showCard = showCard
