var Promise = require('promise')

function connect(verb,url,data,type){
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest()
        xhr.open(verb, url)
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 300) {
                if(type==undefined)
                    resolve(JSON.parse(xhr.response))
                else
                    resolve(xhr.response)
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                })
            }
        }
        xhr.onerror = function() {
            reject({
                status: this.status,
                statusText: xhr.statusText
            })
        }
        xhr.send((data===null||data===undefined)?null:data)
    })
}


module.exports=connect
