
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

function appendDoubanLabel(data){

    var ct = data !== null ? "{{0}} 分 (" + (data.rating.numRaters >= 10 ? "{{1}}" : "少于10") + "人评价)" : "抱歉，无法在豆瓣发现对应的书籍资料"

    var template = ''
        +'<div id="summary-douban">'
        +'<div class="dt">豆瓣评分：</div>'
        +'<div class="dd">'+ct+'</div>'
        +'</div>'

    var dom = undefined
    if(data !== null)
        dom = transform(template,data.rating.average,data.rating.numRaters)
    else
        dom = transform(template)

    var summary = document.getElementById('summary')
    summary.appendChild(dom)
}


module.exports = appendDoubanLabel
