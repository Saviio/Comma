(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

function transform(template){

    var dom=document.createElement('div')

    var args=[].slice.call(arguments,1)
    args.forEach(function(e,i){
        var re=new RegExp("\\{\\{"+i+"\\}\\}",'g')
        template=template.replace(re ,function(){
            var t=document.createElement('div')
            t.innerText=e
            return t.innerHTML
        })
    })

    dom.innerHTML=template
    return dom.children.length == 1 ? dom.children[0] : dom.children
}

function appendDoubanLabel(data){

    var ct= data!==null ? "{{0}} 分 (" + (data.rating.numRaters >= 10 ? "{{1}}" : "少于10") + "人评价)" : "抱歉，无法在豆瓣发现对应的书籍资料"

    var template=''
        +'<div id="summary-douban">'
        +'<div class="dt">豆瓣评分：</div>'
        +'<div class="dd">'+ct+'</div>'
        +'</div>'

    var dom=undefined
    if(data!==null)
        dom=transform(template,data.rating.average,data.rating.numRaters)
    else
        dom=transform(template)

    var summary=document.getElementById('summary')
    summary.appendChild(dom)
}


module.exports=appendDoubanLabel

},{}]},{},[1])