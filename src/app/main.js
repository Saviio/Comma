import Vue from 'vue'
import App from './app.vue'
import { PASSING_DATA, REMOVE_ASIDE } from '../Action.js'


let parentSource = null

window.addEventListener('message', event => {
    let { type, passing } = event.data
    let { payload, url, id } = passing
    if(!type || type !== PASSING_DATA) return

    if(parentSource === null) parentSource = event.source

    new Vue({
        el: 'body',
        data:{
            payload:payload,
            dbid:id
        },
        methods:{
            close(){
                parentSource.postMessage({ type: REMOVE_ASIDE }, '*')
            }
        },
        components: { App }
    })
})
