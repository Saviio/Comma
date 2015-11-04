var BOOK_ENTITY=null

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'PAGE_INIT') {
        sendResponse(true)
    }
})

console.info('JD Book Plugin Loaded.')


function AppendDoubanLabel(){
    var bookItemParams=document.querySelectorAll('#parameter2 > li')
    var ISBN=null
    if(bookItemParams!=null && bookItemParams.length>2){
        ISBN=bookItemParams[1].innerText.split('：').pop()

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status==200){
                    var data=JSON.parse(xhr.responseText)

                    BOOK_ENTITY=data

                    var label=document.createElement('div')
                    label.className="dt"
                    label.innerText="豆瓣评分："

                    var rating=document.createElement('div')
                    rating.className="dd"
                    rating.innerText=data.rating.average + " 分 (" + (data.rating.numRaters > 10 ? data.rating.numRaters : "少于10") + "人评价)"

                    var ret=document.createElement('div')
                    ret.id="summary-douban"
                    ret.appendChild(label)
                    ret.appendChild(rating)

                    var summary=document.getElementById('summary')
                    summary.appendChild(ret)
                }
            }
        }
        xhr.open("GET", 'https://api.douban.com/v2/book/isbn/'+ISBN, true);
        xhr.send();
    }
}

AppendDoubanLabel()
