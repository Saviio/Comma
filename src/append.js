
var helper=require('./helper')



module.exports = function(data, type){
    var ct = data !== null ? "{{0}} 分 (" + (data.rating.numRaters >= 10 ? "{{1}}" : "少于10") + "人评价)" : "抱歉，无法在豆瓣发现对应的书籍资料"

    var template={
        jd:''
            +'<div id="summary-douban">'
            +'<div class="dt">豆瓣评分：</div>'
            +'<div class="dd">'+ct+'</div>'
            +'</div>',
        amazon:'<div>豆瓣评分:'+ct+'</div>',
        dangdang:'<span>&nbsp;&nbsp;豆瓣评分:'+ct+'</span>'
    }

    var dom = undefined
    if(data !== null)
        dom = helper.transform(template[type.name],data.rating.average,data.rating.numRaters)
    else
        dom = helper.transform(template[type.name])

    var container = document.querySelector(type.container)
    container.appendChild(dom)
}
