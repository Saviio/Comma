//import Promise from 'promise'

export function transform(template){
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

/*export function fetch(verb,url,data,type){
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest()
        xhr.open(verb, url)
        xhr.onload = () => {
            if(xhr.readyState === 4){
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.response))
                } else {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    })
                }
            }
        }

        xhr.onerror = () => {
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            })
        }

        xhr.send(data)
    })
}*/

export function append(data, type){
    let {average, numRaters} = data.rating

    var ct = data !== null
        ? "{{0}} 分 (" + (numRaters >= 10
            ? "{{1}}"
            : "少于10") + "人评价)"
        : "抱歉，无法在豆瓣发现对应的书籍资料"

    var template = {
        jd:''
            +'<div id="summary-douban">'
            +'<div class="dt">豆瓣评分：</div>'
            +'<div class="dd">'+ct+'</div>'
            +'</div>',
        amazon:'<div>豆瓣评分: '+ct+'</div>',
        dangdang:'<span>&nbsp;&nbsp;豆瓣评分: '+ct+'</span>'
    }

    var dom = data !== null
    ? transform(template[type.name], average, numRaters)
    : transform(template[type.name])

    var container = document.querySelector(type.container)
    container.appendChild(dom)
}
