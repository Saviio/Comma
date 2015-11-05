(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


function transform(template){

    var dom = document.createElement('div')

    var args = [].slice.call(arguments,1)
    args.forEach(function(e,i){
        var re = new RegExp("\\{\\{"+i+"\\}\\}",'g')
        template = template.replace(re ,function(){
            var t = document.createElement('div')
            t.innerText = e
            return t.innerHTML
        })
    })

    dom.innerHTML = template
    return dom.children.length == 1 ? dom.children[0] : dom.children
}


exports.transform=transform

},{}]},{},[1])