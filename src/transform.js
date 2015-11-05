function appendDoubanLabel(data){
    var label=document.createElement('div')
    label.className="dt"
    label.innerText="豆瓣评分："

    var rating=document.createElement('div')
    rating.className="dd"
    if(data!==null)
        rating.innerText=data.rating.average + " 分 (" + (data.rating.numRaters > 10 ? data.rating.numRaters : "少于10") + "人评价)"
    else
        rating.innerText="抱歉，无法在豆瓣发现对应的书籍资料"

    var ret=document.createElement('div')
    ret.id="summary-douban"
    ret.appendChild(label)
    ret.appendChild(rating)

    var summary=document.getElementById('summary')
    summary.appendChild(ret)
}

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

module.exports=appendDoubanLabel
