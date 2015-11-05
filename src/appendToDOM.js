
var helper=require('./helper')

function appendDoubanLabel(data){

    var ct = data !== null ? "{{0}} 分 (" + (data.rating.numRaters >= 10 ? "{{1}}" : "少于10") + "人评价)" : "抱歉，无法在豆瓣发现对应的书籍资料"

    var template = ''
        +'<div id="summary-douban">'
        +'<div class="dt">豆瓣评分：</div>'
        +'<div class="dd">'+ct+'</div>'
        +'</div>'

    var dom = undefined
    if(data !== null)
        dom = helper.transform(template,data.rating.average,data.rating.numRaters)
    else
        dom = helper.transform(template)

    var summary = document.getElementById('summary')
    summary.appendChild(dom)
}


module.exports = appendDoubanLabel
