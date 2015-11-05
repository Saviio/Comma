

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
